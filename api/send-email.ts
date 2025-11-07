import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Simple in-memory rate limiter (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5; // 5 emails per hour per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

// Sanitize HTML to prevent XSS attacks
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Sanitize input to remove potentially dangerous characters
function sanitizeInput(input: string, maxLength: number = 1000): string {
  return escapeHtml(input.trim().slice(0, maxLength));
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // CORS headers (adjust origin for production)
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
             (req.headers['x-real-ip'] as string) ||
             'unknown';

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.'
    });
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'contato@acordi.com.br';

  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY is not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { name, email, phone, message }: ContactFormData = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, and message are required'
      });
    }

    // Sanitize all inputs
    const sanitizedName = sanitizeInput(name, 100);
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 254);
    const sanitizedPhone = phone ? sanitizeInput(phone, 20) : '';
    const sanitizedMessage = sanitizeInput(message, 2000);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Additional validation: check for suspiciously long inputs
    if (name.length > 100 || message.length > 2000) {
      return res.status(400).json({ error: 'Input too long' });
    }

    const emailData = {
      sender: {
        name: 'Website Acordi',
        email: 'noreply@acordi.com.br',
      },
      to: [
        {
          email: RECIPIENT_EMAIL,
          name: 'Escritório Contábil Acordi',
        },
      ],
      replyTo: {
        email: sanitizedEmail,
        name: sanitizedName,
      },
      subject: `Novo contato do site - ${sanitizedName}`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #283b47; color: white; padding: 20px; text-align: center; }
              .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #283b47; }
              .value { margin-top: 5px; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Novo Contato do Site</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Nome:</div>
                  <div class="value">${sanitizedName}</div>
                </div>
                <div class="field">
                  <div class="label">E-mail:</div>
                  <div class="value">${sanitizedEmail}</div>
                </div>
                ${sanitizedPhone ? `
                <div class="field">
                  <div class="label">Telefone:</div>
                  <div class="value">${sanitizedPhone}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Mensagem:</div>
                  <div class="value">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              <div class="footer">
                Enviado através do formulário de contato do site Escritório Contábil Acordi
              </div>
            </div>
          </body>
        </html>
      `,
      textContent: `
Novo Contato do Site

Nome: ${sanitizedName}
E-mail: ${sanitizedEmail}
${sanitizedPhone ? `Telefone: ${sanitizedPhone}\n` : ''}
Mensagem:
${sanitizedMessage}

---
Enviado através do formulário de contato do site Escritório Contábil Acordi
      `.trim(),
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      throw new Error('Failed to send email');
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);

    return res.status(200).json({
      success: true,
      message: 'Email enviado com sucesso!'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: 'Erro ao enviar email. Por favor, tente novamente.'
    });
  }
}
