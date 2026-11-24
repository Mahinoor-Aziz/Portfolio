# Mahnoor Aziz | AI-Powered Developer Portfolio

A personal portfolio showcasing my development work, technical skills, and experience. It includes an AI recruiter assistant and a backend-powered contact system.

The project brings together frontend development, backend APIs, AI integration, database-backed functionality, and security-conscious implementation.

**Live portfolio:** https://mahnoorportfolio-nu.vercel.app/

---

## Overview

This is a full-stack personal portfolio built to present my work and make exploring my technical background more interactive.

It includes an AI recruiter assistant that uses structured portfolio information to answer questions about my skills and projects, along with a contact form and a password-protected admin area for submitted messages.

## Features

- **Interactive Portfolio:** Presents projects, skills, and professional information.
- **AI Recruiter Assistant:** Answers questions using structured portfolio knowledge through an OpenAI-compatible API.
- **Backend API:** Express.js server for application and API functionality.
- **Contact System:** Validates and stores submitted messages in Supabase.
- **Admin Dashboard:** Password-protected access to contact submissions.
- **Responsive Interface:** Layouts designed for different screen sizes.
- **3D Hero Experience:** Animated 3D visual with a 2D fallback.
- **SEO & Metadata:** Includes search and social-sharing metadata, sitemap, robots.txt, and favicon assets.

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| AI Integration | OpenAI API |
| Database | Supabase |
| Security | Helmet, express-rate-limit, scrypt |
| Configuration | dotenv |
| Visual Experience | Three.js |
| Version Control | Git & GitHub |

## Project Structure

```text
Portfolio/
│
├── data/
│   └── knowledge.json
│
├── public/
│   ├── projects/
│   └── ...
│
├── scripts/
│   ├── hash-password.js
│   └── check-secrets.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

**Key directories and files**

- `data/knowledge.json` — Structured portfolio information used by the AI assistant.
- `public/` — Frontend pages, assets, and project resources.
- `scripts/` — Password-hashing and security-check utilities.
- `server.js` — Express backend, API routes, and server-side functionality.
- `.env.example` — Template documenting the environment variables used by the application.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm
- Git
- A Supabase project
- An OpenAI API key for the AI recruiter assistant

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Mahinoor-Aziz/Portfolio.git
```

2. Navigate into the project:

```bash
cd Portfolio
```

3. Install dependencies:

```bash
npm install
```

### Environment Configuration

Create a `.env` file using `.env.example` as a template.

Configure the values for your environment:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4.1-mini

SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_secret_key

ADMIN_PASSWORD_HASH=your_generated_password_hash
PORT=5000
ALLOWED_ORIGIN=http://localhost:5000
SITE_URL=http://localhost:5000
NODE_ENV=development
TRUST_PROXY=
CONTACT_EMAIL=you@example.com
```

The Supabase credentials are used by the contact-message and admin functionality. The OpenAI API key enables the AI recruiter assistant.

Generate an admin password hash:

```bash
npm run hash-password -- "your-long-password"
```

Copy the generated hash into `ADMIN_PASSWORD_HASH`.

Keep your `.env` file private. Never commit API keys, database credentials, passwords, or other secrets to GitHub. Use the appropriate production values in your hosting environment rather than copying local development settings.

### Run Locally

Start the application:

```bash
npm start
```

For development with automatic server restarts:

```bash
npm run dev
```

Open:

| URL | Purpose |
|---|---|
| `http://localhost:5000` | Portfolio website |
| `http://localhost:5000/admin.html` | Admin dashboard |

The admin dashboard requires password authentication and the backend's configured database connection.

## Security Implementation

Security measures implemented in the application include:

- Environment-based configuration for sensitive credentials.
- Salted scrypt password hashing.
- Constant-time password comparison.
- HTTP security headers and Content Security Policy using Helmet.
- Rate limiting on sensitive API routes.
- Server-side input validation.
- Honeypot field for contact-form spam protection.
- Origin allow-list validation.
- JSON request-body size limits.
- Git exclusions for environment files and local message data.

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Starts the server |
| `npm run dev` | Starts the server with Node.js watch mode |
| `npm run hash-password` | Generates an admin password hash |
| `npm run check-secrets` | Checks for exposed secrets |
| `npm run audit` | Audits production dependencies |

## Configuration & Maintenance

The assistant's structured portfolio knowledge can be updated in:

```text
data/knowledge.json
```

Review these environment settings when configuring a deployment:

- `NODE_ENV`
- `SITE_URL`
- `ALLOWED_ORIGIN`
- `TRUST_PROXY`
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `OPENAI_API_KEY`

Before deployment, review the configuration and run:

```bash
npm run check-secrets
npm run audit
```

**Message storage:** Contact submissions are stored in the Supabase `contact_messages` table. They are not stored in `data/messages.jsonl`. Make sure the Supabase project and required table are configured for the contact and admin features.

## About the Developer

**Mahnoor Aziz**

Computer Science Student | Aspiring Full-Stack Developer

Interested in building practical web applications and understanding how frontend interfaces, backend systems, APIs, and databases work together.

- [LinkedIn](https://www.linkedin.com/in/mahnoor-tariq-aziz-5349ba3a8/)
- [Portfolio](https://mahnoorportfolio-nu.vercel.app/)
- [GitHub](https://github.com/Mahinoor-Aziz)

*Curious by nature. Building by practice.*
