import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';
import { initDb, db } from './db/index.js';
import authRoutes from './routes/auth.js';
import pagesRoutes from './routes/pages.js';
import signupsRoutes from './routes/signups.js';
import publicRoutes from './routes/public.js';
import billingRoutes from './routes/billing.js';
import legalRoutes from './routes/legal.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;

// ── Helmet ──────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
}));

// ── Sitemap (dynamic, includes public pages) ────────────────
app.get('/sitemap.xml', async (_req, res) => {
  try {
    const base = APP_URL;
    let urls = `
  <url><loc>${base}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${base}/legal/privacy</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>
  <url><loc>${base}/legal/terms</loc><changefreq>monthly</changefreq><priority>0.3</priority></url>`;

    // Include active public waitlist pages
    try {
      const { rows } = await db.execute({
        sql: `SELECT slug FROM pages WHERE is_active=1`,
        args: [],
      });
      for (const row of rows) {
        urls += `\n  <url><loc>${base}/p/${row.slug}</loc><changefreq>daily</changefreq><priority>0.6</priority></url>`;
      }
    } catch { /* db not ready yet, skip dynamic pages */ }

    res.setHeader('Content-Type', 'application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}\n</urlset>`);
  } catch (err) {
    console.error('Sitemap error:', err);
    res.status(500).send('Error generating sitemap');
  }
});

// ── Landing page (served before any middleware) ─────────────
app.get('/', async (_req, res) => {
  try {
    const { renderLandingPage } = await import('./templates/landingPage.js');
    res.send(renderLandingPage());
  } catch (err) {
    console.error('Landing:', err);
    res.status(500).send('Error');
  }
});

// ── llms.txt (AEO — for AI crawlers) ────────────────────────
app.get('/llms.txt', (_req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(`# WaitlistWizard

> WaitlistWizard is a SaaS platform for building viral waitlist pages with built-in referral mechanics.

## What it does
- Creates beautiful, mobile-optimized waitlist landing pages in 60 seconds
- Built-in viral referral engine that rewards users for sharing
- Real-time analytics: signups, page views, conversion rates, referral tracking
- CSV export of subscriber lists
- Email notifications on new signups via Resend
- Multiple design themes and customization (colors, fonts, branding)

## Plans
- Free: 1 page, 100 signups, basic analytics
- Pro ($19/mo): 5 pages, unlimited signups, remove branding, custom domains
- Business ($49/mo): 20 pages, API access, white-label, team collaboration

## Tech
- Backend: Node.js + Express
- Database: Turso (libSQL)
- Billing: LemonSqueezy
- Email: Resend

## Links
- Homepage: ${APP_URL}
- Privacy: ${APP_URL}/legal/privacy
- Terms: ${APP_URL}/legal/terms
`);
});

// ── Webhook raw body (BEFORE express.json!) ─────────────────
app.use('/api/billing/webhook', express.raw({ type: 'application/json', limit: '1mb' }));

// ── Body parsing ────────────────────────────────────────────
app.use(express.json({ limit: '64kb' }));

// ── CORS (exempt webhook — it's already handled above) ──────
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? APP_URL : 'http://localhost:3000',
  credentials: true,
};
app.use('/api/billing/webhook', cors()); // allow any origin for webhook
app.use(cors(corsOptions));

// ── API routes ──────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api', signupsRoutes);           // routes define /pages/:pid/signups, /signups/:id
app.use('/api/billing', billingRoutes);

// ── Public waitlist pages ───────────────────────────────────
app.use('/p', publicRoutes);
app.use('/w', publicRoutes); // alias /w to /p for APP_URL referral links

// ── Legal pages ─────────────────────────────────────────────
app.use('/legal', legalRoutes);

// ── Health check ────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({
  status: 'ok',
  timestamp: new Date().toISOString(),
}));

// ── Static files ────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── SPA catch-all ───────────────────────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Error handler ───────────────────────────────────────────
app.use((err, _req, res, _next) => {
  // Handle Zod validation errors with user-friendly messages
  if (err instanceof z.ZodError) {
    const messages = err.errors.map(e => `${e.path.join('.')}: ${e.message}`);
    return res.status(400).json({ error: messages.join('; ') });
  }

  console.error('Error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// ── Start server ────────────────────────────────────────────
async function start() {
  try {
    await initDb();
    console.log('✓ Database initialized');
  } catch (err) {
    console.error('✗ Database init failed:', err.message);
    // Continue anyway — tables may already exist
  }

  const server = app.listen(PORT, () => {
    console.log(`✓ Server on ${PORT}`);
    console.log(`✓ Env: ${process.env.NODE_ENV || 'dev'}`);
  });

  // ── Graceful shutdown for Koyeb zero-downtime deploys ─────
  const shutdown = (signal) => {
    console.log(`\n${signal} received — shutting down gracefully…`);
    server.close(() => {
      console.log('✓ Server closed');
      process.exit(0);
    });
    // Force exit after 10s
    setTimeout(() => process.exit(1), 10_000);
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

start();
