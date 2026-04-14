const FONT_URLS = {
  'cabinet-inter':  'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap',
  'clash-satoshi':  'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap',
  'general-sans':   'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Nunito+Sans:wght@400;600&display=swap',
  'space-dm':       'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap',
  'epilogue-karla': 'https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700&family=Karla:wght@400;500&display=swap',
};
const HEADING_FONTS = {
  'cabinet-inter': 'Sora', 'clash-satoshi': 'Outfit', 'general-sans': 'Plus Jakarta Sans',
  'space-dm': 'Space Grotesk', 'epilogue-karla': 'Epilogue',
};
const BODY_FONTS = {
  'cabinet-inter': 'Inter', 'clash-satoshi': 'DM Sans', 'general-sans': 'Nunito Sans',
  'space-dm': 'DM Sans', 'epilogue-karla': 'Karla',
};

/**
 * Derive a palette from a single accent color.
 * Returns HSL variants for bg tints, text, borders.
 */
function buildPalette(accent) {
  // Parse hex to get a hue for tinting
  const hex = (accent || '#7a54ff').replace('#', '');
  const r = parseInt(hex.slice(0,2),16)/255;
  const g = parseInt(hex.slice(2,4),16)/255;
  const b = parseInt(hex.slice(4,6),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h = 0;
  if (max !== min) {
    const d = max - min;
    if (max === r) h = ((g-b)/d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b-r)/d + 2) * 60;
    else h = ((r-g)/d + 4) * 60;
  }
  return { hue: Math.round(h) };
}

export function renderWaitlistPage(page) {
  const hFont = HEADING_FONTS[page.font_pair] || 'Sora';
  const bFont = BODY_FONTS[page.font_pair] || 'Inter';
  const fontUrl = FONT_URLS[page.font_pair] || FONT_URLS['cabinet-inter'];
  const accent = page.accent_color || '#7a54ff';
  const { hue } = buildPalette(accent);
  const APP_URL = process.env.APP_URL || '';

  // Determine if user chose a light or dark background
  const bgStyle = page.bg_style || 'light'; // Defaulting to light for the elegant feel
  const isLight = bgStyle === 'light';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>\${esc(page.headline || 'Join the Waitlist')}</title>
<meta name="description" content="\${esc(page.subheadline || '')}"/>
<meta name="theme-color" content="\${isLight ? '#FAFAF8' : '#121016'}"/>
<link rel="canonical" href="\${APP_URL}/p/\${esc(page.slug)}"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="\${esc(page.headline || 'Join the Waitlist')}"/>
<meta property="og:description" content="\${esc(page.subheadline || '')}"/>
<meta property="og:url" content="\${APP_URL}/p/\${esc(page.slug)}"/>
<meta property="og:image" content="\${APP_URL}/og-image.png"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="\${esc(page.headline || 'Join the Waitlist')}"/>
<meta name="twitter:description" content="\${esc(page.subheadline || '')}"/>
<meta name="twitter:image" content="\${APP_URL}/og-image.png"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="\${fontUrl}" rel="stylesheet"/>
<style>
/* ── Reset ──────────────────────────── */
*{box-sizing:border-box;margin:0;padding:0}

/* ── Page ───────────────────────────── */
:root {
  --accent: \${accent};
  --accent-soft: \${accent}1A;
  --accent-border: \${accent}33;
  --accent-yellow: #fddb6a;
  
  --bg: \${isLight ? '#FAFAF8' : '#121016'};
  --bg-card: \${isLight ? '#FFFFFF' : '#1e1c22'};
  --bg-input: \${isLight ? '#F3F1EF' : '#2c2a30'};
  --bg-input-hover: \${isLight ? '#e5e3e1' : '#3d3a44'};
  --border: \${isLight ? 'rgba(36,34,32,0.06)' : 'rgba(255,255,255,0.08)'};
  --border-hover: \${isLight ? 'rgba(36,34,32,0.12)' : 'rgba(255,255,255,0.16)'};
  --text: \${isLight ? '#242220' : '#FFFFFF'};
  --text-secondary: \${isLight ? '#4B4845' : '#D4D2D8'};
  --text-muted: \${isLight ? '#6B6862' : '#8A8790'};
  --shadow-sm: \${isLight ? '0 4px 20px rgba(0,0,0,0.03)' : '0 4px 20px rgba(0,0,0,0.2)'};
  --shadow-md: \${isLight ? '0 12px 40px ' + accent + '1F' : '0 12px 40px rgba(0,0,0,0.4)'}; /* 12% opacity shadow */
  
  --radius: 16px;
  --font-h: '\${hFont}', system-ui, sans-serif;
  --font-b: '\${bFont}', system-ui, sans-serif;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  font-family: var(--font-b);
  padding: 24px;
  color: var(--text);
  position: relative;
  overflow: hidden;
}

/* ── Grid Pattern & Blobs for Human Tech Feel ── */
body::before {
  content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image: 
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.4;
}

.bg-blobs { position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }
.blob { position: absolute; filter: blur(140px); border-radius: 50%; }
.blob-1 { width: 70vw; height: 70vw; background: var(--accent); top: -20%; left: -20%; opacity: \${isLight ? 0.15 : 0.08}; animation: float 12s infinite alternate;}
.blob-2 { width: 60vw; height: 60vw; background: var(--accent-yellow); bottom: -10%; right: -20%; opacity: \${isLight ? 0.2 : 0.05}; animation: float 14s infinite alternate-reverse;}

@keyframes float {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(30px) scale(1.05); }
}

