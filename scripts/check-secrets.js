import fs from 'node:fs';
import path from 'node:path';
const SKIP = new Set(['node_modules', '.git', '.env', 'messages.jsonl']);
const TEXT = /\.(js|json|html|css|md|txt|xml|webmanifest|example|jsonl)$/i;
const RULES = [[/sk-[A-Za-z0-9_-]{20,}/, 'looks like an API key'], [/ADMIN_PASSWORD_HASH\s*=\s*[0-9a-f]{16,}:/i, 'admin password hash'],
  [/[\w.+-]+@(?!example\.com)[\w-]+\.[a-z]{2,}/i, 'real-looking email address'], [/OPENAI_API_KEY\s*=\s*(?!your_secret_key_here)\S+/, 'API key assignment']];
let bad = 0;
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const f = path.join(dir, e.name);
    if (e.isDirectory()) { walk(f); continue; }
    if (!TEXT.test(e.name) && e.name !== '.env.example') continue;
    const t = fs.readFileSync(f, 'utf8');
    for (const [re, why] of RULES) if (re.test(t)) { console.log(`${f}: ${why}`); bad++; }
  }
})('.');
const gi = fs.existsSync('.gitignore') ? fs.readFileSync('.gitignore', 'utf8') : '';
if (!/^\.env\*?$/m.test(gi)) { console.log('.gitignore does not ignore .env'); bad++; }
console.log(bad ? `${bad} problem(s) found` : 'No secrets found in project files.');
process.exit(bad ? 1 : 0);
