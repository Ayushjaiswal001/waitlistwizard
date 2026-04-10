const base = (title, content) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title} — WaitlistWizard</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#06060e;color:#ededf0;line-height:1.7;padding:0}
  .wrap{max-width:720px;margin:0 auto;padding:60px 24px}
  .logo{display:flex;align-items:center;gap:10px;margin-bottom:48px;text-decoration:none;color:#ededf0;font-weight:700;font-size:18px}
  h1{font-size:32px;font-weight:800;margin-bottom:8px;color:#fff}
  .updated{font-size:13px;color:#555570;margin-bottom:40px}
  h2{font-size:18px;font-weight:700;color:#c4b5fd;margin:32px 0 12px}
  p{color:#8888aa;margin-bottom:14px;font-size:15px}
  a{color:#a78bfa}
  ul{color:#8888aa;padding-left:20px;margin-bottom:14px}
  li{margin-bottom:6px;font-size:15px}
  .footer{margin-top:60px;padding-top:24px;border-top:1px solid #1f1f40;display:flex;gap:20px;font-size:13px;color:#555570}
  .footer a{color:#555570}
  .footer a:hover{color:#a78bfa}
</style>
</head>
<body>
<div class="wrap">
  <a href="/" class="logo">⚡ WaitlistWizard</a>
  ${content}
  <div class="footer">
    <a href="/legal/privacy">Privacy Policy</a>
    <a href="/legal/terms">Terms of Service</a>
    <a href="/legal/contact">Contact</a>
    <span>© ${new Date().getFullYear()} WaitlistWizard</span>
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
