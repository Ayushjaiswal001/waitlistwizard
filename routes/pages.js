import { Router } from 'express';
import { z } from 'zod';
import { rateLimit } from 'express-rate-limit';
import sanitizeHtml from 'sanitize-html';
import { db } from '../db/index.js';
import { authMiddleware } from '../lib/auth.js';
import { generateId, generateSlug, asyncHandler } from '../lib/utils.js';

const router = Router();
router.use(authMiddleware);

const createPageLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: 'Too many page create requests. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const PLAN_LIMITS = { free: 1, pro: 5, business: 20 };

const sanitize = (s) => sanitizeHtml(String(s || ''), { allowedTags: [], allowedAttributes: {} });

const PageSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/).optional(),
  headline: z.string().max(120).optional(),
  subheadline: z.string().max(300).optional(),
  cta_text: z.string().max(60).optional(),
  success_message: z.string().max(300).optional(),
  bg_style: z.enum(['gradient','solid','mesh']).optional(),
  bg_value: z.string().max(100).optional(),
  accent_color: z.string().max(20).optional(),
  font_pair: z.enum(['cabinet-inter','clash-satoshi','general-sans','space-dm','epilogue-karla']).optional(),
  logo_url: z.string().url().max(500).optional().or(z.literal('')),
  remove_branding: z.number().int().min(0).max(1).optional(),
  is_active: z.number().int().min(0).max(1).optional(),
});

// GET /api/pages
router.get('/', asyncHandler(async (req, res) => {
  const { rows } = await db.execute({
    sql: `SELECT * FROM pages WHERE user_id=? ORDER BY created_at DESC`,
    args: [req.user.id],
  });
  res.json({ pages: rows });
}));

// POST /api/pages
router.post('/', createPageLimit, asyncHandler(async (req, res) => {
  const body = PageSchema.parse(req.body);

  // Check plan limit
  const { rows: existing } = await db.execute({
    sql: `SELECT COUNT(*) as cnt FROM pages WHERE user_id=?`,
    args: [req.user.id],
  });
  const { rows: userRows } = await db.execute({
    sql: `SELECT plan FROM users WHERE id=?`,
    args: [req.user.id],
  });
  const plan = userRows[0]?.plan || 'free';
  const limit = PLAN_LIMITS[plan] || 1;
  if (existing[0].cnt >= limit) {
    return res.status(403).json({ error: `Your ${plan} plan allows up to ${limit} page(s). Upgrade to create more.` });
  }

  const id = generateId();
  const slug = body.slug || generateSlug(body.name);

  // Check slug uniqueness
  const { rows: slugCheck } = await db.execute({
    sql: `SELECT id FROM pages WHERE slug=?`, args: [slug],
  });
  if (slugCheck.length > 0) {
    return res.status(409).json({ error: `Slug "${slug}" is already taken.` });
  }

  await db.execute({
    sql: `INSERT INTO pages (id, user_id, name, slug, headline, subheadline, cta_text, bg_style, bg_value, accent_color, font_pair, logo_url, success_message, remove_branding, is_active)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    args: [
      id, req.user.id,
      sanitize(body.name), slug,
      sanitize(body.headline || 'Something amazing is coming'),
      sanitize(body.subheadline || 'Be the first to know. Join the waitlist.'),
      sanitize(body.cta_text || 'Join the Waitlist'),
      body.bg_style || 'gradient',
      body.bg_value || '#0f172a,#1e1b4b',
      body.accent_color || '#a78bfa',
      body.font_pair || 'cabinet-inter',
      body.logo_url || null,
      sanitize(body.success_message || 'You are on the list! Share your unique link to move up.'),
      body.remove_branding ?? 0,
      body.is_active ?? 1,
    ],
  });

  const { rows } = await db.execute({ sql: `SELECT * FROM pages WHERE id=?`, args: [id] });
  res.status(201).json({ page: rows[0] });
}));

// GET /api/pages/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const { rows } = await db.execute({
    sql: `SELECT * FROM pages WHERE id=? AND user_id=?`,
    args: [req.params.id, req.user.id],
  });
  if (!rows[0]) return res.status(404).json({ error: 'Page not found' });
  res.json({ page: rows[0] });
}));

// PUT /api/pages/:id
router.put('/:id', asyncHandler(async (req, res) => {
  const { rows: existing } = await db.execute({
    sql: `SELECT * FROM pages WHERE id=? AND user_id=?`,
    args: [req.params.id, req.user.id],
  });
  if (!existing[0]) return res.status(404).json({ error: 'Page not found' });

  const body = PageSchema.partial().parse(req.body);
  const p = existing[0];

  await db.execute({
    sql: `UPDATE pages SET name=?,headline=?,subheadline=?,cta_text=?,bg_style=?,bg_value=?,accent_color=?,font_pair=?,logo_url=?,success_message=?,remove_branding=?,is_active=?
          WHERE id=? AND user_id=?`,
    args: [
      sanitize(body.name ?? p.name),
      sanitize(body.headline ?? p.headline),
      sanitize(body.subheadline ?? p.subheadline),
      sanitize(body.cta_text ?? p.cta_text),
      body.bg_style ?? p.bg_style,
      body.bg_value ?? p.bg_value,
      body.accent_color ?? p.accent_color,
      body.font_pair ?? p.font_pair,
      body.logo_url ?? p.logo_url,
      sanitize(body.success_message ?? p.success_message),
      body.remove_branding ?? p.remove_branding,
      body.is_active ?? p.is_active,
      req.params.id, req.user.id,
    ],
  });

  const { rows } = await db.execute({ sql: `SELECT * FROM pages WHERE id=?`, args: [req.params.id] });
  res.json({ page: rows[0] });
}));

// DELETE /api/pages/:id
router.delete('/:id', asyncHandler(async (req, res) => {
  const { rows } = await db.execute({
    sql: `SELECT id FROM pages WHERE id=? AND user_id=?`,
    args: [req.params.id, req.user.id],
  });
  if (!rows[0]) return res.status(404).json({ error: 'Page not found' });
  await db.execute({ sql: `DELETE FROM pages WHERE id=?`, args: [req.params.id] });
  res.json({ success: true });
}));

export default router;
