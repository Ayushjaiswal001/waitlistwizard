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

function buildBg(page) {
  const [c1, c2] = (page.bg_value || '#0f172a,#1e1b4b').split(',');
  if (page.bg_style === 'solid') return `background:${c1}`;
  if (page.bg_style === 'mesh')
    return `background:${c1};background-image:radial-gradient(at 40% 20%,${c2||c1}55 0px,transparent 50%),radial-gradient(at 80% 80%,${c1}88 0px,transparent 50%)`;
  return `background:linear-gradient(135deg,${c1} 0%,${c2||c1} 100%)`;
}

export function renderWaitlistPage(page) {
  const hFont = HEADING_FONTS[page.font_pair] || 'Sora';
  const bFont = BODY_FONTS[page.font_pair] || 'Inter';
  const fontUrl = FONT_URLS[page.font_pair] || FONT_URLS['cabinet-inter'];
  const bg = buildBg(page);
  const accent = page.accent_color || '#a78bfa';
  const APP_URL = process.env.APP_URL || '';

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
  *{box-sizing:border-box;margin:0;padding:0}
  body{min-height:100vh;display:flex;align-items:center;justify-content:center;${bg};font-family:'${bFont}',sans-serif;padding:20px;position:relative;overflow-x:hidden}
  body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:.025;pointer-events:none}
  .card{max-width:480px;width:100%;padding:48px 40px;background:rgba(255,255,255,.06);backdrop-filter:blur(24px) saturate(1.4);-webkit-backdrop-filter:blur(24px) saturate(1.4);border:1px solid rgba(255,255,255,.1);border-radius:24px;box-shadow:0 24px 48px rgba(0,0,0,.4);animation:fadeUp .5s ease;position:relative;z-index:1}
  @keyframes fadeUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
  .logo{max-height:48px;margin-bottom:20px}
  .pill{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.7);font-size:12px;margin-bottom:16px}
  .pill::before{content:'';width:6px;height:6px;border-radius:50%;background:${accent};display:block;animation:pulse 1.5s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  h1{font-family:'${hFont}',sans-serif;font-size:34px;font-weight:700;color:#fff;line-height:1.2;margin-bottom:12px}
  .sub{font-size:17px;color:rgba(255,255,255,.6);margin-bottom:28px;line-height:1.6}
  .form-row{display:flex;gap:8px;margin-bottom:8px}
  .email-input{flex:1;padding:13px 16px;border-radius:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#fff;font-size:15px;outline:none;font-family:'${bFont}',sans-serif;transition:border-color .2s}
  .email-input::placeholder{color:rgba(255,255,255,.35)}
  .email-input:focus{border-color:${accent}}
  .cta-btn{padding:13px 20px;border-radius:12px;background:${accent};border:none;color:#fff;font-size:15px;font-weight:600;cursor:pointer;font-family:'${hFont}',sans-serif;white-space:nowrap;transition:opacity .2s,transform .1s}
  .cta-btn:hover{opacity:.9}
  .cta-btn:active{transform:scale(.98)}
  .cta-btn:disabled{opacity:.6;cursor:not-allowed}
  .err{color:#f87171;font-size:13px;margin-top:6px;display:none}
  .success{display:none;text-align:center;animation:fadeUp .4s ease}
  .check-svg{margin:0 auto 16px;display:block}
  .check-circle{fill:none;stroke:${accent};stroke-width:2;stroke-dasharray:166;stroke-dashoffset:166;animation:draw .6s .2s forwards}
  .check-mark{fill:none;stroke:${accent};stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:48;stroke-dashoffset:48;animation:draw .4s .7s forwards}
  @keyframes draw{to{stroke-dashoffset:0}}
  .pos-num{font-family:'${hFont}',sans-serif;font-size:56px;font-weight:800;color:${accent};line-height:1;margin:12px 0 4px}
  .pos-label{font-size:13px;color:rgba(255,255,255,.5);margin-bottom:20px}
  .success-msg{font-size:16px;color:rgba(255,255,255,.8);margin-bottom:24px;line-height:1.5}
  .ref-label{font-size:12px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}
  .ref-row{display:flex;gap:8px;margin-bottom:16px}
  .ref-input{flex:1;padding:10px 14px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.7);font-size:13px;font-family:monospace;outline:none}
  .copy-btn{padding:10px 16px;border-radius:10px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);color:#fff;font-size:13px;cursor:pointer;font-family:'${bFont}',sans-serif;transition:background .2s}
  .copy-btn:hover{background:rgba(255,255,255,.14)}
  .share-btns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:4px}
  .share-btn{padding:8px 16px;border-radius:20px;border:1px solid rgba(255,255,255,.15);background:transparent;color:rgba(255,255,255,.7);font-size:13px;cursor:pointer;font-family:'${bFont}',sans-serif;transition:all .2s;text-decoration:none;display:inline-block}
  .share-btn:hover{transform:translateY(-1px)}
  .share-btn.tw:hover{background:#1da1f2;border-color:#1da1f2;color:#fff}
  .share-btn.wa:hover{background:#25d366;border-color:#25d366;color:#fff}
  .share-btn.li:hover{background:#0077b5;border-color:#0077b5;color:#fff}
  .ref-count{font-size:13px;color:rgba(255,255,255,.4);margin-top:12px}
  .branding{text-align:center;margin-top:28px;font-size:12px;color:rgba(255,255,255,.2)}
  .branding a{color:rgba(255,255,255,.3);text-decoration:none}
  .branding a:hover{color:rgba(255,255,255,.6)}
  @media(max-width:520px){.card{padding:32px 20px}.form-row{flex-direction:column}h1{font-size:26px}}
  @media(prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
</head>
<body>
<div class="card">
  ${page.logo_url ? `<img src="${esc(page.logo_url)}" class="logo" alt="Logo"/>` : ''}
  ${page.total_signups > 3 ? `<div class="pill">${page.total_signups.toLocaleString()} people on the waitlist</div>` : ''}
  <h1>${esc(page.headline)}</h1>
  <p class="sub">${esc(page.subheadline)}</p>

  <div id="formArea">
    <div class="form-row">
      <input type="email" id="emailInput" class="email-input" placeholder="your@email.com" autocomplete="email"/>
      <button class="cta-btn" id="joinBtn" onclick="joinWaitlist()">${esc(page.cta_text)}</button>
    </div>
    <div class="err" id="errMsg"></div>
  </div>

  <div class="success" id="successArea">
    <svg class="check-svg" width="64" height="64" viewBox="0 0 64 64">
      <circle class="check-circle" cx="32" cy="32" r="30"/>
      <path class="check-mark" d="M20 32l9 9 15-18"/>
    </svg>
    <p class="success-msg">${esc(page.success_message)}</p>
    <div class="pos-num" id="posNum"></div>
    <div class="pos-label">your position</div>
    <div class="ref-label">Your unique referral link</div>
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
