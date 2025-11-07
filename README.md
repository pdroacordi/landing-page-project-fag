# Landing Page Project - React + TypeScript + Vite

A modern, secure landing page with contact form integration using Brevo API for email delivery.

## Features

- ⚡ Built with React 19, TypeScript, and Vite
- 📧 Secure email integration with Brevo API
- 🔒 Enterprise-grade security features
- 🚀 Deployed on Vercel with serverless functions
- 🎨 Responsive design with modern UI

## Security Features

This project implements multiple security layers to ensure safe public deployment:

- **XSS Prevention**: All user inputs are sanitized using HTML escaping
- **Rate Limiting**: Built-in rate limiting (5 requests per hour per IP)
- **CORS Protection**: Configurable allowed origins
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, CSP, etc.
- **Input Validation**: Email format validation and length restrictions
- **Environment Variables**: No hardcoded secrets or API keys

## Prerequisites

- Node.js 18+ and npm
- A [Brevo](https://www.brevo.com/) account with API key
- Vercel account for deployment (optional but recommended)

## Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd lp-project
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
BREVO_API_KEY=your_actual_brevo_api_key_here
RECIPIENT_EMAIL=your-email@domain.com
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com
```

**Getting your Brevo API Key:**
1. Sign up at [Brevo](https://www.brevo.com/)
2. Go to Settings → SMTP & API → API Keys
3. Create a new API key
4. Copy and paste it into your `.env` file

**Important:** Never commit the `.env` file to Git. It's already in `.gitignore`.

### 3. Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Test the Contact Form

1. Fill out the contact form
2. Submit
3. Check the recipient email for the message

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure environment variables in Vercel dashboard:
   - `BREVO_API_KEY`
   - `RECIPIENT_EMAIL`
   - `ALLOWED_ORIGINS` (use your production domain)

### Setting Environment Variables in Vercel

1. Go to your project in Vercel dashboard
2. Settings → Environment Variables
3. Add each variable:
   - **Name**: `BREVO_API_KEY`
   - **Value**: Your Brevo API key
   - **Environment**: Production (and Preview if needed)
4. Repeat for other variables
5. Redeploy if needed

## Project Structure

```
lp-project/
├── api/
│   └── send-email.ts          # Serverless API endpoint for email
├── src/
│   ├── components/            # React components
│   │   ├── Contact.tsx        # Contact form component
│   │   └── ...
│   ├── App.tsx
│   └── main.tsx
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── vercel.json                # Vercel configuration
└── package.json
```

## API Documentation

### POST /api/send-email

Sends a contact form email via Brevo API.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Hello, I'm interested in your services."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Email enviado com sucesso!"
}
```

**Response (Error):**
```json
{
  "error": "Error message description"
}
```

**Rate Limits:**
- 5 requests per hour per IP address
- Returns 429 status when exceeded

## Security Best Practices

✅ **What's Already Implemented:**
- Environment variables for secrets
- Input sanitization and validation
- Rate limiting
- CORS configuration
- Security headers
- XSS prevention

⚠️ **Additional Recommendations:**

1. **For Production Rate Limiting**: Replace the in-memory rate limiter with Redis or a similar persistent store:
   ```bash
   npm install @upstash/redis
   ```

2. **Add CAPTCHA** (optional but recommended):
   - Integrate Google reCAPTCHA or hCaptcha
   - Helps prevent automated spam

3. **Monitor Your API Usage**:
   - Check Vercel Analytics
   - Monitor Brevo API usage in their dashboard

## Troubleshooting

### Email not sending

1. Check Brevo API key is correct
2. Verify sender email is verified in Brevo
3. Check Vercel function logs for errors
4. Ensure environment variables are set in Vercel

### CORS errors in production

1. Update `ALLOWED_ORIGINS` in Vercel environment variables
2. Include your production domain (e.g., `https://yourdomain.com`)
3. Redeploy the application

### Rate limiting too strict

Edit `api/send-email.ts`:
```typescript
const MAX_REQUESTS_PER_WINDOW = 10; // Increase from 5
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions:
1. Check the [Brevo API Documentation](https://developers.brevo.com/)
2. Review [Vercel Documentation](https://vercel.com/docs)
3. Open an issue in this repository
