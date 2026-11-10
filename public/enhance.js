(() => {
  const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
  document.documentElement.classList.add('fx-on');

  /* one shared animated backdrop for the whole page: soft crimson light that drifts with scrolling, plus a star network */
  const c = document.createElement('canvas'); c.id = 'bgfx'; c.setAttribute('aria-hidden', 'true'); document.body.prepend(c);
  const x = c.getContext('2d'); let W, H, P = [], t = 0;
  function size() {
    const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0);
    P = Array.from({ length: Math.round(W * H / 18000) * 0 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2, r: Math.random() * 1.4 + .4, z: Math.random() * .6 + .2 }));
  }
  function draw() {
    t += .004; x.clearRect(0, 0, W, H); const sy = scrollY;
    [[.2, .3, .5, '215,40,72', .16], [.8, .6, .55, '110,14,36', .24], [.5, .95, .45, '215,40,72', .1]].forEach(([a, b, r, col, al], i) => {
      const ox = W * (a + .08 * Math.sin(t + i * 2)), oy = H * (b + .18 * Math.sin(sy / 900 + i * 1.7)), R = Math.max(W, H) * r, g = x.createRadialGradient(ox, oy, 0, ox, oy, R);
      g.addColorStop(0, `rgba(${col},${al})`); g.addColorStop(1, `rgba(${col},0)`); x.fillStyle = g; x.fillRect(0, 0, W, H);
    });
    const Y = p => ((p.y - sy * p.z * .4) % H + H) % H;
    for (const p of P) { p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H; }
    for (let i = 0; i < P.length; i++) {
      const a = P[i], ay = Y(a); x.fillStyle = 'rgba(255,170,180,.5)'; x.beginPath(); x.arc(a.x, ay, a.r, 0, 7); x.fill();
      for (let j = i + 1; j < P.length; j++) { const b = P[j], by = Y(b), d = Math.hypot(a.x - b.x, ay - by); if (d < 130) { x.strokeStyle = `rgba(215,40,72,${(1 - d / 130) * .22})`; x.beginPath(); x.moveTo(a.x, ay); x.lineTo(b.x, by); x.stroke(); } }
    }
  }
  addEventListener('resize', () => { size(); draw(); }); size(); draw();
  if (!still) (function loop() { if (!document.hidden) draw(); requestAnimationFrame(loop); })();

  /* consistent section styling (safe to run repeatedly: content arrives after the page loads) */
  const TAG = { projects: 'Selected work', youtube: 'Audience', skills: 'Toolkit', 'education and achievements': 'Journey', "let's talk": 'Say hello' };
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }), { threshold: .12 });
  function decorate() {
    let n = 0;
    document.querySelectorAll('main>section.s').forEach(s => {
      if (!s.classList.contains('fx-sec')) { s.classList.add('fx-sec'); io.observe(s); }
      let h = s.querySelector(':scope>h2');
      if (!h && s.querySelector('.two')) { h = document.createElement('h2'); h.textContent = 'Education and achievements'; s.prepend(h); }
      if (!h) return; n++;
      if (!s.querySelector(':scope>.eb')) { const e = document.createElement('span'); e.className = 'eb'; const k = h.textContent.trim().toLowerCase().replace(/’/g, "'"); e.textContent = String(n).padStart(2, '0') + (TAG[k] ? ' / ' + TAG[k] : ''); h.before(e); }
    });
    document.querySelectorAll('#projects>*,#skills>*,#yt .yt-channel,#yt .yt-experience').forEach(el => el.classList.add('fx-card'));
    document.querySelectorAll('#yt .yt-channel').forEach(el => { if (!el.querySelector('.eq')) el.insertAdjacentHTML('beforeend', '<span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>'); });
    document.querySelectorAll('#skills .bn li').forEach((li, i) => li.style.setProperty('--i', i % 8));
    const ct = document.querySelector('#contact');
    if (ct && !ct.querySelector('.lead2')) {
      const p = document.createElement('p'); p.className = 'lead2'; p.textContent = 'Have a project, an internship or a question about my work? Send a message here, or ask the AI Recruiter.';
      (ct.querySelector(':scope>h2') || ct.firstChild).after(p);
      const b = document.createElement('button'); b.className = 'peek'; b.type = 'button'; b.setAttribute('aria-label', 'Open the AI Recruiter chat'); b.innerHTML = '<img src="mascot.webp" alt="" width="720" height="633">';
      b.onclick = () => document.querySelector('.mascot')?.click(); p.after(b);
    }
  }
  decorate(); new MutationObserver(decorate).observe(document.querySelector('main'), { childList: true, subtree: true });
  document.addEventListener('mousemove', e => { const k = e.target.closest && e.target.closest('.fx-card'); if (k) { const r = k.getBoundingClientRect(); k.style.setProperty('--mx', e.clientX - r.left + 'px'); k.style.setProperty('--my', e.clientY - r.top + 'px'); } });
})();
(()=>{
const L=[['GitHub','https://github.com/Mahinoor-Aziz'],['LinkedIn','https://www.linkedin.com/in/mahnoor-tariq-aziz-5349ba3a8']];
let tries=0;
const t=setInterval(()=>{
  const host=document.querySelector('#contact');
  if(host&&!host.querySelector('.social-row')){
    const row=document.createElement('div');row.className='social-row';
    row.innerHTML=L.map(([n,u])=>`<a class="btn ghost" href="${u}" target="_blank" rel="noopener noreferrer">${n}</a>`).join('');
    const f=host.querySelector('#cf');(f?f.parentNode:host).append(row);
  }
  if(host&&host.querySelector('.social-row')||++tries>20)clearInterval(t);
},300);
})();
