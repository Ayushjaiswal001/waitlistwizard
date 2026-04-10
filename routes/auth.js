import { Router } from 'express';
import { z } from 'zod';
import { rateLimit } from 'express-rate-limit';
import { db } from '../db/index.js';
import { hashPassword, verifyPassword, generateToken, authMiddleware } from '../lib/auth.js';
import { generateId, asyncHandler } from '../lib/utils.js';

const router = Router();

// Rate limit auth endpoints
const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: { error: 'Too many attempts. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Generic error message hides email enumeration
const CRED_ERROR = { error: 'Invalid email or password.' };

router.post('/register', authLimit, asyncHandler(async (req, res) => {
  const { email, password } = RegisterSchema.parse(req.body);
  const existing = await db.execute({
    sql: `SELECT id FROM users WHERE email=?`,
    args: [email.toLowerCase()],
  });
  if (existing.rows.length > 0) return res.status(409).json(CRED_ERROR);

  const { hash, salt } = hashPassword(password);
  const id = generateId();
  await db.execute({
    sql: `INSERT INTO users (id, email, password_hash, salt) VALUES (?,?,?,?)`,
    args: [id, email.toLowerCase(), hash, salt],
  });
  const token = generateToken(id, email.toLowerCase());
  res.status(201).json({ token, user: { id, email: email.toLowerCase(), plan: 'free' } });
}));

router.post('/login', authLimit, asyncHandler(async (req, res) => {
  const { email, password } = LoginSchema.parse(req.body);
  const { rows } = await db.execute({
    sql: `SELECT id, email, password_hash, salt, plan FROM users WHERE email=?`,
    args: [email.toLowerCase()],
  });
  const user = rows[0];
  if (!user || !verifyPassword(password, user.password_hash, user.salt)) {
    return res.status(401).json(CRED_ERROR);
  }
  const token = generateToken(user.id, user.email);
  res.json({ token, user: { id: user.id, email: user.email, plan: user.plan } });
}));

// GET /api/auth/me — now uses authMiddleware for consistency
router.get('/me', authMiddleware, asyncHandler(async (req, res) => {
  const { rows } = await db.execute({
    sql: `SELECT id, email, plan FROM users WHERE id=?`,
    args: [req.user.id],
  });
  if (!rows[0]) return res.status(404).json({ error: 'User not found' });
  res.json({ user: rows[0] });
}));

export default router;
