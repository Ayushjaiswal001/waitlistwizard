import { createHmac, timingSafeEqual } from 'crypto';
import { db } from '../db/index.js';

const LS_API = 'https://api.lemonsqueezy.com/v1';

export async function createCheckout(variantId, email, userId) {
  const res = await fetch(`${LS_API}/checkouts`, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${process.env.LS_API_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            email,
            custom: { user_id: userId },
          },
        },
        relationships: {
          store: {
            data: { type: 'stores', id: String(process.env.LS_STORE_ID) },
          },
          variant: {
            data: { type: 'variants', id: String(variantId) },
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LemonSqueezy checkout failed: ${err}`);
  }

  const data = await res.json();
  return data.data?.attributes?.url;
}

export function verifyWebhook(rawBody, signature) {
  if (!signature) return false;
  const secret = process.env.LS_WEBHOOK_SECRET;
  const hmac = createHmac('sha256', secret).update(rawBody).digest('hex');
  try {
    return timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
  } catch {
    return false;
  }
}

export async function handleWebhookEvent(event) {
  const { meta, data } = event;
  const eventName = meta?.event_name;
  const userId = meta?.custom_data?.user_id;
  const customerId = String(data?.attributes?.customer_id || '');
  const subscriptionId = String(data?.id || '');

  if (!userId) return;

  const planMap = {
    [process.env.LS_PRO_VARIANT_ID]: 'pro',
    [process.env.LS_BIZ_VARIANT_ID]: 'business',
  };

  const variantId = String(data?.attributes?.variant_id || '');
  const plan = planMap[variantId];

  if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
    if (!plan) return;
    await db.execute({
      sql: `UPDATE users SET plan=?, ls_customer_id=?, ls_subscription_id=?, updated_at=datetime('now') WHERE id=?`,
      args: [plan, customerId, subscriptionId, userId],
    });
  }

  if (eventName === 'subscription_cancelled' || eventName === 'subscription_expired') {
    await db.execute({
      sql: `UPDATE users SET plan='free', ls_subscription_id=NULL, updated_at=datetime('now') WHERE id=?`,
      args: [userId],
    });
  }
}

export function checkPlan(limits) {
  return async (req, res, next) => {
    try {
      const { rows } = await db.execute({
        sql: `SELECT plan FROM users WHERE id=?`,
        args: [req.user.id],
      });
      const plan = rows[0]?.plan || 'free';
      const limit = limits[plan];
      if (limit !== undefined && limit === false) {
        return res.status(403).json({ error: `This feature requires a higher plan.` });
      }
      req.userPlan = plan;
      next();
    } catch (err) {
      next(err);
    }
  };
}
