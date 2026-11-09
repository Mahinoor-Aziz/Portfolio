// Cleans up public/index.html: removes duplicated code, fixes bugs, and links the enhance files. Safe to run twice.
// Usage (from the project folder):  node scripts/fix-index.js
import fs from 'node:fs';
const file = process.argv[2] || 'public/index.html';
let h = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const BACKUP = new URL('./index.backup.html', import.meta.url);
if (!fs.existsSync(BACKUP)) fs.writeFileSync(BACKUP, h); // your original, saved once next to this script
const log = [];
const ok = n => log.push('fixed    ' + n), skip = n => log.push('skipped  ' + n + ' (not found, probably already fixed)');
const rep = (n, a, b) => { if (h.includes(a)) { h = h.replace(a, () => b); ok(n); } else skip(n); };
const line = (n, s, repl) => { const L = h.split('\n'), i = L.findIndex(l => l.includes(s)); if (i < 0) return skip(n); if (repl === undefined) L.splice(i, 1); else L[i] = repl; h = L.join('\n'); ok(n); };
const cut = (n, a, b) => { const i = h.indexOf(a), j = h.indexOf(b, i + 1); if (i < 0 || j < 0) return skip(n); h = h.slice(0, i) + h.slice(j + b.length).replace(/^\n/, ''); ok(n); };

rep('duplicate progress bar element', '<div id="bar"></div>\n', '');
rep('duplicate progress bar style', '#bar{position:fixed;top:0;left:0;height:3px;width:100%;background:linear-gradient(90deg,var(--wine),var(--crim));transform:scaleX(0);transform-origin:0 0;z-index:40}\n', '');
line('duplicate progress bar scroll code', "$('#bar').style.transform=");
rep('second 3D canvas style that made the scene scroll away', '#gl{position:absolute;inset:0;width:100%;height:100%;z-index:-2;pointer-events:none}\n', '');
rep('extra hero canvas', '<canvas id="film" aria-hidden="true"></canvas><canvas id="gl" aria-hidden="true"></canvas>', '<canvas id="film" aria-hidden="true"></canvas>');
rep('three.js loaded twice', 'Message me</a>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n<script>', 'Message me</a>\n<script>');
cut('second, duplicate 3D scene in the hero', '/* ---- 3D hero: crimson torus knot', 'r.render(sc,cam)})()})();');
line('duplicate card tilt (1)', "document.addEventListener('mousemove',e=>{const c=e.target.closest&&e.target.closest('.pc')");
line('duplicate card tilt (2)', "document.addEventListener('mouseout',e=>{const c=e.target.closest&&e.target.closest('.pc')");
line('wrong channel name fallback', 'const channelName = ch.name ||', "      const channelName = ch.name || 'Channel';");
line('both channels linking to the same URL', 'const channelUrl = ch.url ||', "      const channelUrl = ch.url || '';");
rep('chat error messages', "Set OPENAI_API_KEY on the server and restart it.'", "Add AI_API_KEY to the server settings (.env) and restart it.',provider_error:'The AI service is temporarily unavailable. Please try again in a little while.',server_error:'Something went wrong on the server. Please try again.'");
if (!h.includes('enhance.css')) { h = h.replace('</head>', () => '<link rel="stylesheet" href="enhance.css">\n</head>'); const k = h.lastIndexOf('</body>'); h = h.slice(0, k) + '<script src="enhance.js" defer></script>\n' + h.slice(k); ok('linked enhance.css and enhance.js'); } else skip('enhance files already linked');

fs.writeFileSync(file, h);
console.log(log.join('\n') + '\n\nSaved ' + file + '. A backup of your original is in scripts/index.backup.html');
