const RESEND_API = 'https://api.resend.com/emails';
const FROM = 'WaitlistWizard <noreply@waitlistwizard.io>';

export async function sendEmail({ to, subject, html }) {
  try {
    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({ from: FROM, to, subject, html }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('[Email] Resend error:', err);
    }
  } catch (err) {
    console.error('[Email] Failed to send:', err.message);
    // Never crash on email failure
  }
}

export const templates = {
  signupNotification(ownerEmail, pageName, signupEmail, total) {
    return {
      to: ownerEmail,
      subject: `New signup on "${pageName}" — ${total} total`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
          <h2 style="color:#a78bfa">⚡ New Waitlist Signup</h2>
          <p><strong>${signupEmail}</strong> just joined your waitlist for <strong>${pageName}</strong>.</p>
          <p style="color:#666">You now have <strong>${total}</strong> total signups.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
          <p style="color:#999;font-size:12px">WaitlistWizard · Manage your pages at waitlistwizard.io/app</p>
        </div>
      `,
    };
  },
};
