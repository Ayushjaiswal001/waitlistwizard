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
  html += '<meta name="theme-color" content="#03040e" />';
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
  html += '<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />';
  html += '<link rel="icon" href="data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'.9em\' font-size=\'90\'>⚡</text></svg>" />';

  // JSON-LD Structured Data
  html += '<script type="application/ld+json">';
  html += JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WaitlistWizard",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "url": APP_URL || "https://waitlistwizard-ki1m.onrender.com",
    "description": "Create stunning waitlist pages with powerful referral mechanics. Build buzz before you launch.",
    "offers": [
      { "@type": "Offer", "price": "0", "priceCurrency": "USD", "name": "Free" },
      { "@type": "Offer", "price": "19", "priceCurrency": "USD", "name": "Pro" },
      { "@type": "Offer", "price": "49", "priceCurrency": "USD", "name": "Business" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "500"
    },
    "featureList": [
      "Viral referral engine",
      "Real-time analytics",
      "Custom branding",
      "Email notifications",
      "CSV export",
      "Mobile-optimized pages"
    ]
  });
  html += '</script>';

  // FAQ Structured Data
  html += '<script type="application/ld+json">';
  html += JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the referral system work?",
        "acceptedAnswer": { "@type": "Answer", "text": "Every person who joins gets a unique referral link. When they share it and others sign up through their link, they move up the waitlist. You can configure rewards for top referrers." }
      },
      {
        "@type": "Question",
        "name": "Can I use my own domain?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes! Pro and Business plans include custom domain support. You can use your own domain or subdomain for your waitlist pages." }
      },
      {
        "@type": "Question",
        "name": "What happens to my data if I cancel?",
        "acceptedAnswer": { "@type": "Answer", "text": "You can export your full subscriber list as CSV at any time. Your data remains accessible for 30 days after cancellation." }
      },
      {
        "@type": "Question",
        "name": "Do you offer refunds?",
        "acceptedAnswer": { "@type": "Answer", "text": "We offer a 14-day money-back guarantee on all paid plans. No questions asked." }
      },
      {
        "@type": "Question",
        "name": "How do I integrate with my email service?",
        "acceptedAnswer": { "@type": "Answer", "text": "You can export your subscriber list as CSV and import it into any email marketing platform. API access is available on the Business plan for automated integrations." }
      }
    ]
  });
  html += '</script>';

  html += '<style>';
  html += `
:root{--void:#03040e;--deep:#06091a;--navy:#0a0f24;--card:#0d1228;--line:rgba(255,255,255,.07);--line2:rgba(255,255,255,.13);--txt:#dfe3f7;--sub:#6e78a8;--dim:#2d3354;--b:#4f7cff;--v:#7c5cfc;--c:#00d4ff;--r:#ff4d8d;--g:#ffc842;--fd:"Syne",sans-serif;--fb:"Outfit",sans-serif;--fm:"JetBrains Mono",monospace}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:var(--fb);background:var(--void);color:var(--txt);overflow-x:hidden;cursor:none}
@media(hover:none){body{cursor:auto}}
a{color:inherit;text-decoration:none}
button{cursor:pointer;border:none;font-family:inherit}

/* ── Custom cursor ───────────────────────── */
#CUR,#CURR{position:fixed;border-radius:50%;pointer-events:none;z-index:99999;transition:width .2s,height .2s,background .2s;display:none}
@media(hover:hover){#CUR{display:block}#CURR{display:block}}
#CUR{width:8px;height:8px;background:var(--c);box-shadow:0 0 12px var(--c)}
#CURR{width:32px;height:32px;border:1px solid var(--v);background:transparent;margin-left:-16px;margin-top:-16px}
body:has(a:hover) #CUR,body:has(button:hover) #CUR,body:has(.nbtn-link:hover) #CUR{width:18px;height:18px;background:var(--v)}
body:has(a:hover) #CURR,body:has(button:hover) #CURR,body:has(.nbtn-link:hover) #CURR{width:56px;height:56px;margin-left:-28px;margin-top:-28px}

/* ── Nav ─────────────────────────────────── */
nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:20px 5%;display:flex;align-items:center;justify-content:space-between;transition:background .3s,backdrop-filter .3s}
nav.sc{background:rgba(3,4,14,.8);backdrop-filter:blur(28px)}
.logo{display:flex;align-items:center;gap:10px;font-family:var(--fd);font-weight:700;font-size:18px}
.logo-icon{font-size:24px;background:linear-gradient(135deg,var(--b),var(--v));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.nlinks{display:flex;gap:32px;font-weight:500;font-size:15px}
.nlinks a{transition:color .2s;position:relative;z-index:2}
.nlinks a:hover{color:var(--b)}
.nctas{display:flex;gap:12px}

/* ── CLICKABLE FIX: Use styled <a> tags instead of <a><button> nesting ── */
.nbtn-link{display:inline-flex;align-items:center;justify-content:center;padding:10px 20px;border-radius:999px;font-weight:600;font-size:14px;transition:all .2s;position:relative;z-index:2;cursor:pointer}
.nbtn-link.ghost{background:transparent;border:1px solid var(--line2);color:var(--txt)}
.nbtn-link.ghost:hover{border-color:var(--b);background:rgba(79,124,255,.1)}
.nbtn-link.primary{background:linear-gradient(135deg,var(--b),var(--v));color:#fff;box-shadow:0 4px 16px rgba(79,124,255,.3);border:none}
.nbtn-link.primary:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(79,124,255,.5)}

.ham{display:none;flex-direction:column;gap:5px;background:transparent;padding:8px;position:relative;z-index:2}
.ham span{width:24px;height:2px;background:var(--txt);border-radius:2px;transition:all .3s}

/* ── Mobile overlay ──────────────────────── */
.moverlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:var(--void);z-index:9998;flex-direction:column;align-items:center;justify-content:center;gap:32px}
.moverlay a{font-size:24px;font-weight:600;position:relative;z-index:9999}
.mcls{position:absolute;top:20px;right:5%;background:transparent;font-size:32px;color:var(--txt);z-index:9999}

/* ── Hero ────────────────────────────────── */
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px 5% 80px;text-align:center;overflow:hidden}
.hero::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at 30% 20%,rgba(79,124,255,.18),transparent 50%),radial-gradient(ellipse at 70% 60%,rgba(124,92,252,.14),transparent 50%),radial-gradient(ellipse at 50% 80%,rgba(0,212,255,.07),transparent 50%);z-index:0;pointer-events:none}
.hero::after{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse at center,black 20%,transparent 70%);z-index:0;pointer-events:none}

/* ── CLICKABLE FIX: Canvas must not eat pointer events ── */
#hcvs{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none}

.hcont{position:relative;z-index:2;max-width:900px}
.hbadge{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;background:rgba(79,124,255,.10);border:1px solid rgba(79,124,255,.25);border-radius:999px;font-size:14px;font-weight:500;margin-bottom:32px;animation:fadeUp .8s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.hh1{font-family:var(--fd);font-weight:800;font-size:clamp(38px,7vw,88px);line-height:1.1;letter-spacing:-3px;margin-bottom:24px}
.hh1 span{display:block}
.hh1 .gr{background:linear-gradient(135deg,var(--b),var(--c),var(--v));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hsub{font-size:20px;line-height:1.6;color:var(--sub);max-width:560px;margin:0 auto 40px}
.hsub strong{color:var(--txt);font-weight:600}
.hctas{display:flex;gap:16px;justify-content:center;margin-bottom:48px;position:relative;z-index:3}

/* Hero CTA buttons — pure <a> links styled as buttons */
.hbtn-link{display:inline-flex;align-items:center;justify-content:center;padding:16px 32px;border-radius:999px;font-weight:600;font-size:16px;transition:all .2s;cursor:pointer;position:relative;z-index:3}
.hbtn-link.primary{background:linear-gradient(135deg,var(--b),var(--v));color:#fff;box-shadow:0 8px 24px rgba(79,124,255,.4)}
.hbtn-link.primary:hover{transform:translateY(-1px);box-shadow:0 12px 32px rgba(79,124,255,.6)}
.hbtn-link.secondary{background:transparent;border:1px solid var(--line2);color:var(--txt)}
.hbtn-link.secondary:hover{border-color:var(--b);background:rgba(79,124,255,.1)}

.hsocial{display:flex;align-items:center;gap:16px;justify-content:center;font-size:14px;color:var(--sub);position:relative;z-index:2}
.hstars{display:flex;gap:4px;color:var(--g)}
.havs{display:flex;align-items:center}
.hav{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--b),var(--v));display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;margin-left:-8px;border:2px solid var(--void)}
.hav:first-child{margin-left:0}

/* ── 3D Mockup — ZOOM-SAFE ──────────────── */
.mscene{position:relative;width:min(900px,90vw);margin:64px auto 0;z-index:2;overflow:hidden}
.mscene::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:120%;height:120%;background:radial-gradient(ellipse at center,rgba(79,124,255,.14),transparent 60%);border-radius:50%;z-index:-1;pointer-events:none}

/* ZOOM FIX: perspective on parent container, not on the element itself */
.mwin-wrap{perspective:80vw;perspective-origin:50% 50%}
.mwin{background:rgba(13,18,40,.85);border-radius:clamp(12px,2vw,22px);border:1px solid var(--line2);box-shadow:0 clamp(16px,4vw,40px) clamp(32px,8vw,80px) rgba(0,0,0,.75);backdrop-filter:blur(16px);transform:rotateX(5deg);transition:transform .6s ease;will-change:transform;transform-origin:50% 100%}
.mwin:hover{transform:rotateX(1deg)}

.mchrome{display:flex;align-items:center;gap:clamp(6px,1vw,12px);padding:clamp(10px,1.5vw,16px) clamp(12px,2vw,20px);border-bottom:1px solid var(--line)}
.mdots{display:flex;gap:clamp(4px,.8vw,8px)}
.mdot{width:clamp(8px,1vw,12px);height:clamp(8px,1vw,12px);border-radius:50%}
.mdot:nth-child(1){background:#ff605c}
.mdot:nth-child(2){background:#ffbd44}
.mdot:nth-child(3){background:#00ca4e}
.murl{flex:1;background:rgba(255,255,255,.05);padding:clamp(4px,.8vw,8px) clamp(8px,1.5vw,16px);border-radius:8px;font-size:clamp(10px,1.2vw,13px);font-family:var(--fm);color:var(--sub);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

.mbody{display:grid;grid-template-columns:1fr clamp(180px,25vw,280px);gap:clamp(12px,2vw,24px);padding:clamp(16px,3vw,32px)}
.mleft h3{font-family:var(--fd);font-size:clamp(18px,2.5vw,28px);font-weight:700;margin-bottom:clamp(6px,1vw,12px)}
.mleft p{color:var(--sub);margin-bottom:clamp(12px,2vw,20px);line-height:1.6;font-size:clamp(12px,1.3vw,15px)}
.mpill{display:inline-flex;align-items:center;gap:6px;background:rgba(255,200,66,.15);border:1px solid rgba(255,200,66,.3);padding:clamp(3px,.5vw,6px) clamp(8px,1.2vw,14px);border-radius:999px;font-size:clamp(10px,1.1vw,13px);font-weight:600;color:var(--g);margin-bottom:clamp(8px,1.5vw,16px)}
.mpulse{width:6px;height:6px;border-radius:50%;background:var(--g);animation:pulse 2s ease infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.2)}}
.minput{width:100%;padding:clamp(8px,1.2vw,14px) clamp(10px,1.5vw,18px);background:rgba(255,255,255,.05);border:1px solid var(--line2);border-radius:12px;color:var(--txt);font-size:clamp(12px,1.3vw,15px);margin-bottom:clamp(6px,1vw,12px)}
.mjoin{width:100%;padding:clamp(8px,1.2vw,14px);background:linear-gradient(135deg,var(--b),var(--v));border-radius:12px;color:#fff;font-weight:600;font-size:clamp(12px,1.3vw,15px);margin-bottom:clamp(8px,1.5vw,16px);pointer-events:none}
.msocial{display:flex;align-items:center;gap:10px;font-size:clamp(10px,1.1vw,13px);color:var(--sub)}
.msavs{display:flex}
.msav{width:clamp(14px,1.5vw,20px);height:clamp(14px,1.5vw,20px);border-radius:50%;background:var(--dim);margin-left:-6px;border:2px solid var(--card)}
.msav:first-child{margin-left:0}

.mright h4{font-size:clamp(10px,1.1vw,13px);font-weight:600;text-transform:uppercase;letter-spacing:1px;color:var(--dim);margin-bottom:clamp(8px,1.5vw,16px)}
.mstat{background:rgba(255,255,255,.03);padding:clamp(8px,1.5vw,16px);border-radius:12px;border:1px solid var(--line);margin-bottom:clamp(6px,1vw,12px)}
.mstat-label{font-size:clamp(9px,1vw,12px);color:var(--sub);margin-bottom:6px}
.mstat-value{font-family:var(--fd);font-size:clamp(16px,2vw,24px);font-weight:700}
.mstat:nth-child(2) .mstat-value{color:var(--b)}
.mstat:nth-child(3) .mstat-value{color:var(--v)}
.mstat:nth-child(4) .mstat-value{color:var(--c)}
.mchart{display:flex;align-items:flex-end;gap:clamp(3px,.5vw,6px);height:clamp(30px,5vw,60px);margin-top:clamp(6px,1vw,12px)}
.mbar{flex:1;background:linear-gradient(to top,var(--b),var(--v));border-radius:4px 4px 0 0;opacity:.6}
.mbar:nth-child(1){height:20%}.mbar:nth-child(2){height:35%}.mbar:nth-child(3){height:50%}.mbar:nth-child(4){height:70%}.mbar:nth-child(5){height:85%}.mbar:nth-child(6){height:95%}.mbar:nth-child(7){height:75%}.mbar:nth-child(8){height:60%}.mbar:nth-child(9){height:40%}.mbar:nth-child(10){height:55%}

/* Floating notification badges — contained within mockup */
.nf{position:absolute;background:rgba(13,18,40,.9);backdrop-filter:blur(16px);border:1px solid var(--line2);border-radius:12px;padding:clamp(8px,1.2vw,14px) clamp(10px,1.5vw,18px);font-size:clamp(10px,1.1vw,13px);box-shadow:0 8px 24px rgba(0,0,0,.4);animation:fbob 3s ease-in-out infinite;z-index:10;white-space:nowrap;pointer-events:none}
@keyframes fbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.nf1{top:10%;right:4%}
.nf2{bottom:15%;left:4%}

/* ── Stats bar ───────────────────────────── */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin:80px 0}
.stat{background:var(--void);padding:48px 32px;text-align:center;position:relative;transition:all .3s}
.stat::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--b),transparent);opacity:0;transition:opacity .3s}
.stat:hover::before{opacity:1}
.stat-num{font-family:var(--fd);font-size:48px;font-weight:700;background:linear-gradient(135deg,var(--b),var(--c),var(--v));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:8px}
.stat-label{font-size:14px;color:var(--sub);text-transform:uppercase;letter-spacing:1px}

/* ── Features ────────────────────────────── */
.features{padding:80px 5%;max-width:1200px;margin:0 auto}
.ftitle{text-align:center;margin-bottom:64px}
.ftitle h2{font-family:var(--fd);font-size:48px;font-weight:800;margin-bottom:16px}
.ftitle p{font-size:18px;color:var(--sub)}
.fgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:22px;overflow:hidden}
.fcard{background:var(--void);padding:40px 32px;position:relative;overflow:hidden;transition:all .3s}
.fcard::before{content:'';position:absolute;top:-100%;right:-100%;width:200%;height:200%;background:radial-gradient(circle at center,var(--b) 0%,transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none}
.fcard:hover::before{opacity:.05}
.ficon{width:56px;height:56px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:24px}
.fcard:nth-child(1) .ficon{background:rgba(79,124,255,.15);box-shadow:0 0 24px rgba(79,124,255,.2)}
.fcard:nth-child(2) .ficon{background:rgba(124,92,252,.15);box-shadow:0 0 24px rgba(124,92,252,.2)}
.fcard:nth-child(3) .ficon{background:rgba(0,212,255,.15);box-shadow:0 0 24px rgba(0,212,255,.2)}
.fcard:nth-child(4) .ficon{background:rgba(255,200,66,.15);box-shadow:0 0 24px rgba(255,200,66,.2)}
.fcard:nth-child(5) .ficon{background:rgba(255,77,141,.15);box-shadow:0 0 24px rgba(255,77,141,.2)}
.fcard:nth-child(6) .ficon{background:rgba(0,202,78,.15);box-shadow:0 0 24px rgba(0,202,78,.2)}
.fcard h3{font-family:var(--fd);font-size:20px;font-weight:700;margin-bottom:12px}
.fcard p{color:var(--sub);line-height:1.6;font-size:15px}

/* ── How it works ────────────────────────── */
.how{background:var(--deep);padding:80px 5%}
.hcont2{max-width:1000px;margin:0 auto}
.htitle{text-align:center;margin-bottom:64px}
.htitle h2{font-family:var(--fd);font-size:48px;font-weight:800;margin-bottom:16px}
.htitle p{font-size:18px;color:var(--sub)}
.hsteps{display:grid;grid-template-columns:repeat(3,1fr);gap:48px;position:relative}
.hsteps::before{content:'';position:absolute;top:50px;left:20%;right:20%;height:2px;background:linear-gradient(90deg,transparent,var(--line2),transparent)}
.hstep{text-align:center;position:relative}
.hnum{font-family:var(--fm);font-size:64px;font-weight:500;color:var(--b);opacity:.3;margin-bottom:16px}
.hstep h3{font-family:var(--fd);font-size:24px;font-weight:700;margin-bottom:12px}
.hstep p{color:var(--sub);line-height:1.6}
.hstep::after{content:'\\2192';position:absolute;top:48px;right:-24px;font-size:24px;color:var(--dim)}
.hstep:last-child::after{display:none}

/* ── Pricing ─────────────────────────────── */
.pricing{padding:80px 5%}
.pcont{max-width:1100px;margin:0 auto}
.ptitle{text-align:center;margin-bottom:64px}
.ptitle h2{font-family:var(--fd);font-size:48px;font-weight:800;margin-bottom:16px}
.ptitle p{font-size:18px;color:var(--sub)}
.pgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.pcard{background:var(--navy);border:1px solid var(--line);border-radius:22px;padding:40px 32px;position:relative;transition:all .3s}
.pcard:hover{transform:translateY(-4px)}
.pcard.featured{border-color:rgba(79,124,255,.4);background:linear-gradient(to bottom,rgba(79,124,255,.08),var(--navy));box-shadow:0 0 0 1px rgba(79,124,255,.14)}
.pbadge{position:absolute;top:-12px;right:24px;background:linear-gradient(135deg,var(--b),var(--v));color:#fff;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px}
.pcard h3{font-family:var(--fd);font-size:24px;font-weight:700;margin-bottom:8px}
.pcard .pdesc{color:var(--sub);font-size:14px;margin-bottom:24px}
.pprice{display:flex;align-items:baseline;gap:8px;margin-bottom:24px}
.pprice-num{font-family:var(--fd);font-size:48px;font-weight:800}
.pprice-per{color:var(--sub);font-size:16px}
.pfeatures{list-style:none;margin-bottom:32px}
.pfeatures li{padding:10px 0;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:12px;font-size:15px}
.pfeatures li:last-child{border-bottom:none}
.pcheck{color:var(--b);font-size:18px}

/* Pricing buttons — pure <a> tags styled as buttons */
.pbtn-link{display:block;width:100%;padding:14px;border-radius:12px;font-weight:600;font-size:15px;transition:all .2s;background:rgba(255,255,255,.05);border:1px solid var(--line2);color:var(--txt);text-align:center;cursor:pointer}
.pbtn-link:hover{background:rgba(255,255,255,.08);border-color:var(--b)}
.pcard.featured .pbtn-link{background:linear-gradient(135deg,var(--b),var(--v));color:#fff;border:none;box-shadow:0 4px 16px rgba(79,124,255,.3)}
.pcard.featured .pbtn-link:hover{box-shadow:0 6px 24px rgba(79,124,255,.5);transform:translateY(-1px)}

/* ── FAQ ─────────────────────────────────── */
.faq{background:var(--deep);padding:80px 5%}
.faqcont{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 2fr;gap:64px}
.faqleft h2{font-family:var(--fd);font-size:48px;font-weight:800;margin-bottom:16px}
.faqleft p{color:var(--sub);margin-bottom:24px}
.faqleft a{color:var(--b);text-decoration:underline}
.faqright{display:flex;flex-direction:column;gap:16px}
.faqitem{background:var(--navy);border:1px solid var(--line);border-radius:16px;padding:24px;cursor:pointer;transition:all .3s}
.faqitem:hover{border-color:var(--line2)}
.faqitem.op{border-color:var(--b)}
.faqq{display:flex;align-items:center;justify-content:space-between;gap:16px}
.faqq h3{font-family:var(--fd);font-size:18px;font-weight:700}
.faqicon{font-size:20px;transition:transform .3s,color .3s;color:var(--sub)}
.faqitem.op .faqicon{transform:rotate(45deg);color:var(--b)}
.faqa{max-height:0;overflow:hidden;transition:max-height .3s,margin-top .3s;color:var(--sub);line-height:1.6}
.faqitem.op .faqa{max-height:500px;margin-top:16px}

/* ── CTA ─────────────────────────────────── */
.cta{padding:80px 5%;position:relative;overflow:hidden}
.cta::before{content:'';position:absolute;top:0;left:10%;width:400px;height:400px;background:radial-gradient(circle,rgba(79,124,255,.2),transparent 70%);border-radius:50%;pointer-events:none}
.cta::after{content:'';position:absolute;bottom:0;right:10%;width:500px;height:500px;background:radial-gradient(circle,rgba(124,92,252,.15),transparent 70%);border-radius:50%;pointer-events:none}
.ctacont{max-width:700px;margin:0 auto;text-align:center;position:relative;z-index:1}
.ctacont h2{font-family:var(--fd);font-size:48px;font-weight:800;margin-bottom:16px}
.ctacont p{font-size:18px;color:var(--sub);margin-bottom:32px}
.ctaform{display:flex;gap:12px;background:rgba(255,255,255,.05);border:1px solid var(--line2);border-radius:999px;padding:6px;max-width:500px;margin:0 auto}
.ctaform input{flex:1;background:transparent;border:none;padding:12px 20px;color:var(--txt);font-size:15px;outline:none}
.ctaform input::placeholder{color:var(--dim)}
.ctaform button{padding:12px 28px;background:linear-gradient(135deg,var(--b),var(--v));color:#fff;border-radius:999px;font-weight:600;font-size:15px;transition:all .2s;box-shadow:0 4px 16px rgba(79,124,255,.3);white-space:nowrap}
.ctaform button:hover{box-shadow:0 6px 24px rgba(79,124,255,.5);transform:translateY(-1px)}
.ctaform:focus-within{border-color:var(--b);box-shadow:0 0 0 3px rgba(79,124,255,.1)}

/* ── Footer ──────────────────────────────── */
footer{padding:40px 5%;border-top:1px solid var(--line)}
.fcont{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;font-size:14px;color:var(--sub)}
.flinks{display:flex;gap:32px;font-family:var(--fm)}
.flinks a{transition:color .2s}
.flinks a:hover{color:var(--b)}
.fcopy{font-family:var(--fm)}

/* ── Reveal animation ────────────────────── */
.rv{opacity:0;transform:translateY(30px);transition:opacity .6s,transform .6s}
.rv.vs{opacity:1;transform:translateY(0)}

/* ── Responsive ──────────────────────────── */
@media(max-width:1024px){
  .pgrid{grid-template-columns:repeat(2,1fr)}
  .faqcont{grid-template-columns:1fr;gap:48px}
}
@media(max-width:860px){
  .nlinks,.nctas{display:none}
  .ham{display:flex}
  .mbody{grid-template-columns:1fr}
  .mright{display:none}
  .fgrid{grid-template-columns:repeat(2,1fr)}
  .stats{grid-template-columns:repeat(2,1fr)}
  .hsteps{grid-template-columns:1fr;gap:40px}
  .hsteps::before{display:none}
  .hstep::after{display:none}
  .nf{display:none}
}
@media(max-width:560px){
  .hh1{font-size:clamp(32px,8vw,48px)}
  .hsub{font-size:16px}
  .hctas{flex-direction:column;width:100%}
  .hbtn-link{width:100%;text-align:center}
  .fgrid{grid-template-columns:1fr}
  .pgrid{grid-template-columns:1fr}
  .ctaform{flex-direction:column;border-radius:16px}
  .ctaform input{padding:14px 20px}
  .ctaform button{border-radius:12px}
  .ftitle h2,.htitle h2,.ptitle h2,.faqleft h2,.ctacont h2{font-size:32px}
  .fcont{flex-direction:column;gap:16px;text-align:center}
}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;
  html += '</style>';
  html += '</head>';
  html += '<body>';
  html += '<div id="CUR"></div>';
  html += '<div id="CURR"></div>';

  // ── Nav ──
  html += '<nav>';
  html += '<div class="logo"><span class="logo-icon">⚡</span><span>WaitlistWizard</span></div>';
  html += '<div class="nlinks"><a href="#features">Features</a><a href="#how">How it works</a><a href="#pricing">Pricing</a></div>';
  // FIX: Pure <a> tags — no nested <button> inside <a>
  html += '<div class="nctas"><a href="/#/login" class="nbtn-link ghost">Sign in</a><a href="/#/register" class="nbtn-link primary">Get started free</a></div>';
  html += '<button class="ham" onclick="openMob()"><span></span><span></span><span></span></button>';
  html += '</nav>';

  // ── Mobile menu ──
  html += '<div class="moverlay" id="mobMenu">';
  html += '<a href="#features" onclick="closeMob()">Features</a><a href="#how" onclick="closeMob()">How it works</a><a href="#pricing" onclick="closeMob()">Pricing</a><a href="/#/login" onclick="closeMob()">Sign in</a><a href="/#/register" onclick="closeMob()">Get started</a>';
  html += '<button class="mcls" onclick="closeMob()">&times;</button>';
  html += '</div>';

  // ── Hero ──
  html += '<section class="hero">';
  html += '<canvas id="hcvs"></canvas>';
  html += '<div class="hcont">';
  html += '<div class="hbadge">⚡ New — Referral position engine v2</div>';
  html += '<h1 class="hh1"><span>Launch to an audience</span><span class="gr">already waiting.</span></h1>';
  html += '<p class="hsub">Build <strong>stunning waitlist pages</strong> with viral referral mechanics. Turn signups into superfans before you even launch.</p>';
  // FIX: Pure <a> tags — no nested <button>
  html += '<div class="hctas"><a href="/#/register" class="hbtn-link primary">Get started free →</a><a href="#how" class="hbtn-link secondary">See how it works</a></div>';
  html += '<div class="hsocial"><div class="hstars">★★★★★</div><div class="havs"><div class="hav">AJ</div><div class="hav">KM</div><div class="hav">PR</div><div class="hav">SV</div><div class="hav">RK</div></div><span>500+ founders launched with WaitlistWizard</span></div>';
  html += '</div>';

  // ── 3D Mockup — uses .mwin-wrap for perspective container ──
  html += '<div class="mscene"><div class="mwin-wrap"><div class="mwin"><div class="mchrome"><div class="mdots"><div class="mdot"></div><div class="mdot"></div><div class="mdot"></div></div><div class="murl">waitlistwizard.io/p/my-product</div></div>';
  html += '<div class="mbody"><div class="mleft"><div class="mpill"><span class="mpulse"></span> 1,204 people waiting</div><h3>The future of productivity is here.</h3><p>Join the waitlist to get early access and exclusive launch perks.</p>';
  html += '<input type="email" class="minput" placeholder="your@email.com" readonly tabindex="-1" /><button class="mjoin" tabindex="-1">Join the Waitlist ⚡</button>';
  html += '<div class="msocial"><div class="msavs"><div class="msav"></div><div class="msav"></div><div class="msav"></div><div class="msav"></div></div><span>1,204 on the list · 340 referrals</span></div></div>';
  html += '<div class="mright"><h4>Analytics</h4><div class="mstat"><div class="mstat-label">Total Signups</div><div class="mstat-value">1,204</div></div>';
  html += '<div class="mstat"><div class="mstat-label">Page Views</div><div class="mstat-value">6,814</div></div><div class="mstat"><div class="mstat-label">Conversion</div><div class="mstat-value">17.7%</div></div>';
  html += '<div class="mchart"><div class="mbar"></div><div class="mbar"></div><div class="mbar"></div><div class="mbar"></div><div class="mbar"></div><div class="mbar"></div><div class="mbar"></div><div class="mbar"></div><div class="mbar"></div><div class="mbar"></div></div></div></div></div></div>';
  // Notification badges
  html += '<div class="nf nf1">🎉 New signup! via referral · just now</div><div class="nf nf2">📈 +47 signups today · 18% conversion</div></div>';
  html += '</section>';

  // ── Stats ──
  html += '<section class="stats rv"><div class="stat"><div class="stat-num">60s</div><div class="stat-label">Average Setup Time</div></div>';
  html += '<div class="stat"><div class="stat-num">3x</div><div class="stat-label">More Signups</div></div>';
  html += '<div class="stat"><div class="stat-num">100%</div><div class="stat-label">Customizable</div></div>';
  html += '<div class="stat"><div class="stat-num">∞</div><div class="stat-label">Possibilities</div></div></section>';

  // ── Features ──
  html += '<section class="features" id="features"><div class="ftitle rv"><h2>Everything you need to build hype</h2><p>All the tools to create, share, and analyze your waitlist.</p></div>';
  html += '<div class="fgrid"><div class="fcard rv"><div class="ficon">🎨</div><h3>Beautiful Pages</h3><p>Stunning, mobile-optimized landing pages that convert visitors into subscribers.</p></div>';
  html += '<div class="fcard rv"><div class="ficon">🔗</div><h3>Viral Referral Engine</h3><p>Built-in referral system that rewards users for sharing and drives exponential growth.</p></div>';
  html += '<div class="fcard rv"><div class="ficon">📊</div><h3>Real-time Analytics</h3><p>Track signups, page views, conversion rates, and referral performance in real time.</p></div>';
  html += '<div class="fcard rv"><div class="ficon">⚡</div><h3>Live in 60 Seconds</h3><p>No coding required. Create and publish your waitlist page in under a minute.</p></div>';
  html += '<div class="fcard rv"><div class="ficon">💌</div><h3>Smart Notifications</h3><p>Automated emails keep your audience engaged and excited about your launch.</p></div>';
  html += '<div class="fcard rv"><div class="ficon">🛡</div><h3>Clean List Protection</h3><p>Built-in spam detection and validation ensures a high-quality subscriber list.</p></div></div></section>';

  // ── How it works ──
  html += '<section class="how" id="how"><div class="hcont2"><div class="htitle rv"><h2>How it works</h2><p>Three simple steps to launch your waitlist.</p></div>';
  html += '<div class="hsteps"><div class="hstep rv"><div class="hnum">01</div><h3>Create</h3><p>Design your waitlist page with our intuitive builder. Add your branding, copy, and custom fields.</p></div>';
  html += '<div class="hstep rv"><div class="hnum">02</div><h3>Share</h3><p>Share your unique link across social media, email, and ads to start collecting signups.</p></div>';
  html += '<div class="hstep rv"><div class="hnum">03</div><h3>Launch</h3><p>Watch your list grow with real-time analytics, then export and launch to your engaged audience.</p></div></div></div></section>';

  // ── Pricing ──
  html += '<section class="pricing" id="pricing"><div class="pcont"><div class="ptitle rv"><h2>Simple, transparent pricing</h2><p>Choose the plan that fits your needs. Cancel anytime.</p></div>';
  html += '<div class="pgrid"><div class="pcard rv"><h3>Free</h3><p class="pdesc">Perfect for testing the waters</p><div class="pprice"><span class="pprice-num">$0</span><span class="pprice-per">/forever</span></div>';
  html += '<ul class="pfeatures"><li><span class="pcheck">✓</span> 1 waitlist page</li><li><span class="pcheck">✓</span> Up to 100 signups</li><li><span class="pcheck">✓</span> Basic analytics</li><li><span class="pcheck">✓</span> Email notifications</li><li><span class="pcheck">✓</span> WaitlistWizard branding</li></ul>';
  // FIX: Pure <a> tag — no nested <button>
  html += '<a href="/#/register" class="pbtn-link">Get started free</a></div>';
  html += '<div class="pcard featured rv"><div class="pbadge">Most popular</div><h3>Pro</h3><p class="pdesc">For serious product launches</p><div class="pprice"><span class="pprice-num">$19</span><span class="pprice-per">/mo</span></div>';
  html += '<ul class="pfeatures"><li><span class="pcheck">✓</span> 5 waitlist pages</li><li><span class="pcheck">✓</span> Unlimited signups</li><li><span class="pcheck">✓</span> Advanced analytics</li><li><span class="pcheck">✓</span> Remove branding</li><li><span class="pcheck">✓</span> Custom domains</li><li><span class="pcheck">✓</span> CSV export</li></ul>';
  html += '<a href="/#/register" class="pbtn-link">Start 14-day trial</a></div>';
  html += '<div class="pcard rv"><h3>Business</h3><p class="pdesc">For teams and agencies</p><div class="pprice"><span class="pprice-num">$49</span><span class="pprice-per">/mo</span></div>';
  html += '<ul class="pfeatures"><li><span class="pcheck">✓</span> 20 waitlist pages</li><li><span class="pcheck">✓</span> Unlimited signups</li><li><span class="pcheck">✓</span> Priority support</li><li><span class="pcheck">✓</span> API access</li><li><span class="pcheck">✓</span> White-label option</li><li><span class="pcheck">✓</span> Team collaboration</li></ul>';
  html += '<a href="/#/register" class="pbtn-link">Start 14-day trial</a></div></div></div></section>';

  // ── FAQ ──
  html += '<section class="faq"><div class="faqcont"><div class="faqleft rv"><h2>FAQ</h2><p>Can\'t find what you\'re looking for? <a href="/legal/contact">Contact us</a>.</p></div>';
  html += '<div class="faqright"><div class="faqitem rv" onclick="this.classList.toggle(\'op\')"><div class="faqq"><h3>How does the referral system work?</h3><div class="faqicon">+</div></div>';
  html += '<div class="faqa">Every person who joins gets a unique referral link. When they share it and others sign up through their link, they move up the waitlist. You can configure rewards for top referrers.</div></div>';
  html += '<div class="faqitem rv" onclick="this.classList.toggle(\'op\')"><div class="faqq"><h3>Can I use my own domain?</h3><div class="faqicon">+</div></div>';
  html += '<div class="faqa">Yes! Pro and Business plans include custom domain support. You can use your own domain or subdomain for your waitlist pages.</div></div>';
  html += '<div class="faqitem rv" onclick="this.classList.toggle(\'op\')"><div class="faqq"><h3>What happens to my data if I cancel?</h3><div class="faqicon">+</div></div>';
  html += '<div class="faqa">You can export your full subscriber list as CSV at any time. Your data remains accessible for 30 days after cancellation.</div></div>';
  html += '<div class="faqitem rv" onclick="this.classList.toggle(\'op\')"><div class="faqq"><h3>Do you offer refunds?</h3><div class="faqicon">+</div></div>';
  html += '<div class="faqa">We offer a 14-day money-back guarantee on all paid plans. No questions asked.</div></div>';
  html += '<div class="faqitem rv" onclick="this.classList.toggle(\'op\')"><div class="faqq"><h3>How do I integrate with my email service?</h3><div class="faqicon">+</div></div>';
  html += '<div class="faqa">You can export your subscriber list as CSV and import it into any email marketing platform. API access is available on the Business plan for automated integrations.</div></div></div></div></section>';

  // ── CTA ──
  html += '<section class="cta"><div class="ctacont rv"><h2>Ready to build hype?</h2><p>Join thousands of founders who launched with WaitlistWizard.</p>';
  html += '<div class="ctaform"><input type="email" id="ctaEmail" placeholder="Enter your email" /><button type="button" onclick="window.location.href=\'/#/register\'">Get started free →</button></div></div></section>';

  // ── Footer ──
  html += '<footer><div class="fcont"><div class="logo"><span class="logo-icon">⚡</span><span>WaitlistWizard</span></div>';
  html += '<div class="flinks"><a href="/legal/privacy">Privacy</a><a href="/legal/terms">Terms</a><a href="/legal/contact">Support</a></div>';
  html += '<div class="fcopy">&copy; 2026 WaitlistWizard</div></div></footer>';

  // ── Scripts ──
  html += '<script>';
  html += 'function openMob(){document.getElementById("mobMenu").style.display="flex";}function closeMob(){document.getElementById("mobMenu").style.display="none";}';
  html += `
