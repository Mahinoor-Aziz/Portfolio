# Portfolio with 3D hero, AI Recruiter and secure contact

## Run
1. `npm install`
2. Copy `.env.example` to `.env` and fill in: `OPENAI_API_KEY`, `CONTACT_EMAIL` (your private email), `ADMIN_PASSWORD_HASH`.
3. Make the admin hash: `npm run hash-password -- "your-long-password"`, then paste the printed line into `.env`.
4. `npm start`, open http://localhost:5000
5. Read messages at http://localhost:5000/admin.html (password login).

Edit `data/knowledge.json` to change page content and what the AI knows. "TODO" fields show dimmed and are never given to the AI.

## Security in this project
- API key, email and admin hash live only in `.env` (git-ignored); the email is not in any HTML or JSON file.
- Admin password is stored as a salted scrypt hash and compared in constant time.
- Helmet security headers with a Content-Security-Policy; JSON body limit; input validation; honeypot field; rate limits on chat, contact, email reveal and admin login; origin allow-list.
- Messages are saved to `data/messages.jsonl` (git-ignored). Back it up before redeploying on hosts with temporary disks.
- CSP allows inline scripts (the page uses them); a stricter setup would move scripts into files.

## Notes
- Live Server shows the page content only; chat, contact and admin need `npm start`.
- Project demos are in `public/projects/`. Add GitHub/live links in `knowledge.json`.
- The 3D hero uses three.js from cdnjs and falls back to the 2D animation if unavailable.

## Production checklist (what is covered)
- Pages: custom 404, privacy page, sitemap.xml and robots.txt (served by the backend from `SITE_URL`).
- SEO and sharing: title, meta description, canonical, Open Graph and Twitter cards, `og.jpg`, full favicon set and web manifest.
- UX: mobile breakpoints, sticky mobile "Message me" button, loading and error states, alt text, compressed images.
- Not included on purpose: cookie banner (no cookies or trackers are used), analytics, terms page, thank-you page (the form confirms inline).
- Before deploying: set `NODE_ENV=production`, `SITE_URL`, `ALLOWED_ORIGIN`, `TRUST_PROXY` (if behind a proxy), then run `npm run check-secrets` and `npm run audit`.
- Keep dependencies current with `npm outdated` and `npm update`, then re-run `npm run audit`.
- Live Server serves the whole folder, so use it only for local previews; never deploy that way.
