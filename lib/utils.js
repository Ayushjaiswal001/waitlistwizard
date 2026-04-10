import { randomBytes, randomUUID } from 'crypto';

export const generateId = () => randomUUID();

export function generateSlug(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
}

export function generateReferralCode() {
  return 'WZ-' + randomBytes(4).toString('hex').toUpperCase();
}

export function maskEmail(email) {
  const [user, domain] = email.split('@');
  return user[0] + '***@' + domain;
}

export function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