/* ── Card ─── Soft, Soothing, Rounded ── */
.card {
  max-width: 520px;
  width: 100%;
  position: relative;
  z-index: 20;
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-inner {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 32px;
  padding: 56px 48px;
  box-shadow: var(--shadow-md), var(--shadow-sm);
  position: relative;
  z-index: 20;
  overflow: hidden;
  text-align: center;
}

/* Subtle corner highlight */
.card-inner::after {
  content: ''; position: absolute; top: -50px; right: -50px; width: 100px; height: 100px;
  background: var(--accent); filter: blur(40px); opacity: \${isLight ? 0.2 : 0.4}; pointer-events: none;
}

/* ── Logo ────────────────────────────── */
.logo { max-height: 48px; margin-bottom: 32px; border-radius: 12px; }

/* ── Social proof pill ───────────────── */
.proof-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 100px;
  background: var(--accent-soft);
  border: 1px solid var(--accent-border);
  color: var(--accent);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 32px;
  letter-spacing: 0.02em;
}

.proof-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  animation: blink 2s ease infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 var(--accent-soft); }
  50% { opacity: 0.6; box-shadow: 0 0 0 4px var(--accent-soft); }
}

/* ── Typography ─────────────────────── */
h1 {
  font-family: var(--font-h);
  font-size: 36px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.15;
  margin-bottom: 16px;
  letter-spacing: -0.03em;
}

.sub {
  font-size: 17px;
  color: var(--text-secondary);
  margin-bottom: 40px;
  line-height: 1.6;
}

/* ── Form ────────────────────────────── */
.form-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-direction: column;
}

@media (min-width: 480px) {
  .form-row { flex-direction: row; }
}

.email-input {
  flex: 1;
  padding: 16px 20px;
  border-radius: 999px; /* Pill shape */
  background: var(--bg-input);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 16px;
  font-family: var(--font-b);
  outline: none;
  transition: border-color .2s, box-shadow .2s;
  text-align: left;
}

.email-input::placeholder { color: var(--text-muted); font-weight: 400;}

.email-input:focus {
  border-color: var(--accent);
  background: var(--bg-card);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

/* ── CTA Button ── */
.cta-btn {
  padding: 16px 32px;
  border-radius: 999px;
  background: var(--accent);
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-b); /* Match body for human feel or h for bold */
  white-space: nowrap;
  transition: transform .2s, box-shadow .2s, background .2s;
  box-shadow: 0 4px 14px var(--accent-border);
}

