# Landing Page Project - React + TypeScript + Vite

# Landing Page Project

A modern landing page built with React, TypeScript, and Vite. Features a responsive design and contact form integration.

🌐 **Live Demo**: [Visit the Website](https://your-project-url.vercel.app)

## Tech Stack

- React + TypeScript
- Vite
- Brevo API (for email service)
- Deployed on Vercel This project is live and deployed on [Vercel](https://vercel.com).

🌐 **Live Demo**: [Visit the Website](https://your-project-url.vercel.app)

## Features

- ⚡ Built with React 19, TypeScript, and Vite
- 📧 Secure email integration with Brevo API
- 🔒 Enterprise-grade security features
- 🚀 Deployed on Vercel with serverless functions
- 🎨 Responsive design with modern UI

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- [Brevo](https://www.brevo.com/) account (for email service)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd lp-project

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Brevo API key to .env file

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/      # React components (Header, Hero, etc.)
├── services/        # Email service integration
└── types/          # TypeScript type definitions

api/
└── send-email.ts   # Email API endpoint
```

## Environment Variables

Create a `.env` file with:
```
BREVO_API_KEY=your_api_key
RECIPIENT_EMAIL=your-email@domain.com
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## License

MIT
