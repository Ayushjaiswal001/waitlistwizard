import { Router } from 'express';
import { db } from '../db/index.js';
import { authMiddleware } from '../lib/auth.js';
import { asyncHandler, getTodayISO } from '../lib/utils.js';

const router = Router();

// GET /api/pages/:pid/signups
router.get('/pages/:pid/signups', authMiddleware, asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { sort = 'created_at', order = 'desc', search = '', page = 1, limit = 25 } = req.query;

  const { rows: pageCheck } = await db.execute({
    sql: `SELECT id FROM pages WHERE id=? AND user_id=?`, args: [pid, req.user.id],
  });
  if (!pageCheck[0]) return res.status(404).json({ error: 'Page not found' });

  const allowed = ['created_at', 'email', 'position', 'referral_count'];
  const col = allowed.includes(sort) ? sort : 'created_at';
  const dir = order === 'asc' ? 'ASC' : 'DESC';
  const offset = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);

  const whereSearch = search ? `AND email LIKE ?` : '';
  const searchArg = search ? [`%${search}%`] : [];

  const { rows } = await db.execute({
    sql: `SELECT * FROM signups WHERE page_id=? ${whereSearch} ORDER BY ${col} ${dir} LIMIT ? OFFSET ?`,
    args: [pid, ...searchArg, parseInt(limit), offset],
  });

  const { rows: countRows } = await db.execute({
    sql: `SELECT COUNT(*) as cnt FROM signups WHERE page_id=? ${whereSearch}`,
    args: [pid, ...searchArg],
  });

  const total = countRows[0].cnt;
  res.json({
    signups: rows,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
  });
}));

// GET /api/pages/:pid/signups/csv
router.get('/pages/:pid/signups/csv', authMiddleware, asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { rows: pageCheck } = await db.execute({
    sql: `SELECT name FROM pages WHERE id=? AND user_id=?`, args: [pid, req.user.id],
  });
  if (!pageCheck[0]) return res.status(404).json({ error: 'Page not found' });

  const { rows } = await db.execute({
    sql: `SELECT email, referral_code, referred_by, referral_count, position, utm_source, utm_medium, utm_campaign, created_at FROM signups WHERE page_id=? ORDER BY position ASC`,
    args: [pid],
  });

  const headers = ['Position', 'Email', 'Referral Code', 'Referred By', 'Referral Count', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'Joined At'];
  const lines = [
    headers.join(','),
    ...rows.map(r => [
      r.position, r.email, r.referral_code, r.referred_by || '',
      r.referral_count, r.utm_source || '', r.utm_medium || '',
      r.utm_campaign || '', r.created_at,
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')),
  ];

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="signups-${pid}.csv"`);
  res.send(lines.join('\n'));
}));

// GET /api/pages/:pid/analytics
router.get('/pages/:pid/analytics', authMiddleware, asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { range = '30d' } = req.query;

  const { rows: pageCheck } = await db.execute({
    sql: `SELECT id FROM pages WHERE id=? AND user_id=?`, args: [pid, req.user.id],
  });
  if (!pageCheck[0]) return res.status(404).json({ error: 'Page not found' });

  const days = range === '7d' ? 7 : range === '90d' ? 90 : 30;
  const since = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);

  const { rows: daily } = await db.execute({
    sql: `SELECT date, views, signups, referrals FROM page_analytics WHERE page_id=? AND date >= ? ORDER BY date ASC`,
    args: [pid, since],
  });

  const totals = daily.reduce((a, d) => ({
    views: a.views + (d.views || 0),
    signups: a.signups + (d.signups || 0),
    referrals: a.referrals + (d.referrals || 0),
  }), { views: 0, signups: 0, referrals: 0 });

  res.json({ daily, totals });
}));

// DELETE /api/signups/:id
router.delete('/signups/:id', authMiddleware, asyncHandler(async (req, res) => {
  const { rows } = await db.execute({
    sql: `SELECT s.id FROM signups s JOIN pages p ON s.page_id=p.id WHERE s.id=? AND p.user_id=?`,
    args: [req.params.id, req.user.id],
  });
  if (!rows[0]) return res.status(404).json({ error: 'Signup not found' });
  await db.execute({ sql: `DELETE FROM signups WHERE id=?`, args: [req.params.id] });
  res.json({ success: true });
}));

export default router;