.cta-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px var(--accent-border); filter: brightness(1.05); }
.cta-btn:active { transform: scale(.98); }
.cta-btn:disabled { opacity: .6; cursor: not-allowed; }

/* ── Trust line ─────────────────────── */
.trust-line {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 500;
}

.trust-line svg { flex-shrink: 0; fill: var(--text-muted); opacity: 0.6; }

/* ── Error ───────────────────────────── */
.err {
  color: #ef4444;
  font-size: 14px;
  margin-top: 12px;
  display: none;
  font-weight: 500;
}

/* ── Success State ───────────────────── */
.success {
  display: none;
  text-align: center;
  animation: fadeIn .4s ease;
}

.check-svg {
  margin: 0 auto 24px;
  display: block;
  background: var(--accent-soft);
  border-radius: 50%;
  padding: 12px;
}

.check-circle {
  fill: none;
  stroke: var(--accent);
  stroke-width: 2.5;
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: draw .6s .2s forwards;
}

.check-mark {
  fill: none;
  stroke: var(--accent);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: draw .4s .7s forwards;
}

@keyframes draw { to { stroke-dashoffset: 0; } }

.pos-num {
  font-family: var(--font-h);
  font-size: 56px;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
  margin: 12px 0 8px;
  letter-spacing: -1.5px;
}

.pos-label {
  font-size: 14px;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 32px;
  font-weight: 600;
}

.success-msg {
  font-size: 17px;
  color: var(--text-secondary);
  margin-bottom: 32px;
  line-height: 1.6;
}

.ref-label {
  font-size: 13px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  margin-bottom: 12px;
}

.ref-row {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.ref-input {
  flex: 1;
  padding: 14px 16px;
  border-radius: var(--radius);
  background: var(--bg-input);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 14px;
  font-family: monospace;
  outline: none;
  text-align: center;
}

.copy-btn {
  padding: 14px 20px;
  border-radius: var(--radius);
  background: var(--bg-input);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-b);
  transition: all .2s;
}

.copy-btn:hover {
  background: var(--border);
  border-color: var(--border-hover);
}

.share-btns {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 8px;
}

