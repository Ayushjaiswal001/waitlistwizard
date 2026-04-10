import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { z } from 'zod';
import { db } from '../db/index.js';
import { sendEmail, templates } from '../lib/email.js';
import { generateId, generateReferralCode, maskEmail, getTodayISO, asyncHandler } from '../lib/utils.js';
import { renderWaitlistPage } from '../templates/waitlistPage.js';

const router = Router();

const joinLimit = rateLimit({ windowMs: 60_000, max: 5, keyGenerator: (req) => req.ip });

// GET /w/:slug — render public waitlist page
router.get('/:slug', asyncHandler(async (req, res) => {
  const { rows } = await db.execute({
    sql: `SELECT * FROM pages WHERE slug=? AND is_active=1`, args: [req.params.slug],
  });
  const page = rows[0];
  if (!page) return res.status(404).send('<h1>Waitlist not found</h1>');

  // Skip view tracking for preview loads from page builder
  if (req.query.preview !== 'true') {
    const today = getTodayISO();
    await db.execute({
      sql: `INSERT INTO page_analytics (id, page_id, date, views) VALUES (?,?,?,1)
            ON CONFLICT(page_id, date) DO UPDATE SET views=views+1`,
      args: [generateId(), page.id, today],
    });
    await db.execute({
      sql: `UPDATE pages SET total_views=total_views+1 WHERE id=?`, args: [page.id],
    });
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(renderWaitlistPage(page));
}));

// POST /w/:slug/join
router.post('/:slug/join', joinLimit, asyncHandler(async (req, res) => {
  const { email } = z.object({ email: z.string().email() }).parse(req.body);
  const ref = req.query.ref || null;

  const { rows: pageRows } = await db.execute({
    sql: `SELECT * FROM pages WHERE slug=? AND is_active=1`, args: [req.params.slug],
  });
  const page = pageRows[0];
  if (!page) return res.status(404).json({ error: 'Waitlist not found' });

  // Check free plan cap
  if (page.total_signups >= 100) {
    const { rows: ownerRows } = await db.execute({
      sql: `SELECT plan FROM users WHERE id=?`, args: [page.user_id],
    });
    if (ownerRows[0]?.plan === 'free') {
      return res.status(403).json({ error: 'This waitlist has reached its free plan limit.' });
    }
  }

  // Check if already signed up
  const { rows: existing } = await db.execute({
    sql: `SELECT * FROM signups WHERE page_id=? AND email=?`, args: [page.id, email.toLowerCase()],
  });

  if (existing[0]) {
    const s = existing[0];
    const effectivePos = Math.max(1, s.position - s.referral_count * 10);
    return res.json({
      position: effectivePos,
      referral_code: s.referral_code,
      referral_link: `${process.env.APP_URL}/w/${page.slug}?ref=${s.referral_code}`,
      total_signups: page.total_signups,
      already_joined: true,
    });
  }

  // Find referrer
  let referrerId = null;
  let referredByCode = null;
  if (ref) {
    const { rows: refRows } = await db.execute({
      sql: `SELECT id, referral_code FROM signups WHERE referral_code=? AND page_id=?`,
      args: [ref, page.id],
    });
    if (refRows[0]) {
      referrerId = refRows[0].id;
      referredByCode = refRows[0].referral_code;
    }
  }

  // Assign position
  const { rows: posRows } = await db.execute({
    sql: `SELECT COUNT(*)+1 as pos FROM signups WHERE page_id=?`, args: [page.id],
  });
  const position = posRows[0].pos;
  const referralCode = generateReferralCode();
  const id = generateId();
  const ip = req.ip || null;
  const today = getTodayISO();

  const utm_source = req.query.utm_source || null;
  const utm_medium = req.query.utm_medium || null;
  const utm_campaign = req.query.utm_campaign || null;

  await db.execute({
    sql: `INSERT INTO signups (id, page_id, email, referral_code, referred_by, position, ip_address, utm_source, utm_medium, utm_campaign)
          VALUES (?,?,?,?,?,?,?,?,?,?)`,
    args: [id, page.id, email.toLowerCase(), referralCode, referredByCode, position, ip, utm_source, utm_medium, utm_campaign],
  });

  // Increment referrer count
  if (referrerId) {
    await db.execute({
      sql: `UPDATE signups SET referral_count=referral_count+1 WHERE id=?`, args: [referrerId],
    });
  }

  // Update page totals + analytics
  await db.execute({
    sql: `UPDATE pages SET total_signups=total_signups+1 WHERE id=?`, args: [page.id],
  });
  await db.execute({
    sql: `INSERT INTO page_analytics (id, page_id, date, signups${referrerId ? ', referrals' : ''})
          VALUES (?,?,?,1${referrerId ? ',1' : ''})
          ON CONFLICT(page_id, date) DO UPDATE SET signups=signups+1${referrerId ? ', referrals=referrals+1' : ''}`,
    args: [generateId(), page.id, today],
  });

  // Notify page owner (fire and forget)
  const { rows: ownerRows } = await db.execute({
    sql: `SELECT email FROM users WHERE id=?`, args: [page.user_id],
  });
  if (ownerRows[0]) {
    sendEmail(templates.signupNotification(ownerRows[0].email, page.name, email, position));
  }

  const effectivePos = Math.max(1, position - 0);
  res.status(201).json({
    position: effectivePos,
    referral_code: referralCode,
    referral_link: `${process.env.APP_URL}/w/${page.slug}?ref=${referralCode}`,
    total_signups: position,
  });
}));

// GET /w/:slug/status/:code
router.get('/:slug/status/:code', asyncHandler(async (req, res) => {
  const { rows: pageRows } = await db.execute({
    sql: `SELECT id, total_signups FROM pages WHERE slug=?`, args: [req.params.slug],
  });
  if (!pageRows[0]) return res.status(404).json({ error: 'Page not found' });

  const { rows } = await db.execute({
    sql: `SELECT email, position, referral_count FROM signups WHERE referral_code=? AND page_id=?`,
    args: [req.params.code, pageRows[0].id],
  });
  if (!rows[0]) return res.status(404).json({ error: 'Signup not found' });

  const s = rows[0];
  res.json({
    email_masked: maskEmail(s.email),
    effective_position: Math.max(1, s.position - s.referral_count * 10),
    referral_count: s.referral_count,
    total_signups: pageRows[0].total_signups,
  });
}));

export default router;
