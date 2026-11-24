# Mahnoor Aziz | Developer Portfolio

A personal portfolio showcasing my development work, technical skills, and experience. It brings together frontend development, backend APIs, AI integration, and database-backed functionality.

**Live portfolio:** https://mahnoorportfolio-nu.vercel.app/

---

## Overview

This full-stack portfolio presents my projects and technical background through an interactive website. It includes an AI recruiter assistant that uses structured portfolio information to answer questions about my skills and projects, along with a contact form for enquiries.

## Features

- **Interactive Portfolio:** Presents projects, skills, and professional information.
- **AI Recruiter Assistant:** Answers questions using structured portfolio knowledge through an OpenAI-compatible API.
- **Backend API:** Express.js server for application functionality.
- **Contact System:** Validates and stores submitted messages in Supabase.
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
| Security | Helmet, express-rate-limit |
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
│   └── ...
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
- `scripts/` — Project maintenance utilities.
- `server.js` — Express backend and server-side application functionality.
- `.env.example` — Template for the environment configuration used by the application.

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

Create a `.env` file using `.env.example` as a template. Add the credentials and configuration values required for your own local environment. Keep private credentials out of source control.

### Run Locally

Start the application:

```bash
npm start
```

For development with automatic server restarts:

```bash
npm run dev
```

Open the local address printed by the server in your browser (the default port is 5000).

## Implementation Notes

- Environment-based configuration keeps credentials out of application source files.
- Helmet provides HTTP security headers and Content Security Policy.
- Rate limiting is applied to relevant API routes.
- Server-side validation is used for incoming form and API data.
- Contact submissions are stored in the Supabase `contact_messages` table.

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Starts the server |
| `npm run dev` | Starts the server with Node.js watch mode |
| `npm run check-secrets` | Checks for exposed secrets |
| `npm run audit` | Audits production dependencies |

## About the Developer

**Mahnoor Aziz**

Computer Science Student | Aspiring Full-Stack Developer

Interested in building practical web applications and understanding how frontend interfaces, backend systems, APIs, and databases work together.

- [LinkedIn](https://www.linkedin.com/in/mahnoor-tariq-aziz-5349ba3a8/)
- [Portfolio](https://mahnoorportfolio-nu.vercel.app/)
- [GitHub](https://github.com/Mahinoor-Aziz)

*Curious by nature. Building by practice.*
