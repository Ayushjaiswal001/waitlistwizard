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
  html += '<meta name="theme-color" content="#fcfaf8" />';
  html += `<link rel="canonical" href="${APP_URL}/" />`;
  html += '<link rel="preconnect" href="https://fonts.googleapis.com" />';
  html += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />';
  html += '<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />';
  html += '<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap" rel="stylesheet" />';
  html += '<style>';
  html += `
:root {
  --bg: #FAFAF8;
  --bg-surface: #FFFFFF;
  --bg-input: #F3F1EF;
  --text-main: #242220;
  --text-muted: #6B6862;
  --accent: #7a54ff;
  --accent-dark: #6336ff;
  --accent-light: #f2eeff;
  --accent-yellow: #fddb6a;
  --border: rgba(36,34,32,0.06);
  --border-strong: rgba(36,34,32,0.12);
  --font-display: 'Instrument Serif', serif;
  --font-body: 'General Sans', sans-serif;
  --shadow-sm: 0 4px 20px rgba(0,0,0,0.03);
  --shadow-md: 0 12px 40px rgba(122, 84, 255, 0.08);
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

/* Soft Gradient Backgrounds */
.bg-gradients {
  position: fixed; inset: 0; z-index: -2; overflow: hidden; pointer-events: none;
}
.bg-blob {
  position: absolute; filter: blur(120px); opacity: 0.7; border-radius: 50%;
}
.blob-1 { width: 60vw; height: 60vw; background: #e9e5fc; top: -20%; left: -10%; }
.blob-2 { width: 50vw; height: 50vw; background: #fdf5d7; top: 10%; right: -15%; }
.blob-3 { width: 70vw; height: 70vw; background: #fdefeb; bottom: -30%; left: 10%; }

/* Fine Grid Tech Touch */
body::before {
  content: ''; position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background-image: 
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.4;
}

/* Nav */
nav { 
  position: sticky; top: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center; 
  padding: 16px 5%; 
  background: rgba(250, 250, 248, 0.8); backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}
.logo { display:flex; align-items:center; gap:10px; font-weight:600; font-size:24px; font-family: var(--font-display); letter-spacing: 0.02em; }
.logo svg { width: 32px; height: 32px; fill: var(--accent); }
.nav-links { display:flex; gap:36px; font-weight:500; font-size:15px; color:var(--text-muted); }
.nav-links a:hover { color:var(--text-main); transition: 0.2s; }
.nav-right { display:flex; gap:24px; align-items:center; }
.btn-login { font-weight: 500; font-size: 15px; color: var(--text-main); transition: 0.2s;}
.btn-login:hover { color: var(--accent); }
.btn-accent { 
  background: var(--accent); color: #FFF; padding: 12px 28px; 
  border-radius: 999px; font-weight: 500; font-size: 15px; box-shadow: 0 4px 14px rgba(122, 84, 255, 0.25);
  transition: transform 0.2s ease, background 0.2s, box-shadow 0.2s; 
}
.btn-accent:hover { background: var(--accent-dark); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(122, 84, 255, 0.35); }

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
.mob-overlay a:hover { color: var(--accent); font-style: italic; }

/* General Layout */
section { padding: 120px 5%; position: relative; max-width: 1400px; margin: 0 auto; }
.section-label { 
  display: inline-block; padding: 6px 16px; border-radius: 999px; background: var(--accent-light);
  font-size: 13px; font-weight: 600; letter-spacing: 0.04em; 
  text-transform: uppercase; color: var(--accent-dark); margin-bottom: 24px; 
}
h2 { font-family: var(--font-display); font-size: clamp(3rem, 6vw, 4.5rem); font-weight: 400; line-height: 1.1; margin-bottom: 24px; letter-spacing: -0.02em; color: var(--text-main); }
p.lead { font-size: 1.25rem; color: var(--text-muted); max-width: 560px; line-height: 1.6; }

/* Hero */
.hero { text-align: left; padding: 160px 5% 140px; overflow: hidden; position: relative; max-width: 1400px; margin: 0 auto; }
.hero-content { position: relative; z-index: 2; max-width: 700px; }
.hero-badge { 
  display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: #FFFFFF; border: 1px solid var(--border); 
  border-radius: 999px; font-size: 13px; font-weight: 500; margin-bottom: 32px; box-shadow: var(--shadow-sm); 
  color: var(--text-muted);
}
.sparkle-icon { fill: var(--accent-yellow); width: 14px; height: 14px; animation: sparkle 2s infinite ease-in-out alternate; }
.hero-badge span { color: var(--accent); font-weight: 600; }
.hero h1 { 
  font-family: var(--font-display); font-size: clamp(3.5rem, 8vw, 5.5rem); 
  font-weight: 400; line-height: 1.05; letter-spacing: -0.03em; 
  margin-bottom: 32px; max-width: 14ch; color: var(--text-main);
  position: relative;
}
.hero-cta { display: flex; align-items: center; gap: 20px; margin-top: 48px; flex-wrap: wrap; }
.hero-cta .btn-accent { padding: 16px 36px; font-size: 16px; font-weight: 600; }
.microcopy { font-size: 14px; color: var(--text-muted); display: flex; align-items: center; gap: 8px; font-weight: 500; }

/* Playful Clouds / Art */
.hero-art { 
  position: absolute; right: 2%; top: 5%; width: 600px; height: 600px; 
  z-index: 1; pointer-events: none;
}
.soft-cloud { fill: #ffffff; filter: drop-shadow(0 20px 40px rgba(122, 84, 255, 0.1)); animation: floatY 6s ease-in-out infinite alternate; }
.soft-cloud-2 { fill: rgba(255,255,255,0.8); filter: drop-shadow(0 10px 20px rgba(122, 84, 255, 0.05)); animation: floatY 8s ease-in-out infinite alternate-reverse; }
.sun-shape { fill: url(#sunGrad); animation: floatY 7s ease-in-out infinite alternate; }
.star-shape { fill: var(--accent-light); animation: floatY 5s ease-in-out infinite alternate; }
@keyframes floatY { 0% { transform: translateY(-15px); } 100% { transform: translateY(15px); } }
@keyframes sparkle { 0% { transform: scale(0.8); opacity: 0.7; } 100% { transform: scale(1.2); opacity: 1; } }

/* How It Works */
.rail { display: flex; gap: 32px; margin-top: 80px; position: relative; }
.rail-step { flex: 1; background: var(--bg-surface); padding: 48px 32px; border-radius: 32px; border: 1px solid var(--border); box-shadow: var(--shadow-sm); position: relative; transition: transform 0.3s; }
.rail-step:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.step-icon-wrap {
  width: 64px; height: 64px; border-radius: 20px; background: var(--accent-light); 
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px; box-shadow: inset 0 0 0 1px rgba(122, 84, 255, 0.1);
}
.step-icon-wrap svg { width: 32px; height: 32px; fill: var(--accent); }
.rail-step h3 { font-size: 24px; margin-bottom: 16px; font-family: var(--font-display); }
.rail-step p { color: var(--text-muted); font-size: 16px; line-height: 1.5; }

/* Features (Bento) */
.bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 80px; }
.bento-card { border: 1px solid var(--border); background: var(--bg-surface); padding: 48px; border-radius: 32px; box-shadow: var(--shadow-sm); transition: transform 0.3s; overflow: hidden; position: relative; }
.bento-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.bento-1 { grid-column: span 2; background: linear-gradient(135deg, #fff, #F7F5FC); }
.bento-2 { grid-column: span 1; grid-row: span 2; display: flex; flex-direction: column; align-items:center; text-align:center; padding: 56px 32px; background: linear-gradient(180deg, #fff, #FFFDF5); }
.bento-3 { grid-column: span 2; background: linear-gradient(135deg, #fff, #FCF5F5); }
.bento-card h3 { font-size: 32px; font-family: var(--font-display); margin-top: auto; padding-top: 40px; color: var(--text-main); position: relative; z-index: 2; line-height: 1.1; }
.bento-card p { color: var(--text-muted); font-size: 16px; margin-top: 16px; position: relative; z-index: 2; line-height: 1.5; }

/* Bento Illustrations */
.svg-illus { width: 100%; height: 220px; margin-bottom: 24px; display: block; position: relative; z-index: 1; }
.bento-card::after {
  content: ''; position: absolute; bottom: -20%; right: -10%; width: 300px; height: 300px;
  background: var(--accent-yellow); filter: blur(100px); opacity: 0.15; z-index: 0; pointer-events: none;
}
.bento-1::after { background: var(--accent); opacity: 0.1; }
.bento-3::after { background: #ffaaaa; opacity: 0.1; }

/* Pricing */
.pricing-grid { display: flex; gap: 24px; margin-top: 80px; align-items: center; }
.price-tier { flex: 1; border: 1px solid var(--border); background: var(--bg-surface); padding: 48px 40px; display: flex; flex-direction: column; border-radius: 32px; box-shadow: var(--shadow-sm); }
.price-tier.pro { border-color: var(--accent-light); transform: scale(1.05); background: #FFFFFF; box-shadow: var(--shadow-md); position: relative; z-index: 2; padding: 64px 40px; border: 2px solid var(--accent); }
.tier-badge { position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); background: var(--accent); color: #fff; padding: 8px 20px; border-radius: 999px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 4px 12px rgba(122, 84, 255, 0.3); }
.tier-name { font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-main); }
.price { font-family: var(--font-display); font-size: 72px; margin: 24px 0 8px; line-height: 1; color: var(--text-main); }
.price span { font-size: 18px; font-family: var(--font-body); color: var(--text-muted); font-weight: 400; }
.price-desc { font-size: 16px; color: var(--text-muted); height: 56px; border-bottom: 1px solid var(--border); padding-bottom: 24px; margin-bottom: 24px; line-height: 1.4; }
.features-list { list-style: none; flex: 1; margin-bottom: 40px; }
.features-list li { margin-bottom: 16px; display: flex; align-items: flex-start; gap: 12px; font-size: 15px; color: var(--text-main); font-weight: 500; }
.features-list svg { width: 22px; height: 22px; fill: var(--accent); flex-shrink: 0; }
.btn-outline { display: block; text-align: center; width: 100%; padding: 16px; border: 1px solid var(--border-strong); border-radius: 999px; transition: 0.2s; color: var(--text-main); font-weight: 600; font-size: 16px; }
.btn-outline:hover { background: var(--bg-input); border-color: var(--text-muted); }
.btn-accent-full { display: block; text-align: center; width: 100%; padding: 16px; background: var(--accent); color: #fff; border-radius: 999px; transition: 0.2s; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px rgba(122, 84, 255, 0.2); }
.btn-accent-full:hover { background: var(--accent-dark); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(122, 84, 255, 0.3); }

/* Footer */
footer { padding: 60px 4%; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); background: var(--bg-surface); margin-top: 40px; }
.f-links { display: flex; gap: 32px; font-size: 15px; color: var(--text-muted); font-weight: 500; }
.f-links a:hover { color: var(--accent); }

/* Scroll Anim */
.revealer { opacity: 0; transform: translateY(20px); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.revealer.visible { opacity: 1; transform: translateY(0); }

/* Responsive */
@media (max-width: 1024px) {
  .bento { grid-template-columns: 1fr; }
  .bento-1, .bento-2, .bento-3 { grid-column: span 1; grid-row: auto; }
  .pricing-grid { flex-direction: column; align-items: stretch; }
  .price-tier.pro { transform: none; padding: 48px 32px; }
  .hero-art { opacity: 0.3; right: -20%; }
}
@media (max-width: 768px) {
  .nav-links, .nav-right { display: none; }
  .ham { display: flex; }
  .rail { flex-direction: column; gap: 32px; }
  .hero-art { display: none; }
  footer { flex-direction: column; gap: 32px; align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
  `;
  html += '</style>';
  html += '</head>';
  html += '<body>';
  
  // Background gradient blobs wrapper
  html += '<div class="bg-gradients">';
  html += '<div class="bg-blob blob-1"></div>';
  html += '<div class="bg-blob blob-2"></div>';
  html += '<div class="bg-blob blob-3"></div>';
  html += '</div>';
  
  const logoSVG = `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>`;
  const checkSVG = `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;

  // Nav
  html += '<nav>';
  html += `<a href="/" class="logo">${logoSVG} WaitlistWizard</a>`;
  html += '<div class="nav-links"><a href="#how">Solution</a><a href="#features">Features</a><a href="#pricing">Pricing</a></div>';
  html += '<div class="nav-right"><a href="/app#/login" class="btn-login">Sign in</a><a href="/app#/register" class="btn-accent">Get started</a></div>';
  html += '<button class="ham" onclick="document.getElementById(\'mob-nav\').classList.toggle(\'active\')"><span></span><span></span></button>';
  html += '</nav>';

  // Mobile Nav
  html += '<div class="mob-overlay" id="mob-nav">';
  html += '<button style="position:absolute;top:20px;right:5%;font-size:32px;color:var(--text-main);" onclick="document.getElementById(\'mob-nav\').classList.remove(\'active\')">&times;</button>';
  html += '<a href="#how" onclick="document.getElementById(\'mob-nav\').classList.remove(\'active\')">Solution</a>';
  html += '<a href="#features" onclick="document.getElementById(\'mob-nav\').classList.remove(\'active\')">Features</a>';
  html += '<a href="#pricing" onclick="document.getElementById(\'mob-nav\').classList.remove(\'active\')">Pricing</a>';
  html += '<a href="/app#/login">Sign in</a>';
  html += '<a href="/app#/register" style="color:var(--accent);">Get started</a>';
  html += '</div>';

  // Hero
  html += '<section class="hero">';
  html += '<svg class="hero-art" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">';
  html += '<defs>';
  html += '<linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFD25F"/><stop offset="100%" stop-color="#FFAD33"/></linearGradient>';
  html += '</defs>';
  // Playful clouds and geometric shapes
  html += '<path class="soft-cloud-2" d="M380,240 C410,240 430,260 430,290 C430,320 410,340 380,340 L180,340 C150,340 130,320 130,290 C130,260 150,240 180,240 C180,210 210,180 250,180 C290,180 320,200 340,230 C350,230 365,240 380,240 Z" opacity="0.6"/>';
  html += '<circle cx="420" cy="180" r="90" class="sun-shape"/>';
  html += '<path class="soft-cloud" d="M420,380 C460,380 490,410 490,450 C490,490 460,520 420,520 L220,520 C180,520 150,490 150,450 C150,410 180,380 220,380 C220,340 260,300 320,300 C370,300 400,330 420,360 C420,360 420,380 420,380 Z"/>';
  html += '<polygon class="star-shape" points="150,150 160,180 190,190 160,200 150,230 140,200 110,190 140,180" opacity="0.8"/>';
  html += '<polygon class="star-shape" style="animation-delay:-2s" points="520,300 525,315 540,320 525,325 520,340 515,325 500,320 515,315" opacity="0.8"/>';
  html += '</svg>';
  html += '<div class="hero-content">';
  html += '<div class="hero-badge revealer">';
  html += `<svg class="sparkle-icon" viewBox="0 0 24 24"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg>`;
  html += '<span>WaitlistWizard</span> is the smart viral companion';
  html += '</div>';
  html += '<h1 class="revealer">Your smart waitlist companion.</h1>';
  html += '<p class="lead revealer">Turn a cold email list into an engaging viral machine. Elegant, automated, and ready to grow your early user base exponentially.</p>';
  html += '<div class="hero-cta revealer">';
  html += '<a href="/app#/register" class="btn-accent">Build your list &rarr;</a>';
  html += '<span class="microcopy"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6V12L16 16" stroke="var(--bg-surface)" stroke-width="2" fill="none"/></svg> Launch in under 2 minutes</span>';
  html += '</div>';
  html += '</div>';
  html += '</section>';

  // How It Works
  html += '<section id="how">';
  html += '<span class="section-label revealer">The Solution</span>';
  html += '<h2 class="revealer">The Smartest All-in-One<br>Waitlist App</h2>';
  html += '<p class="lead revealer">Smarter gamification means more referrals, better engagement, and an eager audience waiting for your launch.</p>';
  html += '<div class="rail">';
  html += '<div class="rail-step revealer">';
  html += '<div class="step-icon-wrap"><svg viewBox="0 0 24 24"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg></div>';
  html += '<h3>Set the Milestone</h3><p>Assign rewards for reaching referral goals. Incentivize users naturally.</p></div>';
  html += '<div class="rail-step revealer" style="transition-delay:0.1s">';
  html += '<div class="step-icon-wrap" style="background:#FFF4CD;"><svg viewBox="0 0 24 24" style="fill:#F6D65C;"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg></div>';
  html += '<h3>Users Invite Friends</h3><p>Your users get unique links that make sharing across their network effortless.</p></div>';
  html += '<div class="rail-step revealer" style="transition-delay:0.2s">';
  html += '<div class="step-icon-wrap" style="background:#FFE8E1;"><svg viewBox="0 0 24 24" style="fill:#FF8A65;"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h-2v5H6v2h2v5h2v-5h2v-2z"/></svg></div>';
  html += '<h3>Automated Tracking</h3><p>We log every referral, verify legitimate signups, and rank users in real-time.</p></div>';
  html += '</div>';
  html += '</section>';

  // Features
  html += '<section id="features">';
  html += '<span class="section-label revealer">Features</span>';
  html += '<h2 class="revealer">Why Creators Love<br>Our Engine</h2>';
  html += '<div class="bento">';
  
  // Bento 1
  html += '<div class="bento-card bento-1 revealer">';
  html += '<svg class="svg-illus" viewBox="0 0 400 160">';
  html += '<rect x="40" y="20" width="220" height="180" rx="20" fill="#ffffff" stroke="var(--border)" stroke-width="2" filter="drop-shadow(0 12px 24px rgba(0,0,0,0.05))"/>';
  html += '<rect x="60" y="50" width="80" height="12" rx="6" fill="#e9e5fc"/>';
  html += '<rect x="60" y="80" width="160" height="8" rx="4" fill="#f3f1ef"/>';
  html += '<rect x="60" y="100" width="120" height="8" rx="4" fill="#f3f1ef"/>';
  html += '<rect x="60" y="130" width="80" height="32" rx="16" fill="var(--accent)"/>';
  html += '<circle cx="210" cy="56" r="16" fill="#fddb6a"/>';
  html += '</svg>';
  html += '<h3>Beautiful Hosted Pages</h3>';
  html += '<p>Pages that feel human, elegant, and convert wonderfully across any device.</p>';
  html += '</div>';

  // Bento 2
  html += '<div class="bento-card bento-2 revealer" style="transition-delay:0.1s">';
  html += '<svg class="svg-illus" viewBox="0 0 200 300" style="height:auto;flex:1;">';
  html += '<circle cx="100" cy="60" r="32" fill="#fff" stroke="var(--accent)" stroke-width="4"/>';
  html += '<path d="M100 92 L60 160" stroke="var(--border-strong)" stroke-width="2" stroke-dasharray="6"/>';
  html += '<path d="M100 92 L140 160" stroke="var(--border-strong)" stroke-width="2" stroke-dasharray="6"/>';
  html += '<circle cx="60" cy="180" r="24" fill="#fff" stroke="#FF8A65" stroke-width="4"/>';
  html += '<circle cx="140" cy="180" r="24" fill="#fff" stroke="#fddb6a" stroke-width="4"/>';
  html += '</svg>';
  html += '<h3>Viral Loops</h3>';
  html += '<p>Built-in mechanics to turn single signups into clusters of active users effortlessly.</p>';
  html += '</div>';

  // Bento 3
  html += '<div class="bento-card bento-3 revealer">';
  html += '<svg class="svg-illus" viewBox="0 0 400 120">';
  html += '<path d="M20 100 Q 60 90 100 40 T 180 30 T 260 60 T 340 20 T 380 10" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round"/>';
  html += '<circle cx="100" cy="40" r="6" fill="#fff" stroke="var(--accent)" stroke-width="2"/>';
  html += '<circle cx="180" cy="30" r="6" fill="#fff" stroke="var(--accent)" stroke-width="2"/>';
  html += '<circle cx="260" cy="60" r="6" fill="#fff" stroke="var(--accent)" stroke-width="2"/>';
  html += '<circle cx="340" cy="20" r="6" fill="#fff" stroke="var(--accent)" stroke-width="2"/>';
  html += '</svg>';
  html += '<h3>Real-time Analytics</h3>';
  html += '<p>Know exactly which users drive the most impact, export your lists, and watch growth metrics dynamically.</p>';
  html += '</div>';
  
  html += '</div>';
  html += '</section>';

  // Pricing
  html += '<section id="pricing">';
  html += '<span class="section-label revealer">Pricing</span>';
  html += '<h2 class="revealer">A Plan for Every<br>Ambition</h2>';
  html += '<p class="lead revealer">Join a community of founders who grew their waitlists effortlessly.</p>';
  html += '<div class="pricing-grid">';

  const tiers = [
    { name: "Starter", price: "0", desc: "For new projects needing a beautiful start. 1 waitlist & 100 signups.", btn: "Get started free", url: "/app#/register" },
    { name: "Creator", price: "19", desc: "For scaling growth. 5 waitlists, unlimited signups, advanced analytics.", btn: "Start 14-day trial", url: "/app#/register", pro: true },
    { name: "Business", price: "49", desc: "For professional launches. Unlimited everything, API access, white-label.", btn: "Start 14-day trial", url: "/app#/register" }
  ];

  tiers.forEach((t, i) => {
    html += `<div class="price-tier revealer ${t.pro ? 'pro' : ''}" style="transition-delay:${i*0.1}s">`;
    if(t.pro) html += `<div class="tier-badge">Most Popular</div>`;
    html += `<div class="tier-name">${t.name}</div>`;
    html += `<div class="price">$${t.price}<span>/${t.price==='0'?'forever':'mo'}</span></div>`;
    html += `<div class="price-desc">${t.desc}</div>`;
    html += '<ul class="features-list">';
    // Dummy features
    html += `<li>${checkSVG} Customizable hosted pages</li>`;
    html += `<li>${checkSVG} Referral link generation</li>`;
    if (t.price !== '0') html += `<li>${checkSVG} Unlimited referrals tracking</li>`;
    if (t.name === 'Business') html += `<li>${checkSVG} White-label email branding</li>`;
    html += '</ul>';
    if(t.pro) html += `<a href="${t.url}" class="btn-accent-full">${t.btn}</a>`;
    else html += `<a href="${t.url}" class="btn-outline">${t.btn}</a>`;
    html += '</div>';
  });

  html += '</div>';
  html += '</section>';

  // Footer
  html += '<footer>';
  html += `<div class="logo" style="font-size:20px;">${logoSVG} WaitlistWizard &copy; 2026</div>`;
  html += '<div class="f-links"><a href="/legal/privacy">Privacy</a><a href="/legal/terms">Terms</a><a href="/legal/contact">Contact Us</a></div>';
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
