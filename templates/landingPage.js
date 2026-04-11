export function renderLandingPage() {
  const APP_URL = process.env.APP_URL || '';
  let html = '';
  html += '<!DOCTYPE html>';
  html += '<html lang="en">';
  html += '<head>';
  html += '<meta charset="UTF-8" />';
  html += '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
  html += '<title>WaitlistWizard — Build viral waitlist pages in 60 seconds</title>';
  html += '<meta name="description" content="Create stunning waitlist pages with powerful referral mechanics. Launch to an audience already waiting." />';
  html += '<meta name="theme-color" content="#fafafa" />';
  html += '<meta name="robots" content="index, follow" />';
  html += `<link rel="canonical" href="${APP_URL}/" />`;
  html += '<meta property="og:type" content="website" />';
  html += `<meta property="og:title" content="WaitlistWizard — Build viral waitlist pages" />`;
  html += `<meta property="og:url" content="${APP_URL}/" />`;
  html += '<meta property="og:description" content="Create stunning waitlist pages with powerful referral mechanics." />';
  html += `<meta property="og:image" content="${APP_URL}/og-image.png" />`;
  html += '<meta property="og:image:width" content="1200" />';
  html += '<meta property="og:image:height" content="630" />';
  html += '<meta name="twitter:card" content="summary_large_image" />';
  html += `<meta name="twitter:title" content="WaitlistWizard — Build viral waitlist pages" />`;
  html += '<meta name="twitter:description" content="Create stunning waitlist pages with powerful referral mechanics." />';
  html += `<meta name="twitter:image" content="${APP_URL}/og-image.png" />`;
  html += '<link rel="preconnect" href="https://fonts.googleapis.com" />';
  html += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />';
  html += '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />';
  html += '<link rel="icon" href="data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'.9em\' font-size=\'90\'>⚡</text></svg>" />';
  
  html += '<style>';
  html += `
:root {
  --bg-main: #FAFAFA;
  --bg-card: #FFFFFF;
  --text-main: #111827;
  --text-sub: #4B5563;
  --text-dim: #9CA3AF;
  --border-light: #F3F4F6;
  --border-main: #E5E7EB;
  --border-dark: #D1D5DB;
  --brand-primary: #0F172A;
  --brand-hover: #1E293B;
  --accent: #10B981;
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:var(--font-sans); background:var(--bg-main); color:var(--text-sub); overflow-x:hidden; -webkit-font-smoothing: antialiased; }
a { color:inherit; text-decoration:none; }
button { cursor:pointer; border:none; font-family:inherit; }

/* Typography */
h1, h2, h3, h4, h5, h6 { color: var(--text-main); font-weight: 700; }

/* ── Nav ── */
nav { position:fixed; top:0; left:0; right:0; z-index:1000; padding:16px 5%; display:flex; align-items:center; justify-content:space-between; transition:background .3s, backdrop-filter .3s, border-bottom .3s; border-bottom: 1px solid transparent; }
nav.sc { background:rgba(255,255,255,.8); backdrop-filter:blur(20px); border-bottom: 1px solid var(--border-main); }
.logo { display:flex; align-items:center; gap:8px; font-weight:700; font-size:18px; color:var(--text-main); letter-spacing: -0.02em; }
.logo-icon { font-size:22px; }
.nlinks { display:flex; gap:36px; font-weight:500; font-size:14px; color:var(--text-sub); }
.nlinks a { transition:color .2s; }
.nlinks a:hover { color:var(--text-main); }
.nctas { display:flex; gap:12px; }

.btn { display:inline-flex; align-items:center; justify-content:center; padding:10px 20px; border-radius:999px; font-weight:500; font-size:14px; transition:all .2s; cursor:pointer; }
.btn-ghost { background:transparent; color:var(--text-sub); }
.btn-ghost:hover { color:var(--text-main); background:var(--border-light); }
.btn-primary { background:var(--brand-primary); color:#fff; box-shadow:0 1px 2px rgba(0,0,0,0.05); }
.btn-primary:hover { transform:translateY(-1px); box-shadow:0 4px 12px rgba(0,0,0,0.1); background:var(--brand-hover); }

.ham { display:none; flex-direction:column; gap:5px; background:transparent; padding:8px; z-index:2; }
.ham span { width:24px; height:2px; background:var(--text-main); border-radius:2px; }

/* ── Mobile overlay ── */
.moverlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:var(--bg-main);z-index:9998;flex-direction:column;align-items:center;justify-content:center;gap:32px;}
.moverlay a{font-size:20px;font-weight:600;color:var(--text-main);}
.mcls{position:absolute;top:20px;right:5%;background:transparent;font-size:32px;color:var(--text-main);}

/* ── Hero ── */
.hero { position:relative; min-height:90vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:120px 5% 60px; text-align:center; }
.hero::before { content:''; position:absolute; top:0; left:0; right:0; bottom:0; background: radial-gradient(circle at top, rgba(243,244,246,1) 0%, rgba(250,250,250,0) 70%); z-index:0; pointer-events:none; }
.hcont { position:relative; z-index:2; max-width:800px; display:flex; flex-direction:column; align-items:center; }
.hbadge { display:inline-flex; align-items:center; gap:8px; padding:6px 16px; background:var(--bg-card); border:1px solid var(--border-main); border-radius:999px; font-size:13px; font-weight:500; color:var(--text-sub); margin-bottom:32px; box-shadow:0 1px 2px rgba(0,0,0,0.05); }
.hh1 { font-size:clamp(40px,6vw,72px); letter-spacing:-0.03em; line-height:1.05; margin-bottom:24px; color:var(--text-main); }
.hsub { font-size:20px; line-height:1.5; color:var(--text-sub); max-width:600px; margin:0 auto 48px; }
.cta-box { display:flex; gap:12px; background:var(--bg-card); padding:8px; border-radius:999px; border:1px solid var(--border-main); box-shadow:0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05); transition:all 0.3s; width: 100%; max-width: 480px; margin: 0 auto; }
.cta-box:focus-within { border-color:var(--text-dim); box-shadow:0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1); }
.cta-box input { flex:1; background:transparent; border:none; outline:none; padding:0 20px; font-size:15px; color:var(--text-main); }
.cta-box input::placeholder { color:var(--text-dim); }
.cta-box .btn-primary { padding: 12px 28px; }

.hero-meta { margin-top: 24px; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); display: flex; align-items: center; gap: 16px; justify-content: center;}

/* ── Social Proof ── */
.social-proof { padding: 60px 5%; border-top: 1px solid var(--border-light); background: var(--bg-card); text-align: center; }
.proof-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-dim); margin-bottom: 32px; font-weight: 600; }
.proof-logos { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 48px; opacity: 0.6; filter: grayscale(100%); transition: all 0.3s; }
.proof-logos:hover { opacity: 0.8; }
.proof-logo { font-size: 20px; font-weight: 700; letter-spacing: -0.04em; color: var(--text-main); }

/* ── Narrative Grid (Problem/Solution/Outcome) ── */
.narrative { padding: 100px 5%; background: var(--bg-main); }
.n-header { max-width: 600px; margin: 0 auto 64px; text-align: center; }
.n-header h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); margin-bottom: 12px; }
.n-header h3 { font-size: 36px; letter-spacing: -0.02em; margin-bottom: 16px; }
.n-header p { font-size: 18px; color: var(--text-sub); }

.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1100px; margin: 0 auto; }
.card { background: var(--bg-card); border: 1px solid var(--border-main); border-radius: 16px; padding: 40px 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: all 0.3s; }
.card:hover { box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); transform: translateY(-2px); }
.card-num { width: 40px; height: 40px; border-radius: 8px; background: var(--border-light); border: 1px solid var(--border-main); display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--text-main); margin-bottom: 24px; }
.card h4 { font-size: 20px; margin-bottom: 12px; }
.card p { line-height: 1.6; font-size: 15px; }

/* ── Clean Process ── */
.process { padding: 100px 5%; background: var(--bg-card); border-top: 1px solid var(--border-main); border-bottom: 1px solid var(--border-main); }
.p-container { max-width: 900px; margin: 0 auto; }
.p-row { display: flex; align-items: flex-start; gap: 32px; margin-bottom: 48px; position: relative; }
.p-row:last-child { margin-bottom: 0; }
.p-row::before { content: ''; position: absolute; left: 24px; top: 48px; bottom: -48px; width: 1px; background: var(--border-main); }
.p-row:last-child::before { display: none; }
.p-icon { width: 48px; height: 48px; flex-shrink: 0; background: var(--bg-main); border: 1px solid var(--border-main); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; color: var(--text-main); position: relative; z-index: 2; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.p-content h4 { font-size: 20px; margin-bottom: 8px; margin-top: 10px; }
.p-content p { color: var(--text-sub); line-height: 1.6; }

/* ── Pricing ── */
.pricing { padding: 120px 5%; background: var(--bg-main); }
.price-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1100px; margin: 0 auto; }
.price-card { background: var(--bg-card); border: 1px solid var(--border-main); border-radius: 20px; padding: 48px 32px; text-align: left; }
.price-card.featured { border-color: var(--brand-primary); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.08); position: relative; }
.featured-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--brand-primary); color: #fff; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
.price-card h3 { font-size: 20px; margin-bottom: 8px; }
.price-desc { font-size: 14px; color: var(--text-dim); margin-bottom: 24px; min-height: 40px; }
.price-amount { font-size: 48px; font-weight: 800; color: var(--text-main); letter-spacing: -0.04em; margin-bottom: 24px; }
.price-amount span { font-size: 16px; font-weight: 400; color: var(--text-sub); letter-spacing: 0; }
.price-features { list-style: none; margin-bottom: 32px; }
.price-features li { padding: 12px 0; border-top: 1px solid var(--border-light); font-size: 14px; display: flex; align-items: center; gap: 12px; }
.feat-check { color: var(--text-main); font-weight: 700; }
.price-btn { display: block; width: 100%; text-align: center; padding: 12px; border-radius: 12px; font-weight: 500; font-size: 15px; border: 1px solid var(--border-dark); color: var(--text-main); transition: all 0.2s; }
.price-btn:hover { background: var(--border-light); }
.price-card.featured .price-btn { background: var(--brand-primary); color: #fff; border: none; }
.price-card.featured .price-btn:hover { background: var(--brand-hover); }

/* ── Footer ── */
footer { padding: 48px 5%; border-top: 1px solid var(--border-main); background: var(--bg-card); }
.fcont { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; font-size: 14px; color: var(--text-sub); }
.flinks { display: flex; gap: 32px; }
.flinks a { transition: color 0.2s; }
.flinks a:hover { color: var(--text-main); }

/* ── Animation ── */
.rv { opacity: 0; transform: translateY(20px); transition: opacity 0.6s, transform 0.6s; }
.rv.vs { opacity: 1; transform: translateY(0); }

@media(max-width:860px) {
  .nlinks, .nctas { display:none; }
  .ham { display:flex; }
  .grid-3, .price-grid { grid-template-columns: 1fr; }
  .p-row::before { display: none; }
}
@media(max-width:560px) {
  .hh1 { font-size: clamp(36px, 8vw, 48px); }
  .cta-box { flex-direction: column; padding: 12px; border-radius: 16px; }
  .cta-box input { padding: 10px; margin-bottom: 8px; text-align: center; }
  .cta-box .btn-primary { width: 100%; border-radius: 8px; }
  .fcont { flex-direction: column; gap: 24px; text-align: center; }
}
  `;
  html += '</style>';
  html += '</head>';
  html += '<body>';
  
  // ── Nav ──
  html += '<nav>';
  html += '<div class="logo"><span class="logo-icon">⚡</span><span>WaitlistWizard</span></div>';
  html += '<div class="nlinks"><a href="#how">How it works</a><a href="#features">Features</a><a href="#pricing">Pricing</a></div>';
  html += '<div class="nctas"><a href="/app#/login" class="btn btn-ghost">Sign in</a><a href="/app#/register" class="btn btn-primary">Get started</a></div>';
  html += '<button class="ham" onclick="openMob()"><span></span><span></span><span></span></button>';
  html += '</nav>';

  // ── Mobile menu ──
  html += '<div class="moverlay" id="mobMenu">';
  html += '<a href="#how" onclick="closeMob()">How it works</a><a href="#features" onclick="closeMob()">Features</a><a href="#pricing" onclick="closeMob()">Pricing</a><a href="/app#/login" onclick="closeMob()">Sign in</a><a href="/app#/register" onclick="closeMob()">Get started</a>';
  html += '<button class="mcls" onclick="closeMob()">&times;</button>';
  html += '</div>';

  // ── Hero ──
  html += '<section class="hero">';
  html += '<div class="hcont">';
  html += '<div class="hbadge rv">✨ The engine behind viral launches</div>';
  html += '<h1 class="hh1 rv">Turn early interest into exponential growth.</h1>';
  html += '<p class="hsub rv">Don\'t just collect emails. We build a verifiable hype machine that incentivizes your earliest supporters to do the marketing for you.</p>';
  html += '<div class="cta-box rv">';
  html += '<input type="email" placeholder="Enter your work email" />';
  html += '<a href="/app#/register" class="btn btn-primary">Start Free</a>';
  html += '</div>';
  html += '<div class="hero-meta rv"><span>No credit card</span> &bull; <span>Free forever</span> &bull; <span>Live in 60s</span></div>';
  html += '</div>';
  html += '</section>';

  // ── Social Proof ──
  html += '<section class="social-proof">';
  html += '<div class="proof-label rv">Trusted by founders at</div>';
  html += '<div class="proof-logos rv">';
  html += '<div class="proof-logo">Linear</div>';
  html += '<div class="proof-logo">Vercel</div>';
  html += '<div class="proof-logo">Stripe</div>';
  html += '<div class="proof-logo">Create</div>';
  html += '<div class="proof-logo">Wonder Monday</div>';
  html += '</div>';
  html += '</section>';

  // ── Narrative Grid (Replacing old features) ──
  html += '<section class="narrative" id="how">';
  html += '<div class="n-header rv">';
  html += '<h2>The Solution</h2>';
  html += '<h3>A predictable launch framework.</h3>';
  html += '<p>Go from zero momentum to thousands of eager users fighting to get in.</p>';
  html += '</div>';
  html += '<div class="grid-3">';
  html += '<div class="card rv"><div class="card-num">1</div><h4>The Problem</h4><p>You launch your product to a cold list. Conversion rates are low, and momentum stalls on day one.</p></div>';
  html += '<div class="card rv"><div class="card-num">2</div><h4>What We Do</h4><p>We implement a gated, milestone-based referral system. Users get early access only if they bring their network.</p></div>';
  html += '<div class="card rv"><div class="card-num">3</div><h4>The Outcome</h4><p>Exponential, verifiable growth. You launch to an audience that is already heavily invested in your product.</p></div>';
  html += '</div>';
  html += '</section>';

  // ── Clean Process (Replacing How It Works) ──
  html += '<section class="process" id="features">';
  html += '<div class="n-header rv" style="margin-bottom: 80px;">';
  html += '<h2>Features</h2>';
  html += '<h3>Everything you need to build hype.</h3>';
  html += '</div>';
  html += '<div class="p-container">';
  
  html += '<div class="p-row rv">';
  html += '<div class="p-icon">1</div>';
  html += '<div class="p-content"><h4>Beautiful Mobile-Optimized Pages</h4><p>Stunning, high-converting landing pages that look incredible on any device. Designed for speed, trust, and zero friction, turning casual visitors into dedicated subscribers in seconds.</p></div>';
  html += '</div>';
  
  html += '<div class="p-row rv">';
  html += '<div class="p-icon">2</div>';
  html += '<div class="p-content"><h4>Viral Referral Engine</h4><p>Built-in referral tracking that rewards users for sharing. Configure custom goals and unlock mechanics to drive exponential organic growth without spending on ads.</p></div>';
  html += '</div>';
  
  html += '<div class="p-row rv">';
  html += '<div class="p-icon">3</div>';
  html += '<div class="p-content"><h4>Real-time Analytics & Export</h4><p>Track signups, page views, and your most valuable referrers in real time. Export your entire clean, spam-protected list as a CSV with a single click at any time.</p></div>';
  html += '</div>';
  
  html += '</div>';
  html += '</section>';

  // ── Pricing ──
  html += '<section class="pricing" id="pricing">';
  html += '<div class="n-header rv">';
  html += '<h2>Pricing</h2>';
  html += '<h3>Simple, transparent plans.</h3>';
  html += '<p>Start for free. Scale when you need to.</p>';
  html += '</div>';
  html += '<div class="price-grid">';
  
  html += '<div class="price-card rv">';
  html += '<h3>Free</h3>';
  html += '<p class="price-desc">Perfect for testing the waters</p>';
  html += '<div class="price-amount">$0<span>/forever</span></div>';
  html += '<ul class="price-features">';
  html += '<li><span class="feat-check">✓</span> 1 active waitlist</li>';
  html += '<li><span class="feat-check">✓</span> Up to 100 signups</li>';
  html += '<li><span class="feat-check">✓</span> Basic analytics</li>';
  html += '<li><span class="feat-check">✓</span> WaitlistWizard branding</li>';
  html += '</ul>';
  html += '<a href="/app#/register" class="price-btn">Get started free</a>';
  html += '</div>';
  
  html += '<div class="price-card featured rv">';
  html += '<div class="featured-badge">Most Popular</div>';
  html += '<h3>Pro</h3>';
  html += '<p class="price-desc">For serious product launches</p>';
  html += '<div class="price-amount">$19<span>/mo</span></div>';
  html += '<ul class="price-features">';
  html += '<li><span class="feat-check">✓</span> 5 active waitlists</li>';
  html += '<li><span class="feat-check">✓</span> Unlimited signups</li>';
  html += '<li><span class="feat-check">✓</span> Advanced analytics & CSV</li>';
  html += '<li><span class="feat-check">✓</span> Remove branding</li>';
  html += '</ul>';
  html += '<a href="/app#/register" class="price-btn">Start 14-day trial</a>';
  html += '</div>';
  
  html += '<div class="price-card rv">';
  html += '<h3>Business</h3>';
  html += '<p class="price-desc">For teams and agencies</p>';
  html += '<div class="price-amount">$49<span>/mo</span></div>';
  html += '<ul class="price-features">';
  html += '<li><span class="feat-check">✓</span> Unlimited waitlists</li>';
  html += '<li><span class="feat-check">✓</span> Unlimited signups</li>';
  html += '<li><span class="feat-check">✓</span> Priority API access</li>';
  html += '<li><span class="feat-check">✓</span> White-label options</li>';
  html += '</ul>';
  html += '<a href="/app#/register" class="price-btn">Start 14-day trial</a>';
  html += '</div>';
  
  html += '</div>';
  html += '</section>';

  // ── Footer ──
  html += '<footer>';
  html += '<div class="fcont">';
  html += '<div class="logo"><span class="logo-icon">⚡</span><span>WaitlistWizard</span></div>';
  html += '<div class="flinks"><a href="/legal/privacy">Privacy</a><a href="/legal/terms">Terms</a><a href="/legal/contact">Support</a></div>';
  html += '<div style="font-family: var(--font-mono); font-size: 13px;">&copy; 2026 WaitlistWizard</div>';
  html += '</div>';
  html += '</footer>';

  // ── Scripts ──
  html += '<script>';
  html += 'function openMob(){document.getElementById("mobMenu").style.display="flex";}function closeMob(){document.getElementById("mobMenu").style.display="none";}';
  html += `
window.addEventListener('scroll', () => { document.querySelector('nav').classList.toggle('sc', window.scrollY > 10); });
const obs = new IntersectionObserver(entries => { entries.forEach((e,i) => { if(e.isIntersecting){ setTimeout(() => e.target.classList.add('vs'), (i%5)*80); obs.unobserve(e.target); } }) }, {threshold: 0.1, rootMargin: '0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el => obs.observe(el));
  `;
  html += '</script>';
  html += '</body></html>';
  return html;
}
