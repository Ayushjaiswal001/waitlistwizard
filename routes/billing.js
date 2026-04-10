import { Router } from 'express';
import { z } from 'zod';
import { rateLimit } from 'express-rate-limit';
import { authMiddleware } from '../lib/auth.js';
import { createCheckout, verifyWebhook, handleWebhookEvent } from '../lib/billing.js';
import { asyncHandler } from '../lib/utils.js';

const router = Router();

const VARIANT_MAP = {
  pro: process.env.LS_PRO_VARIANT_ID,
  business: process.env.LS_BIZ_VARIANT_ID,
};

const checkoutLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many checkout requests. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/billing/checkout
router.post('/checkout', authMiddleware, checkoutLimit, asyncHandler(async (req, res) => {
  const { plan } = z.object({ plan: z.enum(['pro', 'business']) }).parse(req.body);
  const variantId = VARIANT_MAP[plan];
  if (!variantId) return res.status(400).json({ error: 'Invalid plan' });

  const url = await createCheckout(variantId, req.user.email, req.user.id);
  res.json({ checkout_url: url });
}));

// POST /api/billing/webhook  (raw body middleware applied in server.js)
router.post('/webhook', asyncHandler(async (req, res) => {
  const signature = req.headers['x-signature'];
  const rawBody = req.body; // Buffer from express.raw()

  if (!verifyWebhook(rawBody, signature)) {
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  await handleWebhookEvent(event);
  res.json({ received: true });
}));

export default router;