/* Custom cursor (desktop only) */
if(window.matchMedia('(hover: hover)').matches){
  const cur=document.getElementById('CUR'),curr=document.getElementById('CURR');
  let mx=0,my=0,cx=0,cy=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
  (function animCursor(){cx+=(mx-cx)*0.12;cy+=(my-cy)*0.12;curr.style.left=cx+'px';curr.style.top=cy+'px';requestAnimationFrame(animCursor)})();
}

/* Sticky nav */
window.addEventListener('scroll',()=>{document.querySelector('nav').classList.toggle('sc',window.scrollY>40)});

/* Reveal on scroll */
const obs=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('vs'),(i%5)*80);obs.unobserve(e.target)}})},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));

/* ── Particle canvas (zoom-safe) ── */
const cvs=document.getElementById('hcvs');
const ctx=cvs.getContext('2d');
let dpr=window.devicePixelRatio||1;
let w,h;

function resizeCanvas(){
  const rect=cvs.parentElement.getBoundingClientRect();
  w=rect.width;h=rect.height;
  cvs.width=w*dpr;cvs.height=h*dpr;
  cvs.style.width=w+'px';cvs.style.height=h+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
resizeCanvas();

let particles=[];
let mouse={x:w/2,y:h/2};
let orbs=[
  {x:w*0.2,y:h*0.3,r:Math.min(80,w*0.08),dx:0.3,dy:0.2,color:'79,124,255'},
  {x:w*0.7,y:h*0.5,r:Math.min(100,w*0.1),dx:-0.2,dy:0.3,color:'124,92,252'},
  {x:w*0.5,y:h*0.7,r:Math.min(60,w*0.06),dx:0.25,dy:-0.25,color:'0,212,255'}
];

window.addEventListener('resize',()=>{
  dpr=window.devicePixelRatio||1;
  resizeCanvas();
  // Re-scale orbs
  orbs.forEach(o=>{o.r=Math.min(100,w*0.1)});
});

document.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});

