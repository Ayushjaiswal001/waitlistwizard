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
  const hex = (accent || '#4f7cff').replace('#', '');
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
  const accent = page.accent_color || '#4f7cff';
  const { hue } = buildPalette(accent);
  const APP_URL = process.env.APP_URL || '';

  // Determine if user chose a light or dark background
  const bgStyle = page.bg_style || 'dark';
  const isLight = bgStyle === 'light';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(page.headline || 'Join the Waitlist')}</title>
<meta name="description" content="${esc(page.subheadline || '')}"/>
<meta name="theme-color" content="${esc(accent)}"/>
<link rel="canonical" href="${APP_URL}/p/${esc(page.slug)}"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="${esc(page.headline || 'Join the Waitlist')}"/>
<meta property="og:description" content="${esc(page.subheadline || '')}"/>
<meta property="og:url" content="${APP_URL}/p/${esc(page.slug)}"/>
<meta property="og:image" content="${APP_URL}/og-image.png"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${esc(page.headline || 'Join the Waitlist')}"/>
<meta name="twitter:description" content="${esc(page.subheadline || '')}"/>
<meta name="twitter:image" content="${APP_URL}/og-image.png"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="${fontUrl}" rel="stylesheet"/>
<style>
/* ── Reset ──────────────────────────── */
*{box-sizing:border-box;margin:0;padding:0}

/* ── Page ───────────────────────────── */
:root {
  --accent: ${accent};
  --accent-soft: ${accent}12;
  --accent-border: ${accent}30;
  --bg: #09090b;
  --bg-card: #111113;
  --bg-input: #18181b;
  --border: #27272a;
  --border-hover: #3f3f46;
  --text: #fafafa;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  --radius: 12px;
  --font-h: '${hFont}', system-ui, sans-serif;
  --font-b: '${bFont}', system-ui, sans-serif;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  font-family: var(--font-b);
  padding: 24px;
  color: var(--text);
  position: relative;
}

/* Very subtle top accent glow — not a gradient bg */
body::before {
  content: '';
  position: fixed;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 500px;
  background: radial-gradient(ellipse, ${accent}08, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ── Card ─── Clean, structured, elevated ── */
.card {
  max-width: 460px;
  width: 100%;
  position: relative;
  z-index: 1;
  animation: fadeIn .4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-inner {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 44px 40px;
  box-shadow:
    0 1px 2px rgba(0,0,0,.3),
    0 4px 16px rgba(0,0,0,.2);
}

/* ── Logo ────────────────────────────── */
.logo { max-height: 40px; margin-bottom: 24px; }

/* ── Social proof pill ───────────────── */
.proof-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 100px;
  background: var(--accent-soft);
  border: 1px solid var(--accent-border);
  color: var(--accent);
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 24px;
}

.proof-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: blink 2s ease infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: .3; }
}

/* ── Typography ─────────────────────── */
h1 {
  font-family: var(--font-h);
  font-size: 30px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.25;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.sub {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 32px;
  line-height: 1.6;
}

/* ── Form ────────────────────────────── */
.form-row {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.email-input {
  flex: 1;
  padding: 12px 16px;
  border-radius: var(--radius);
  background: var(--bg-input);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 15px;
  font-family: var(--font-b);
  outline: none;
  transition: border-color .2s, box-shadow .2s;
}

.email-input::placeholder { color: var(--text-muted); }

.email-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px ${accent}15;
}

/* ── CTA Button — SOLID, not gradient ── */
.cta-btn {
  padding: 12px 24px;
  border-radius: var(--radius);
  background: var(--accent);
  border: none;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-h);
  white-space: nowrap;
  transition: opacity .15s, transform .1s;
  /* Slight text shadow for readability */
  text-shadow: 0 1px 2px rgba(0,0,0,.2);
}

.cta-btn:hover { opacity: .88; }
.cta-btn:active { transform: scale(.97); }
.cta-btn:disabled { opacity: .5; cursor: not-allowed; }

