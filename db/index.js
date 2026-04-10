import { createClient } from '@libsql/client';

export const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function initDb() {
  await db.batch([
    // Users
    { sql: `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      plan TEXT NOT NULL DEFAULT 'free' CHECK(plan IN ('free','pro','business')),
      ls_customer_id TEXT,
      ls_subscription_id TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`, args: [] },

    // Pages
    { sql: `CREATE TABLE IF NOT EXISTS pages (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      headline TEXT NOT NULL DEFAULT 'Something amazing is coming',
      subheadline TEXT NOT NULL DEFAULT 'Be the first to know. Join the waitlist.',
      cta_text TEXT NOT NULL DEFAULT 'Join the Waitlist',
      bg_style TEXT NOT NULL DEFAULT 'gradient' CHECK(bg_style IN ('gradient','solid','mesh')),
      bg_value TEXT NOT NULL DEFAULT '#0f172a,#1e1b4b',
      accent_color TEXT NOT NULL DEFAULT '#a78bfa',
      font_pair TEXT NOT NULL DEFAULT 'cabinet-inter' CHECK(font_pair IN ('cabinet-inter','clash-satoshi','general-sans','space-dm','epilogue-karla')),
      logo_url TEXT,
      success_message TEXT NOT NULL DEFAULT 'You are on the list! Share your unique link to move up.',
      remove_branding INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      total_signups INTEGER NOT NULL DEFAULT 0,
      total_views INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`, args: [] },

    // Signups
    { sql: `CREATE TABLE IF NOT EXISTS signups (
      id TEXT PRIMARY KEY,
      page_id TEXT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
      email TEXT NOT NULL,
      referral_code TEXT UNIQUE NOT NULL,
      referred_by TEXT,
      referral_count INTEGER NOT NULL DEFAULT 0,
      position INTEGER NOT NULL,
      ip_address TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(page_id, email)
    )`, args: [] },

    // Analytics
    { sql: `CREATE TABLE IF NOT EXISTS page_analytics (
      id TEXT PRIMARY KEY,
      page_id TEXT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
      date TEXT NOT NULL,
      views INTEGER NOT NULL DEFAULT 0,
      signups INTEGER NOT NULL DEFAULT 0,
      referrals INTEGER NOT NULL DEFAULT 0,
      UNIQUE(page_id, date)
    )`, args: [] },

    // Indexes
    { sql: `CREATE INDEX IF NOT EXISTS idx_signups_page ON signups(page_id)`, args: [] },
    { sql: `CREATE INDEX IF NOT EXISTS idx_signups_ref_code ON signups(referral_code)`, args: [] },
    { sql: `CREATE INDEX IF NOT EXISTS idx_signups_referred_by ON signups(referred_by)`, args: [] },
    { sql: `CREATE INDEX IF NOT EXISTS idx_analytics_page_date ON page_analytics(page_id, date)`, args: [] },
  ], 'write');
}