const isMobile=window.innerWidth<=860;
const pcount=isMobile?40:80;
const maxDist=isMobile?60:95;
for(let i=0;i<pcount;i++){
  particles.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4});
}

function animate(){
  ctx.fillStyle='rgba(3,4,14,0.15)';
  ctx.fillRect(0,0,w,h);

  orbs.forEach(orb=>{
    orb.x+=orb.dx;orb.y+=orb.dy;
    if(orb.x<-50||orb.x>w+50)orb.dx*=-1;
    if(orb.y<-50||orb.y>h+50)orb.dy*=-1;
    const grad=ctx.createRadialGradient(orb.x,orb.y,0,orb.x,orb.y,orb.r);
    grad.addColorStop(0,'rgba('+orb.color+',0.15)');
    grad.addColorStop(1,'transparent');
    ctx.fillStyle=grad;
    ctx.fillRect(orb.x-orb.r,orb.y-orb.r,orb.r*2,orb.r*2);
  });

  particles.forEach((p,i)=>{
    const dx=mouse.x-p.x,dy=mouse.y-p.y,dist=Math.sqrt(dx*dx+dy*dy);
    if(dist<150){p.vx+=dx*0.00005;p.vy+=dy*0.00005}
    p.x+=p.vx;p.y+=p.vy;p.vx*=0.98;p.vy*=0.98;
    if(p.x<0||p.x>w)p.vx*=-1;
    if(p.y<0||p.y>h)p.vy*=-1;
    ctx.fillStyle='rgba(79,124,255,0.6)';
    ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill();
    for(let j=i+1;j<particles.length;j++){
      const p2=particles[j],ddx=p2.x-p.x,ddy=p2.y-p.y,d=Math.sqrt(ddx*ddx+ddy*ddy);
      if(d<maxDist){
        ctx.strokeStyle='rgba(79,124,255,'+(1-d/maxDist)*0.3+')';
        ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();
      }
    }
  });
  requestAnimationFrame(animate);
}
animate();
`;
  html += '</script>';
  html += '</body></html>';
  return html;
}