.share-btn {
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  font-family: var(--font-b);
  font-weight: 500;
  transition: all .2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.share-btn:hover { border-color: var(--border-hover); color: var(--text); background: var(--bg-input); transform: translateY(-1px); }
.share-btn.tw:hover { background: #1da1f2; border-color: #1da1f2; color: #fff; }
.share-btn.wa:hover { background: #25d366; border-color: #25d366; color: #fff; }
.share-btn.li:hover { background: #0077b5; border-color: #0077b5; color: #fff; }

.ref-count {
  font-size: 15px;
  color: var(--text-muted);
  margin-top: 24px;
  font-weight: 500;
}

/* ── Branding ────────────────────────── */
.branding {
  text-align: center;
  margin-top: 32px;
  font-size: 13px;
  color: var(--text-muted);
  opacity: .6;
  transition: opacity .2s;
  font-weight: 500;
}

.branding:hover { opacity: 1; }

.branding a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}
.branding a:hover { text-decoration: underline; }

/* ── Responsive ──────────────────────── */
@media (max-width: 520px) {
  .card-inner { padding: 40px 24px; }
  h1 { font-size: 30px; }
  .pos-num { font-size: 48px; }
  .share-btn { padding: 10px 14px; }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
</style>
</head>
<body>

<div class="bg-blobs">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
</div>

<div class="card">
  <div class="card-inner">
    \${page.logo_url ? \`<img src="\${esc(page.logo_url)}" class="logo" alt="Logo"/>\` : ''}
    \${page.total_signups > 3 ? \`<div class="proof-pill"><span class="proof-dot"></span>\${page.total_signups.toLocaleString()} people ahead of you</div>\` : ''}
    <h1>\${esc(page.headline)}</h1>
    <p class="sub">\${esc(page.subheadline)}</p>

    <div id="formArea">
      <div class="form-row">
        <input type="email" id="emailInput" class="email-input" placeholder="Enter your email" autocomplete="email"/>
        <button class="cta-btn" id="joinBtn" onclick="joinWaitlist()">\${esc(page.cta_text)}</button>
      </div>
      <div class="trust-line">
        <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 6V12L16 16" stroke="var(--text-muted)" stroke-width="2" fill="none"/></svg>
        No spam. Unsubscribe anytime.
      </div>
      <div class="err" id="errMsg"></div>
    </div>

    <div class="success" id="successArea">
      <svg class="check-svg" width="64" height="64" viewBox="0 0 64 64">
        <circle class="check-circle" cx="32" cy="32" r="28"/>
        <path class="check-mark" d="M22 32l8 8 14-16"/>
      </svg>
      <p class="success-msg">\${esc(page.success_message)}</p>
      <div class="pos-num" id="posNum"></div>
      <div class="pos-label">your position</div>
      <div class="ref-label">Share to jump ahead</div>
      <div class="ref-row">
        <input type="text" class="ref-input" id="refLink" readonly/>
        <button class="copy-btn" onclick="copyLink()">Copy</button>
      </div>
      <div class="share-btns">
        <a class="share-btn tw" id="shareTwitter" href="#" target="_blank">𝕏 Twitter</a>
        <a class="share-btn wa" id="shareWhatsApp" href="#" target="_blank">WhatsApp</a>
        <a class="share-btn li" id="shareLinkedIn" href="#" target="_blank">LinkedIn</a>
      </div>
      <div class="ref-count" id="refCount">0 referrals so far</div>
    </div>

    \${!page.remove_branding ? \`
      <div class="branding">Powered by <a href="\${APP_URL}" target="_blank">WaitlistWizard</a></div>
    \` : ''}
  </div>
</div>

<script>
  const SLUG = \${JSON.stringify(page.slug)};
  const ORIGIN = \${JSON.stringify(APP_URL)};
  const REF = new URLSearchParams(location.search).get('ref');

  async function joinWaitlist() {
    const email = document.getElementById('emailInput').value.trim();
    const err = document.getElementById('errMsg');
    const btn = document.getElementById('joinBtn');
    err.style.display = 'none';
    if (!email || !email.includes('@')) {
      err.textContent = 'Please enter a valid email address.';
      err.style.display = 'block';
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Joining…';
    try {
      const url = '/w/' + SLUG + '/join' + (REF ? '?ref=' + encodeURIComponent(REF) : '');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      showSuccess(data);
    } catch(e) {
      err.textContent = e.message;
      err.style.display = 'block';
      btn.disabled = false;
      btn.textContent = \${JSON.stringify(page.cta_text)};
    }
  }

  function showSuccess(data) {
    document.getElementById('formArea').style.display = 'none';
    const s = document.getElementById('successArea');
    s.style.display = 'block';
    document.getElementById('posNum').textContent = '#' + data.position;
    const link = data.referral_link;
    document.getElementById('refLink').value = link;
    const text = encodeURIComponent('I just joined the waitlist! Join me: ' + link);
    document.getElementById('shareTwitter').href = 'https://twitter.com/intent/tweet?text=' + text;
    document.getElementById('shareWhatsApp').href = 'https://wa.me/?text=' + text;
    document.getElementById('shareLinkedIn').href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(link);
    if (data.referral_count > 0) {
      document.getElementById('refCount').textContent = data.referral_count + ' referral' + (data.referral_count !== 1 ? 's' : '') + ' so far';
    }
  }

  function copyLink() {
    const input = document.getElementById('refLink');
    navigator.clipboard.writeText(input.value).then(() => {
      const btn = document.querySelector('.copy-btn');
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      btn.style.color = 'var(--accent)';
      setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 2000);
    }).catch(() => { input.select(); document.execCommand('copy'); });
  }

  // Enter key to submit
  document.getElementById('emailInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') joinWaitlist();
  });
</script>
</body>
</html>\`;
}

function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
