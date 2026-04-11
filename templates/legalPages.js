const base = (title, content) => `<!DOCTYPE html>
<html lang="en" style="scroll-behavior: smooth;">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>\${title} — WaitlistWizard</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap" rel="stylesheet" />
<style>
:root {
  --bg: #0a0a0b;
  --text-main: #f0ede6;
  --text-muted: #888888;
  --accent: #c8ff00;
  --border: rgba(255,255,255,0.08);
  --font-display: 'Instrument Serif', serif;
  --font-body: 'General Sans', sans-serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text-main);
  line-height: 1.6;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

/* Subtle Noise Texture */
body::before {
  content: ''; position: fixed; inset: 0; z-index: -1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
}

.wrap { max-width: 680px; margin: 0 auto; padding: 80px 5%; }
.logo { display:flex; align-items:center; gap:8px; margin-bottom:64px; text-decoration:none; color:var(--text-main); font-weight:600; font-size:18px; }
.logo svg { width: 24px; height: 24px; fill: var(--accent); }

h1 { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 400; line-height: 1.1; margin-bottom: 8px; letter-spacing: -0.02em; }
.updated { font-size: 13px; color: var(--text-muted); margin-bottom: 64px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }

h2 { font-family: var(--font-display); font-size: 28px; font-weight: 400; color: var(--text-main); margin: 48px 0 16px; letter-spacing: -0.01em; }
p { color: var(--text-muted); margin-bottom: 16px; font-size: 16px; }
a { color: var(--text-main); text-decoration: underline; text-decoration-color: var(--accent); transition: color 0.2s; }
a:hover { color: var(--accent); }

ul { color: var(--text-muted); padding-left: 20px; margin-bottom: 16px; }
li { margin-bottom: 8px; font-size: 16px; }

.footer { margin-top: 80px; padding-top: 40px; border-top: 1px solid var(--border); display: flex; flex-wrap: wrap; gap: 24px; font-size: 14px; color: var(--text-muted); }
.footer a { text-decoration: none; color: var(--text-muted); }
.footer a:hover { color: var(--text-main); }
</style>
</head>
<body>
<div class="wrap">
  <a href="/" class="logo"><svg viewBox="0 0 24 24"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/></svg> WaitlistWizard</a>
  \${content}
  <div class="footer">
    <a href="/legal/privacy">Privacy Policy</a>
    <a href="/legal/terms">Terms of Service</a>
    <a href="/legal/contact">Contact</a>
    <span>© \${new Date().getFullYear()} WaitlistWizard</span>
  </div>
</div>
</body>
</html>`;

export function renderPrivacyPolicy() {
  return base('Privacy Policy', `
    <h1>Privacy Policy</h1>
    <div class="updated">Last updated: April 2026</div>

    <h2>1. Information We Collect</h2>
    <p>We collect information you provide directly: your email address and password when you register, and the content of waitlist pages you create. We also collect emails of visitors who sign up on your waitlist pages.</p>

    <h2>2. How We Use Your Information</h2>
    <ul>
      <li>To provide and operate the WaitlistWizard service</li>
      <li>To send transactional emails (signup notifications, account updates)</li>
      <li>To process payments via LemonSqueezy</li>
      <li>To improve and maintain the platform</li>
    </ul>

    <h2>3. Data Storage</h2>
    <p>Your data is stored securely using Turso (libSQL), a distributed SQLite database. Passwords are hashed using PBKDF2 with SHA-512 and are never stored in plain text.</p>

    <h2>4. Third-Party Services</h2>
    <ul>
      <li><strong>Resend</strong> — email delivery</li>
      <li><strong>LemonSqueezy</strong> — payment processing</li>
      <li><strong>Turso</strong> — database hosting</li>
      <li><strong>Koyeb</strong> — application hosting</li>
    </ul>
    <p>Each third-party service has its own privacy policy. We do not sell your data to any third party.</p>

    <h2>5. Cookies</h2>
    <p>We use localStorage to store your authentication token. We do not use tracking cookies or third-party analytics.</p>

    <h2>6. Your Rights</h2>
    <p>You may request deletion of your account and all associated data at any time by contacting us at <a href="mailto:support@waitlistwizard.io">support@waitlistwizard.io</a>.</p>

    <h2>7. Contact</h2>
    <p>For privacy-related questions, email us at <a href="mailto:support@waitlistwizard.io">support@waitlistwizard.io</a>.</p>
  `);
}

export function renderTermsOfService() {
  return base('Terms of Service', `
    <h1>Terms of Service</h1>
    <div class="updated">Last updated: April 2026</div>

    <h2>1. Acceptance</h2>
    <p>By using WaitlistWizard, you agree to these Terms. If you do not agree, do not use the service.</p>

    <h2>2. Use of Service</h2>
    <p>WaitlistWizard provides tools to create waitlist pages and collect email signups. You are responsible for all content on your pages and for complying with applicable laws, including email marketing regulations (CAN-SPAM, GDPR).</p>

    <h2>3. Prohibited Uses</h2>
    <ul>
      <li>Collecting emails without consent or for spam</li>
      <li>Creating pages for illegal products or services</li>
      <li>Attempting to hack, scrape, or abuse the platform</li>
      <li>Impersonating other companies or individuals</li>
    </ul>

    <h2>4. Payments & Refunds</h2>
    <p>Paid plans are billed monthly through LemonSqueezy. You may cancel at any time — your plan stays active until the end of the billing period. We offer a 7-day money-back guarantee for first-time purchases. Email <a href="mailto:support@waitlistwizard.io">support@waitlistwizard.io</a> within 7 days.</p>

    <h2>5. Free Plan Limits</h2>
    <p>The free plan allows 1 waitlist page and up to 100 signups per page. Exceeding limits requires upgrading to a paid plan.</p>

    <h2>6. Termination</h2>
    <p>We reserve the right to suspend or terminate accounts that violate these Terms. You may delete your account at any time.</p>

    <h2>7. Disclaimer</h2>
    <p>WaitlistWizard is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.</p>

    <h2>8. Contact</h2>
    <p>Questions? Email <a href="mailto:support@waitlistwizard.io">support@waitlistwizard.io</a>.</p>
  `);
}

export function renderContact() {
  return base('Contact & Support', `
    <h1>Contact & Support</h1>
    <div class="updated">We typically respond within 24 hours</div>

    <h2>Email Support</h2>
    <p>For all questions, issues, or feedback, email us at:<br/>
    <a href="mailto:support@waitlistwizard.io" style="font-size:18px;font-weight:600">support@waitlistwizard.io</a></p>

    <h2>Billing Issues</h2>
    <p>For subscription or payment questions, include your registered email address and we'll resolve it quickly. We offer a 7-day money-back guarantee.</p>

    <h2>Bug Reports</h2>
    <p>Found a bug? Email us with a description of what happened, what you expected, and your browser/device. Screenshots help a lot.</p>

    <h2>Feature Requests</h2>
    <p>We'd love to hear what features would help you. Send ideas to <a href="mailto:support@waitlistwizard.io">support@waitlistwizard.io</a> with the subject line "Feature Request".</p>

    <h2>Response Times</h2>
    <ul>
      <li>General support: within 24 hours</li>
      <li>Billing issues: within 12 hours</li>
      <li>Critical bugs: within 6 hours</li>
    </ul>
  `);
}
