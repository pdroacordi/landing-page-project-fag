// Email API Types based on OpenAPI specification

export interface Recipient {
  email: string;
  name?: string;
}

export interface Sender {
  email: string;
  name: string;
}

export interface EmailRequest {
  to: Recipient[];
  subject: string;
  htmlContent: string;
  replyTo: Sender;
  textContent?: string;
  sender: Sender;
  params?: Record<string, unknown>;
  tags?: string[];
}

export interface EmailResponse {
  messageId?: string;
  status: string;
  message: string;
  timestamp?: string;
}

export interface ErrorResponse {
  status: number;
  error: string;
  message: string;
  path: string;
  timestamp?: string;
  details?: string[];
}
