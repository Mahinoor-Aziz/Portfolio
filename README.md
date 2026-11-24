# Mahnoor Aziz | AI-Powered Developer Portfolio

A personal portfolio showcasing my development projects, technical skills, and experience, with an AI-powered recruiter assistant designed to answer questions about my background and work.

Built to go beyond a static portfolio by combining frontend development, backend functionality, AI integration, and security-conscious implementation.

---

## Overview

This project is a full-stack personal portfolio designed to present my work and make exploring my technical background more interactive.

Alongside the portfolio experience, it includes an AI recruiter assistant that uses structured portfolio information to respond to questions about my skills, projects, and experience.

The project focuses on practical implementation, maintainable code, responsive design, and responsible handling of sensitive information.

## Features

- **Interactive Portfolio:** A personal portfolio presenting projects, skills, and professional information.
- **AI Recruiter Assistant:** An AI-powered chat interface that answers questions using structured portfolio knowledge.
- **Backend API:** An Express.js server handling application functionality and API requests.
- **Contact System:** A contact form with server-side processing and message storage.
- **Admin Dashboard:** Password-protected access to submitted messages.
- **Responsive Interface:** Layouts designed for different screen sizes.
- **3D Hero Experience:** An animated 3D visual with a 2D fallback.
- **SEO & Metadata:** Search and social-sharing metadata, sitemap, robots.txt, and custom favicon assets.

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| AI Integration | OpenAI API |
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

- `data/knowledge.json` — Stores structured portfolio information used by the AI assistant.
- `public/` — Contains frontend assets and project resources.
- `scripts/` — Contains password-hashing and security-check utilities.
- `server.js` — Handles the Express backend and server-side functionality.
- `.env.example` — Documents the environment variables required to run the application.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm
- Git
- An OpenAI API key

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

Configure the following variables:

```env
OPENAI_API_KEY=your_openai_api_key
CONTACT_EMAIL=your_private_email
ADMIN_PASSWORD_HASH=your_generated_password_hash
```

Generate a secure admin password hash:

```bash
npm run hash-password -- "your-long-password"
```

Copy the generated hash into your `.env` file.

Keep `.env` private. Never commit API keys, passwords, or other sensitive credentials to GitHub.

### Run Locally

Start the application:

```bash
npm start
```

For development with automatic server restarts:

```bash
npm run dev
```

Open the following URLs:

| Endpoint | Purpose |
|---|---|
| `http://localhost:5000` | Portfolio website |
| `http://localhost:5000/admin.html` | Admin dashboard |

The admin dashboard requires password authentication.

## Security Implementation

Security is considered throughout the application rather than treated as an afterthought.

Implemented measures include:

- Environment-based storage of sensitive credentials.
- Salted scrypt password hashing.
- Constant-time password comparison.
- HTTP security headers using Helmet.
- Content Security Policy.
- Request rate limiting on sensitive endpoints.
- Server-side input validation.
- Honeypot field for contact-form spam protection.
- Origin allow-list validation.
- JSON request-body size limits.
- Git exclusions for environment files and stored messages.

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Starts the production server |
| `npm run dev` | Starts the development server with watch mode |
| `npm run hash-password` | Generates an admin password hash |
| `npm run check-secrets` | Checks for exposed secrets |
| `npm run audit` | Audits production dependencies |

## Configuration & Maintenance

Portfolio content and AI knowledge can be updated through:

```text
data/knowledge.json
```

The application also uses environment-based configuration for production settings, including:

- `NODE_ENV`
- `SITE_URL`
- `ALLOWED_ORIGIN`
- `TRUST_PROXY`

Before deployment, configure these values appropriately and run:

```bash
npm run check-secrets
npm run audit
```

**Storage consideration:** Contact messages are stored in `data/messages.jsonl`. On hosting platforms with temporary filesystems, arrange persistent storage or backups before deployment.

## Current Development Status

The project has a working local development setup and includes frontend, backend, AI integration, and security-related functionality.

Deployment and production configuration remain separate steps.

---

## About the Developer

**Mahnoor Aziz**

Computer Science Student | Aspiring Full-Stack Developer

Interested in building practical web applications, exploring software architecture, and understanding how frontend interfaces, backend systems, APIs, and databases work together.

- [LinkedIn](https://www.linkedin.com/in/mahnoor-tariq-aziz-5349ba3a8/)
- [Portfolio](https://mahnoorportfolio-nu.vercel.app/)
- [GitHub](https://github.com/Mahinoor-Aziz)

*Curious by nature. Building by practice.*
