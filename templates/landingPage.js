export function renderLandingPage() {
  const APP_URL = process.env.APP_URL || '';
  let html = '';
  html += '<!DOCTYPE html>';
  html += '<html lang="en" style="scroll-behavior: smooth;">';
  html += '<head>';
  html += '<meta charset="UTF-8" />';
  html += '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
  html += '<title>WaitlistWizard — Turn early interest into exponential growth.</title>';
  html += '<meta name="description" content="Build viral waitlist pages with referral mechanics." />';
  html += '<meta name="theme-color" content="#0a0a0b" />';
  html += `<link rel="canonical" href="${APP_URL}/" />`;
  html += '<link rel="preconnect" href="https://fonts.googleapis.com" />';
  html += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />';
  html += '<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />';
  html += '<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap" rel="stylesheet" />';
  html += '<style>';
  html += `
:root {
  --bg: #0a0a0b;
  --bg-hover: #141416;
  --text-main: #f0ede6;
  --text-muted: #888888;
  --accent: #c8ff00;
  --accent-dark: #b3e600;
  --border: rgba(255,255,255,0.08);
  --font-display: 'Instrument Serif', serif;
  --font-body: 'General Sans', sans-serif;
}

* { margin:0; padding:0; box-sizing:border-box; }
body { 
  font-family: var(--font-body); 
  background: var(--bg); 
  color: var(--text-main); 
  line-height: 1.6; 
  font-size: 16px;
  overflow-x: hidden; 
  -webkit-font-smoothing: antialiased; 
}
a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; border: none; background: none; }

/* Subtle Noise Texture */
body::before {
  content: ''; position: fixed; inset: 0; z-index: -1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* Nav */
nav { 
  position: sticky; top: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center; 
  padding: 20px 5%; 
  background: rgba(10, 10, 11, 0.7); backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.logo { display:flex; align-items:center; gap:8px; font-weight:600; font-size:18px; }
.logo svg { width: 24px; height: 24px; fill: var(--accent); }
.nav-links { display:flex; gap:32px; font-weight:500; font-size:15px; color:var(--text-muted); }
.nav-links a:hover { color:var(--text-main); transition: 0.2s; }
.nav-right { display:flex; gap:24px; align-items:center; }
.btn-login { font-weight: 500; font-size: 15px; color: var(--text-main); transition: 0.2s;}
.btn-login:hover { color: var(--accent); }
.btn-accent { 
  background: var(--accent); color: #000; padding: 10px 24px; 
  border-radius: 999px; font-weight: 600; font-size: 14px; 
  transition: transform 0.2s ease, background 0.2s; 
}
.btn-accent:hover { background: var(--accent-dark); transform: scale(0.98); }

.ham { display: none; flex-direction: column; gap: 4px; z-index: 102; padding: 10px; }
.ham span { width: 24px; height: 2px; background: var(--text-main); transition: 0.3s; }

/* Mobile Menu */
.mob-overlay { 
  position: fixed; inset: 0; background: var(--bg); z-index: 101; 
  display: none; flex-direction: column; justify-content: center; align-items: center; gap: 40px; 
  font-family: var(--font-display); font-size: 48px; opacity: 0; transition: opacity 0.3s;
}
.mob-overlay.active { display: flex; opacity: 1; }
.mob-overlay a { color: var(--text-muted); transition: 0.2s; }
.mob-overlay a:hover { color: var(--text-main); font-style: italic; }

/* General Layout */
section { padding: 140px 5%; border-bottom: 1px solid var(--border); position: relative; }
.section-label { 
  font-size: 12px; font-weight: 600; letter-spacing: 0.08em; 
  text-transform: uppercase; color: var(--accent); margin-bottom: 24px; display: block; 
}
h2 { font-family: var(--font-display); font-size: clamp(3rem, 6vw, 4.5rem); font-weight: 400; line-height: 1.1; margin-bottom: 24px; }
p.lead { font-size: 1.125rem; color: var(--text-muted); max-width: 540px; }

/* Hero */
.hero { text-align: left; padding-top: 180px; padding-bottom: 160px; overflow: hidden; }
.hero-content { position: relative; z-index: 2; max-width: 800px; }
.hero-badge { 
  display: inline-block; padding: 6px 16px; border: 1px solid var(--border); 
  border-radius: 999px; font-size: 13px; font-weight: 500; margin-bottom: 40px;
}
.hero h1 { 
  font-family: var(--font-display); font-size: clamp(3rem, 8vw, 5.5rem); 
  font-weight: 400; line-height: 1; letter-spacing: -0.02em; 
  margin-bottom: 32px; max-width: 14ch; 
}
.hero-cta { display: flex; align-items: center; gap: 16px; margin-top: 48px; flex-wrap: wrap; }
.hero-cta .btn-accent { padding: 14px 32px; font-size: 16px; }
.microcopy { font-size: 13px; color: var(--text-muted); }

/* SVG Art */
.hero-art { 
  position: absolute; right: -5%; top: 10%; width: 600px; height: 600px; 
  z-index: 1; opacity: 0.6; pointer-events: none;
}
.pulse-circle { fill: none; stroke: var(--border); stroke-width: 1; animation: pulse 8s infinite linear; transform-origin: center; }
@keyframes pulse { 0% { transform: scale(0.8); opacity: 0; } 50% { opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }

/* How It Works (Row/Timeline) */
.rail { display: flex; gap: 40px; margin-top: 80px; position: relative; }
.rail-step { flex: 1; position: relative; padding-top: 40px; }
.rail-step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: var(--border); }
.step-num { 
  font-family: var(--font-display); font-size: 80px; color: var(--accent); 
  opacity: 0.2; line-height: 0.8; margin-bottom: 24px; 
}
.rail-step h3 { font-size: 20px; margin-bottom: 16px; }
.rail-step p { color: var(--text-muted); font-size: 15px; }

/* Features (Bento) */
.bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 80px; }
.bento-card { border: 1px solid var(--border); background: var(--bg-hover); padding: 40px; }
.bento-1 { grid-column: span 2; position: relative; overflow: hidden; }
.bento-2 { grid-column: span 1; grid-row: span 2; display: flex; flex-direction: column; }
.bento-3 { grid-column: span 2; }
.bento-card h3 { font-size: 24px; font-family: var(--font-display); margin-top: auto; padding-top: 40px; }
.bento-card p { color: var(--text-muted); font-size: 15px; margin-top: 12px; }

.svg-illus { width: 100%; height: 160px; margin-bottom: 24px; display: block; }
.node-line { stroke: var(--border); stroke-width: 1; stroke-dasharray: 4; animation: dash 20s linear infinite; }
@keyframes dash { to { stroke-dashoffset: 1000; } }

/* Pricing */
.pricing-grid { display: flex; gap: 24px; margin-top: 80px; }
.price-tier { flex: 1; border: 1px solid var(--border); padding: 48px 40px; display: flex; flex-direction: column; }
.price-tier.pro { border-color: var(--accent); transform: scale(1.02); background: rgba(200, 255, 0, 0.02); }
.tier-name { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
.pro .tier-name { color: var(--accent); }
.price { font-family: var(--font-display); font-size: 64px; margin: 24px 0 8px; line-height: 1; }
.price span { font-size: 16px; font-family: var(--font-body); color: var(--text-muted); }
.price-desc { font-size: 15px; color: var(--text-muted); height: 48px; border-bottom: 1px solid var(--border); padding-bottom: 24px; margin-bottom: 24px; }
.features-list { list-style: none; flex: 1; margin-bottom: 40px; }
.features-list li { margin-bottom: 16px; display: flex; align-items: flex-start; gap: 12px; font-size: 15px; color: var(--text-muted); }
.features-list svg { width: 16px; height: 16px; fill: var(--text-main); flex-shrink: 0; margin-top: 4px; }
.btn-outline { display: block; text-align: center; width: 100%; padding: 12px; border: 1px solid var(--text-main); border-radius: 999px; transition: 0.2s; color: var(--text-main); font-weight: 500; font-size: 15px; }
.btn-outline:hover { background: var(--text-main); color: var(--bg); }

/* Footer */
footer { padding: 40px 5%; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); }
.f-links { display: flex; gap: 32px; font-size: 14px; color: var(--text-muted); }
.f-links a:hover { color: var(--text-main); }

/* Scroll Anim */
.revealer { opacity: 0; transform: translateY(20px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.revealer.visible { opacity: 1; transform: translateY(0); }

/* Responsive */
@media (max-width: 1024px) {
  .bento { grid-template-columns: 1fr; }
  .bento-1, .bento-2, .bento-3 { grid-column: span 1; grid-row: auto; }
  .pricing-grid { flex-direction: column; }
  .price-tier.pro { transform: none; }
}
@media (max-width: 768px) {
  .nav-links, .nav-right { display: none; }
  .ham { display: flex; }
  .rail { flex-direction: column; gap: 64px; }
  .hero-art { display: none; }
  footer { flex-direction: column; gap: 24px; align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
  `;
  html += '</style>';
  html += '</head>';
  html += '<body>';
  
  const logoSVG = `<svg viewBox="0 0 24 24"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/></svg>`;
  const checkSVG = `<svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`;

  // Nav
  html += '<nav>';
  html += `<a href="/" class="logo">${logoSVG} WaitlistWizard</a>`;
  html += '<div class="nav-links"><a href="#how">Solution</a><a href="#features">Features</a><a href="#pricing">Pricing</a></div>';
  html += '<div class="nav-right"><a href="/app#/login" class="btn-login">Sign in</a><a href="/app#/register" class="btn-accent">Get started</a></div>';
  html += '<button class="ham" onclick="document.getElementById(\'mob-nav\').classList.toggle(\'active\')"><span></span><span></span></button>';
  html += '</nav>';

  // Mobile Nav
  html += '<div class="mob-overlay" id="mob-nav">';
  html += '<button style="position:absolute;top:20px;right:5%;font-size:32px;color:#fff;" onclick="document.getElementById(\'mob-nav\').classList.remove(\'active\')">&times;</button>';
  html += '<a href="#how" onclick="document.getElementById(\'mob-nav\').classList.remove(\'active\')">Solution</a>';
  html += '<a href="#features" onclick="document.getElementById(\'mob-nav\').classList.remove(\'active\')">Features</a>';
  html += '<a href="#pricing" onclick="document.getElementById(\'mob-nav\').classList.remove(\'active\')">Pricing</a>';
  html += '<a href="/app#/login">Sign in</a>';
  html += '<a href="/app#/register" style="color:var(--accent);">Get started</a>';
  html += '</div>';

  // Hero
  html += '<section class="hero">';
  html += '<svg class="hero-art" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">';
  html += '<circle cx="200" cy="200" r="80" class="pulse-circle" style="animation-delay: 0s" />';
  html += '<circle cx="200" cy="200" r="140" class="pulse-circle" style="animation-delay: -2s" />';
  html += '<circle cx="200" cy="200" r="200" class="pulse-circle" style="animation-delay: -4s" />';
  html += '<circle cx="200" cy="200" r="260" class="pulse-circle" style="animation-delay: -6s" />';
  html += '</svg>';
  html += '<div class="hero-content">';
  html += '<div class="hero-badge revealer">The engine behind viral launches</div>';
  html += '<h1 class="revealer">Turn early interest into exponential growth.</h1>';
  html += '<p class="lead revealer">Don\'t just collect emails. Build a verifiable hype machine that incentivizes your earliest supporters to do the marketing for you.</p>';
  html += '<div class="hero-cta revealer">';
  html += '<a href="/app#/register" class="btn-accent">Start Free &rarr;</a>';
  html += '<span class="microcopy">No credit card &middot; Free forever &middot; Live in 60s</span>';
  html += '</div>';
  html += '</div>';
  html += '</section>';

  // How It Works
  html += '<section id="how">';
  html += '<span class="section-label revealer">The Solution</span>';
  html += '<h2 class="revealer">A predictable launch<br>framework.</h2>';
  html += '<p class="lead revealer">Go from zero momentum to thousands of eager users fighting to get in.</p>';
  html += '<div class="rail">';
  html += '<div class="rail-step revealer"><div class="step-num">1</div><h3>The Problem</h3><p>You launch to a cold list. Conversion stalls day one.</p></div>';
  html += '<div class="rail-step revealer" style="transition-delay:0.1s"><div class="step-num">2</div><h3>What We Do</h3><p>We implement a gated, milestone-based referral system. Users earn access by bringing their network.</p></div>';
  html += '<div class="rail-step revealer" style="transition-delay:0.2s"><div class="step-num">3</div><h3>The Outcome</h3><p>Exponential, verifiable growth. Launch to an audience already invested.</p></div>';
  html += '</div>';
  html += '</section>';

  // Features
  html += '<section id="features">';
  html += '<span class="section-label revealer">Features</span>';
  html += '<h2 class="revealer">Everything you need<br>to build hype.</h2>';
  html += '<div class="bento">';
  
  // Bento 1
  html += '<div class="bento-card bento-1 revealer">';
  html += '<svg class="svg-illus" viewBox="0 0 400 160">';
  html += '<rect x="40" y="20" width="200" height="180" rx="8" fill="none" stroke="var(--border)" stroke-width="2"/>';
  html += '<rect x="60" y="40" width="80" height="12" rx="4" fill="var(--text-muted)"/>';
  html += '<rect x="60" y="70" width="160" height="8" rx="4" fill="var(--border)"/>';
  html += '<rect x="60" y="90" width="120" height="8" rx="4" fill="var(--border)"/>';
  html += '<rect x="60" y="120" width="60" height="24" rx="12" fill="var(--accent)"/>';
  html += '</svg>';
  html += '<h3>Beautiful Mobile-Optimized Pages</h3>';
  html += '<p>Hosted pages that load instantly and look perfect on any device.</p>';
  html += '</div>';

  // Bento 2
  html += '<div class="bento-card bento-2 revealer" style="transition-delay:0.1s">';
  html += '<svg class="svg-illus" viewBox="0 0 200 300" style="height:auto;flex:1;">';
  html += '<circle cx="100" cy="40" r="12" fill="var(--accent)"/>';
  html += '<path d="M100 52 L60 120" class="node-line"/>';
  html += '<path d="M100 52 L140 120" class="node-line"/>';
  html += '<circle cx="60" cy="132" r="8" fill="var(--text-muted)"/>';
  html += '<circle cx="140" cy="132" r="8" fill="var(--text-muted)"/>';
  html += '</svg>';
  html += '<h3>Viral Referral Engine</h3>';
  html += '<p>Built-in gamification. Users unlock access by inviting their peers.</p>';
  html += '</div>';

  // Bento 3
  html += '<div class="bento-card bento-3 revealer">';
  html += '<svg class="svg-illus" viewBox="0 0 400 120">';
  html += '<path d="M20 100 Q 60 90 100 70 T 180 50 T 260 80 T 340 20 T 380 10" fill="none" stroke="var(--accent)" stroke-width="2"/>';
  html += '<path d="M20 100 Q 60 90 100 70 T 180 50 T 260 80 T 340 20 T 380 10 L 380 120 L 20 120 Z" fill="rgba(200,255,0,0.05)" />';
  html += '</svg>';
  html += '<h3>Real-time Analytics & Export</h3>';
  html += '<p>Track conversions, exact referral sources, and export your validated list to CSV.</p>';
  html += '</div>';
  
  html += '</div>';
  html += '</section>';

  // Pricing
  html += '<section id="pricing">';
  html += '<span class="section-label revealer">Pricing</span>';
  html += '<h2 class="revealer">Simple, transparent<br>plans.</h2>';
  html += '<p class="lead revealer">Start for free. Scale when you need to.</p>';
  html += '<div class="pricing-grid">';

  const tiers = [
    { name: "Free", price: "0", desc: "1 waitlist, 100 signups, basic analytics, branded", btn: "Get started free", url: "/app#/register" },
    { name: "Pro", price: "19", desc: "5 waitlists, unlimited signups, advanced analytics + CSV, remove branding", btn: "Start 14-day trial", url: "/app#/register", pro: true },
    { name: "Business", price: "49", desc: "Unlimited everything, priority API, white-label", btn: "Start 14-day trial", url: "/app#/register" }
  ];

  tiers.forEach((t, i) => {
    html += `<div class="price-tier revealer ${t.pro ? 'pro' : ''}" style="transition-delay:${i*0.1}s">`;
    html += `<div class="tier-name">${t.name}</div>`;
    html += `<div class="price">$${t.price}<span>/${t.price==='0'?'forever':'mo'}</span></div>`;
    html += `<div class="price-desc">${t.desc}</div>`;
    html += '<ul class="features-list">';
    const feats = t.desc.split(', ');
    feats.forEach(f => {
      html += `<li>${checkSVG} ${f}</li>`;
    });
    html += '</ul>';
    if(t.pro) html += `<a href="${t.url}" class="btn-accent" style="text-align:center;">${t.btn}</a>`;
    else html += `<a href="${t.url}" class="btn-outline">${t.btn}</a>`;
    html += '</div>';
  });

  html += '</div>';
  html += '</section>';

  // Footer
  html += '<footer>';
  html += `<div class="logo">${logoSVG} WaitlistWizard &copy; 2026</div>`;
  html += '<div class="f-links"><a href="/legal/privacy">Privacy</a><a href="/legal/terms">Terms</a><a href="/legal/contact">Contact</a></div>';
  html += '</footer>';

  // JS
  html += '<script>';
  html += `
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.revealer').forEach(el => observer.observe(el));
  `;
  html += '</script>';
  html += '</body></html>';
  return html;
}
