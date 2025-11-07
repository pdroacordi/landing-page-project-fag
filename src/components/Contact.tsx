import React, { useState, type FormEvent } from 'react';
import './Contact.css';
import { sendEmail, EmailApiError } from '../services/emailService';
import type { EmailRequest } from '../types/email';

const SENDER_EMAIL = import.meta.env.SENDER_EMAIL || '';

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status.type !== 'idle') {
      setStatus({ type: 'idle' });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    try {
      const emailRequest: EmailRequest = {
        to: [
          {
            email: 'pedroacordi2@gmail.com',
            name: 'Contato Escritório Contábil Acordi',
          },
        ],
        subject: `Nova mensagem de contato: ${formData.name}`,
        htmlContent: `
          <h2>Nova mensagem recebida do site</h2>
          <p><strong>Nome:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Telefone:</strong> ${formData.phone || 'Não informado'}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${formData.message.replace(/\n/g, '<br>')}</p>
        `,
        textContent: `
          Nova mensagem recebida do site

          Nome: ${formData.name}
          Email: ${formData.email}
          Telefone: ${formData.phone || 'Não informado'}

          Mensagem:
          ${formData.message}
        `,
        sender: {
          email: 'paasoares@minha.fag.edu.br',
          name: 'Website Escritório Contábil Acordi',
        },
        replyTo: {
          email: formData.email,
          name: formData.name,
        },
        tags: ['contact-form', 'website'],
        params: {
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
        },
      };

      await sendEmail(emailRequest);

      setStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      });

      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => {
        setStatus({ type: 'idle' });
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);

      let errorMessage = 'Erro ao enviar mensagem. Por favor, tente novamente.';

      if (error instanceof EmailApiError) {
        if (error.status === 401) {
          errorMessage = 'Erro de autenticação. Por favor, contate o suporte.';
        } else if (error.status === 400) {
          errorMessage = error.details?.join(', ') || error.message;
        } else if (error.status === 502) {
          errorMessage = 'Serviço de email temporariamente indisponível. Tente novamente mais tarde.';
        } else {
          errorMessage = error.message;
        }
      }

      setStatus({
        type: 'error',
        message: errorMessage,
      });
    }
  };

  return (
    <section className="contact" id="contato" aria-labelledby="contact-heading">
      <div className="container">
        <header className="contact-header">
          <p className="section-tag">Contato</p>
          <h2 id="contact-heading" className="section-title">Entre em Contato Conosco</h2>
          <p className="section-description">
            Estamos prontos para atender sua empresa. Preencha o formulário ou ligue para nós.
          </p>
        </header>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {status.message && (
            <div className={`form-message form-message-${status.type}`} role="alert">
              {status.message}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="contact-name" className="visually-hidden">
              Nome completo
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              placeholder="Nome completo*"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
              disabled={status.type === 'loading'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email" className="visually-hidden">
              E-mail
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              placeholder="Seu e-mail*"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              disabled={status.type === 'loading'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-phone" className="visually-hidden">
              Telefone
            </label>
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              placeholder="Telefone (opcional)"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              disabled={status.type === 'loading'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message" className="visually-hidden">
              Mensagem
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Sua mensagem*"
              className="form-control textarea"
              value={formData.message}
              onChange={handleChange}
              required
              aria-required="true"
              rows={5}
              disabled={status.type === 'loading'}
            />
          </div>

          <button
            type="submit"
            className="btn btn-submit"
            disabled={status.type === 'loading'}
          >
            {status.type === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