/* ── Trust line ─────────────────────── */
.trust-line {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.trust-line svg { flex-shrink: 0; }

/* ── Error ───────────────────────────── */
.err {
  color: #ef4444;
  font-size: 13px;
  margin-top: 8px;
  display: none;
}

/* ── Success State ───────────────────── */
.success {
  display: none;
  text-align: center;
  animation: fadeIn .4s ease;
}

.check-svg {
  margin: 0 auto 20px;
  display: block;
}

.check-circle {
  fill: none;
  stroke: var(--accent);
  stroke-width: 2;
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: draw .6s .2s forwards;
}

.check-mark {
  fill: none;
  stroke: var(--accent);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: draw .4s .7s forwards;
}

@keyframes draw { to { stroke-dashoffset: 0; } }

.pos-num {
  font-family: var(--font-h);
  font-size: 48px;
  font-weight: 800;
  color: var(--text);
  line-height: 1;
  margin: 8px 0 4px;
  letter-spacing: -1px;
}

.pos-label {
  font-size: 13px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 24px;
}

.success-msg {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 28px;
  line-height: 1.6;
}

.ref-label {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: .8px;
  font-weight: 600;
  margin-bottom: 8px;
}

.ref-row {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.ref-input {
  flex: 1;
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 13px;
  font-family: monospace;
  outline: none;
}

.copy-btn {
  padding: 10px 18px;
  border-radius: 10px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font-b);
  transition: border-color .2s, background .2s;
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
  margin-top: 4px;
}

.share-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  font-family: var(--font-b);
  transition: all .2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.share-btn:hover { border-color: var(--border-hover); color: var(--text); }
.share-btn.tw:hover { background: #1da1f2; border-color: #1da1f2; color: #fff; }
.share-btn.wa:hover { background: #25d366; border-color: #25d366; color: #fff; }
.share-btn.li:hover { background: #0077b5; border-color: #0077b5; color: #fff; }

.ref-count {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 16px;
}

/* ── Branding ────────────────────────── */
.branding {
  text-align: center;
  margin-top: 24px;
  font-size: 12px;
  color: var(--text-muted);
  opacity: .5;
  transition: opacity .2s;
}

.branding:hover { opacity: .8; }

.branding a {
  color: var(--text-muted);
  text-decoration: none;
}
.branding a:hover { color: var(--text-secondary); }

/* ── Responsive ──────────────────────── */
@media (max-width: 520px) {
  .card-inner { padding: 32px 24px; }
  .form-row { flex-direction: column; }
  h1 { font-size: 24px; }
  .sub { font-size: 15px; }
  .pos-num { font-size: 40px; }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
</style>
</head>
<body>
<div class="card">
  <div class="card-inner">
    ${page.logo_url ? `<img src="${esc(page.logo_url)}" class="logo" alt="Logo"/>` : ''}
    ${page.total_signups > 3 ? `<div class="proof-pill"><span class="proof-dot"></span>${page.total_signups.toLocaleString()} people on the waitlist</div>` : ''}
    <h1>${esc(page.headline)}</h1>
    <p class="sub">${esc(page.subheadline)}</p>

    <div id="formArea">
      <div class="form-row">
        <input type="email" id="emailInput" class="email-input" placeholder="Enter your email" autocomplete="email"/>
        <button class="cta-btn" id="joinBtn" onclick="joinWaitlist()">${esc(page.cta_text)}</button>
      </div>
      <div class="trust-line">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        No spam. Unsubscribe anytime.
      </div>
      <div class="err" id="errMsg"></div>
    </div>

    <div class="success" id="successArea">
      <svg class="check-svg" width="56" height="56" viewBox="0 0 64 64">
        <circle class="check-circle" cx="32" cy="32" r="30"/>
        <path class="check-mark" d="M20 32l9 9 15-18"/>
      </svg>
      <p class="success-msg">${esc(page.success_message)}</p>
      <div class="pos-num" id="posNum"></div>
      <div class="pos-label">your position</div>
      <div class="ref-label">Share to move up</div>
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

    ${!page.remove_branding ? `
      <div class="branding">Powered by <a href="${APP_URL}" target="_blank">WaitlistWizard</a></div>
    ` : ''}
  </div>
</div>

<script>
  const SLUG = ${JSON.stringify(page.slug)};
  const ORIGIN = ${JSON.stringify(APP_URL)};
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
      btn.textContent = ${JSON.stringify(page.cta_text)};
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
      btn.style.color = '#34d399';
      setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 2000);
    }).catch(() => { input.select(); document.execCommand('copy'); });
  }

  // Enter key to submit
  document.getElementById('emailInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') joinWaitlist();
  });
</script>
</body>
</html>`;
}

function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
