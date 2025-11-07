import type { EmailRequest, EmailResponse, ErrorResponse } from '../types/email';

const API_BASE_URL = import.meta.env.VITE_EMAIL_API_URL || 'http://localhost:8080';
const API_KEY = import.meta.env.VITE_EMAIL_API_KEY || '';

export class EmailApiError extends Error {
  status: number;
  error: string;
  details?: string[];

  constructor(status: number, error: string, message: string, details?: string[]) {
    super(message);
    this.name = 'EmailApiError';
    this.status = status;
    this.error = error;
    this.details = details;

    Object.setPrototypeOf(this, EmailApiError.prototype);
  }
}

/**
 * Sends an email using the Email Dispatcher API
 * @param emailRequest - The email data to send
 * @returns Promise with the email response
 * @throws EmailApiError if the request fails
 */
export async function sendEmail(emailRequest: EmailRequest): Promise<EmailResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/emails/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify(emailRequest),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as ErrorResponse;
      throw new EmailApiError(
        errorData.status,
        errorData.error,
        errorData.message,
        errorData.details
      );
    }

    return data as EmailResponse;
  } catch (error) {
    if (error instanceof EmailApiError) {
      throw error;
    }

    throw new EmailApiError(
      0,
      'Network Error',
      error instanceof Error ? error.message : 'Failed to connect to email service'
    );
  }
}

/**
 * Checks the health of the email service
 * @returns Promise<boolean> - true if service is healthy
 */
export async function checkEmailServiceHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/emails/health`);
    return response.ok;
  } catch {
    return false;
  }
}
