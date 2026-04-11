import { router } from './router.js';
import { api } from './api.js';

/* ─── SVG Icons ─────────────────────────────────────── */
const icons = {
  dashboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  pages: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  signups: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  analytics: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  billing: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  logout: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
};

/* ─── State ──────────────────────────────────────────── */
let currentUser = null;

/* ─── Auth helpers ───────────────────────────────────── */
async function initAuth() {
  const token = localStorage.getItem('token');
  const hash = window.location.hash;
  const pathname = window.location.pathname;
  const publicRoutes = ['', '#/', '#/login', '#/register'];

  // Redirect /login or /register (server paths) to hash routes
  if (pathname === '/login' || pathname === '/register') {
    window.history.replaceState(null, '', `/#${pathname}`);
  }

  if (!token) {
    if (!publicRoutes.includes(hash)) window.location.hash = '#/login';
    return;
  }

  try {
    const res = await api.get('/auth/me');
    currentUser = res.user;
    if (publicRoutes.includes(hash)) window.location.hash = '#/dashboard';
  } catch {
    localStorage.removeItem('token');
    window.location.hash = '#/login';
  }
}

function logout() {
  localStorage.removeItem('token');
  currentUser = null;
  window.location.hash = '#/login';
}

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

/* ─── Layout Shell ───────────────────────────────────── */
function renderLayout() {
  const route = router.currentRoute();
  const email = currentUser?.email || '';
  const plan = currentUser?.plan || 'free';
  const initial = email.charAt(0).toUpperCase();

  const navItems = [
    { id: 'dashboard', icon: icons.dashboard, label: 'Dashboard', route: 'dashboard' },
    { id: 'billing', icon: icons.billing, label: 'Billing', route: 'billing' },
  ];

  const sidebarNav = navItems.map(n =>
    `<a href="#/${n.route}" class="nav-item ${route === n.route ? 'active' : ''}" id="nav-${n.id}">
      <span class="nav-icon">${n.icon}</span> ${n.label}
    </a>`
  ).join('');

  const mobileNav = navItems.map(n =>
    `<a href="#/${n.route}" class="mobile-nav-item ${route === n.route ? 'active' : ''}">
      ${n.icon}<span>${n.label}</span>
    </a>`
  ).join('');

  return `
    <div class="layout">
      <!-- Desktop Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <a href="#/dashboard" class="sidebar-logo">
            <span class="logo-mark">⚡</span>
            <span>WaitlistWizard</span>
          </a>
        </div>
        <nav class="sidebar-nav">
          ${sidebarNav}
        </nav>
        <div class="sidebar-footer">
          <div class="user-info">
            <div class="user-avatar">${initial}</div>
            <div>
              <div class="user-email">${email}</div>
              <div style="font-size:11px;color:var(--text-muted);text-transform:capitalize">${plan} plan</div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" style="width:100%;margin-top:12px;justify-content:center" id="logoutBtn">
            ${icons.logout} Sign Out
          </button>
        </div>
      </aside>

      <!-- Mobile Header -->
      <div class="mobile-header">
        <a href="#/dashboard" class="sidebar-logo" style="font-size:15px;gap:8px">
          <span style="font-size:20px">⚡</span><span>WaitlistWizard</span>
        </a>
        <button class="btn btn-ghost btn-sm" id="mobileLogoutBtn">${icons.logout}</button>
      </div>

      <!-- Main Content Area -->
      <div class="main-content" id="mainContent">
        <div class="page-loading"><div class="spinner-lg"></div></div>
      </div>

      <!-- Mobile Bottom Nav -->
      <div class="mobile-nav">
        ${mobileNav}
      </div>
    </div>
  `;
}

/* ─── Route Guard ────────────────────────────────────── */
function requireAuth(renderFn) {
  return async () => {
    if (!isAuthenticated()) {
      router.navigate('login');
      return;
    }
    const app = document.getElementById('app');
    // Render layout shell if not already present
    if (!app.querySelector('.layout')) {
      app.innerHTML = renderLayout();
      // Attach logout events
      document.getElementById('logoutBtn')?.addEventListener('click', logout);
      document.getElementById('mobileLogoutBtn')?.addEventListener('click', logout);
    } else {
      // Update active nav state
      app.querySelectorAll('.nav-item').forEach(el => {
        el.classList.toggle('active', el.getAttribute('href') === `#/${router.currentRoute()}`);
      });
      app.querySelectorAll('.mobile-nav-item').forEach(el => {
        el.classList.toggle('active', el.getAttribute('href') === `#/${router.currentRoute()}`);
      });
    }
    await renderFn();
  };
}

/* ─── Toast Notifications ────────────────────────────── */
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.style.cssText = `
    position:fixed;top:24px;right:24px;z-index:9999;
    padding:14px 20px;border-radius:12px;font-size:14px;font-weight:500;
    animation:fadeUp .3s ease;max-width:400px;
    background:${type === 'success' ? 'rgba(52,211,153,0.15)' : 'rgba(248,113,113,0.15)'};
    border:1px solid ${type === 'success' ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.3)'};
    color:${type === 'success' ? '#34d399' : '#f87171'};
    backdrop-filter:blur(12px);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

/* ─── Login Page ─────────────────────────────────────── */
router.on('login', () => {
  if (isAuthenticated()) { router.navigate('dashboard'); return; }

  document.getElementById('app').innerHTML = `
    <div class="auth-split">
      <!-- Left: Form -->
      <section class="auth-split-left">
        <div class="auth-split-inner">
          <a href="/" class="auth-brand">
            <span style="font-size:28px;filter:drop-shadow(0 0 10px rgba(167,139,250,.35))">⚡</span>
            <span style="font-size:17px;font-weight:700;font-family:var(--font-heading);letter-spacing:-0.3px">WaitlistWizard</span>
          </a>

          <div style="margin-top:36px">
            <h1 class="auth-split-title ae a1">Welcome back <span style="font-weight:300">👋</span></h1>
            <p class="auth-split-sub ae a2">Sign in to your WaitlistWizard account</p>
          </div>

          <form id="loginForm" style="margin-top:28px">
            <div class="form-group ae a3">
              <label class="form-label">Email Address</label>
              <div class="glass-input-wrap">
                <input type="email" class="form-input glass-input" id="loginEmail"
                  placeholder="you@example.com" required autocomplete="email" />
              </div>
            </div>

            <div class="form-group ae a4">
              <label class="form-label">Password</label>
              <div class="glass-input-wrap" style="position:relative">
                <input type="password" class="form-input glass-input" id="loginPassword"
                  placeholder="••••••••" required autocomplete="current-password"
                  style="padding-right:48px" />
                <button type="button" id="loginPwToggle" class="pw-toggle" tabindex="-1"
                  aria-label="Toggle password">
                  <svg id="loginEyeIcon" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="ae a5" style="display:flex;justify-content:flex-end;margin-bottom:20px">
              <a href="/legal/contact" style="font-size:13px;color:var(--accent)">Forgot password?</a>
            </div>

            <div id="loginError" class="alert alert-danger ae a5" style="display:none;margin-bottom:16px"></div>

            <button type="submit" class="btn btn-primary ae a6"
              style="width:100%;justify-content:center;padding:14px;font-size:15px" id="loginBtn">
              Sign In
            </button>
          </form>

          <p class="ae a7" style="text-align:center;margin-top:24px;font-size:14px;color:var(--text-secondary)">
            No account? <a href="#/register" style="color:var(--accent);font-weight:500">Create one free →</a>
          </p>

          <div class="auth-footer ae a8">
            <a href="/legal/privacy">Privacy</a>
            <span>·</span>
            <a href="/legal/terms">Terms</a>
          </div>
        </div>
      </section>

      <!-- Right: Hero + Testimonials -->
      <section class="auth-split-right ae-right">
        <div class="auth-hero-img" style="background-image:url('https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=1400&q=80')"></div>
        <div class="auth-testimonials">
          <div class="auth-tcard at1">
            <img src="https://randomuser.me/api/portraits/women/57.jpg" class="auth-tavatar" alt="" />
            <div>
              <div style="font-size:13px;font-weight:600;color:#fff">Sarah Chen</div>
              <div style="font-size:12px;color:rgba(255,255,255,.4);margin-bottom:6px">@sarahdigital</div>
              <div style="font-size:13px;color:rgba(255,255,255,.75);line-height:1.5">
                Amazing platform — live in under 60 seconds.
              </div>
            </div>
          </div>
          <div class="auth-tcard at2">
            <img src="https://randomuser.me/api/portraits/men/64.jpg" class="auth-tavatar" alt="" />
            <div>
              <div style="font-size:13px;font-weight:600;color:#fff">Marcus Johnson</div>
              <div style="font-size:12px;color:rgba(255,255,255,.4);margin-bottom:6px">@marcustech</div>
              <div style="font-size:13px;color:rgba(255,255,255,.75);line-height:1.5">
                The referral engine is a game-changer.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Password toggle
  document.getElementById('loginPwToggle').addEventListener('click', () => {
    const inp = document.getElementById('loginPassword');
    const icon = document.getElementById('loginEyeIcon');
    const show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    icon.innerHTML = show
      ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>'
      : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  });

  document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const btn = document.getElementById('loginBtn');
    const errEl = document.getElementById('loginError');
    errEl.style.display = 'none';
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Signing in…';
    try {
      const res = await api.post('/auth/login', {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value,
      });
      localStorage.setItem('token', res.token);
      currentUser = res.user;
      router.navigate('dashboard');
    } catch (err) {
      errEl.textContent = err.message || 'Login failed';
      errEl.style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'Sign In';
    }
  };
});

/* ─── Register Page ──────────────────────────────────── */
router.on('register', () => {
  if (isAuthenticated()) { router.navigate('dashboard'); return; }

  document.getElementById('app').innerHTML = `
    <div class="auth-split">
      <!-- Left: Form -->
      <section class="auth-split-left">
        <div class="auth-split-inner">
          <a href="/" class="auth-brand">
            <span style="font-size:28px;filter:drop-shadow(0 0 10px rgba(167,139,250,.35))">⚡</span>
            <span style="font-size:17px;font-weight:700;font-family:var(--font-heading);letter-spacing:-0.3px">WaitlistWizard</span>
          </a>

          <div style="margin-top:36px">
            <h1 class="auth-split-title ae a1">Start for free <span style="font-weight:300">🚀</span></h1>
            <p class="auth-split-sub ae a2">Build viral waitlists in 60 seconds. No credit card needed.</p>
          </div>

          <div class="feature-pills ae a2" style="margin-top:16px;justify-content:flex-start">
            <span class="pill">Free forever</span>
            <span class="pill">No credit card</span>
            <span class="pill">1 page included</span>
          </div>

          <form id="registerForm" style="margin-top:28px">
            <div class="form-group ae a3">
              <label class="form-label">Email Address</label>
              <div class="glass-input-wrap">
                <input type="email" class="form-input glass-input" id="regEmail"
                  placeholder="you@example.com" required autocomplete="email" />
              </div>
            </div>

            <div class="form-group ae a4">
              <label class="form-label">Password</label>
              <div class="glass-input-wrap" style="position:relative">
                <input type="password" class="form-input glass-input" id="regPassword"
                  placeholder="Min 8 characters" required minlength="8" autocomplete="new-password"
                  style="padding-right:48px" />
                <button type="button" id="regPwToggle" class="pw-toggle" tabindex="-1"
                  aria-label="Toggle password">
                  <svg id="regEyeIcon" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <div id="strengthBar" style="height:3px;border-radius:2px;margin-top:8px;background:var(--border);overflow:hidden">
                <div id="strengthFill" style="height:100%;width:0%;border-radius:2px;transition:width .3s,background .3s"></div>
              </div>
              <div id="strengthText" class="form-hint"></div>
            </div>

            <div id="regError" class="alert alert-danger ae a5" style="display:none;margin-bottom:16px"></div>

            <button type="submit" class="btn btn-primary ae a5"
              style="width:100%;justify-content:center;padding:14px;font-size:15px" id="regBtn">
              Create Free Account
            </button>
          </form>

          <p class="ae a6" style="text-align:center;margin-top:24px;font-size:14px;color:var(--text-secondary)">
            Already have an account? <a href="#/login" style="color:var(--accent);font-weight:500">Sign in →</a>
          </p>

          <div class="auth-footer ae a7">
            <a href="/legal/privacy">Privacy</a>
            <span>·</span>
            <a href="/legal/terms">Terms</a>
          </div>
        </div>
      </section>

      <!-- Right: Hero + Testimonials -->
      <section class="auth-split-right ae-right">
        <div class="auth-hero-img" style="background-image:url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1400&q=80')"></div>
        <div class="auth-testimonials">
          <div class="auth-tcard at1">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" class="auth-tavatar" alt="" />
            <div>
              <div style="font-size:13px;font-weight:600;color:#fff">David Martinez</div>
              <div style="font-size:12px;color:rgba(255,255,255,.4);margin-bottom:6px">@davidcreates</div>
              <div style="font-size:13px;color:rgba(255,255,255,.75);line-height:1.5">
                3x more signups within the first week.
              </div>
            </div>
          </div>
          <div class="auth-tcard at2">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" class="auth-tavatar" alt="" />
            <div>
              <div style="font-size:13px;font-weight:600;color:#fff">Priya Sharma</div>
              <div style="font-size:12px;color:rgba(255,255,255,.4);margin-bottom:6px">@priyabuilds</div>
              <div style="font-size:13px;color:rgba(255,255,255,.75);line-height:1.5">
                Set up in 60 seconds and collected 500 emails overnight.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Password strength indicator
  document.getElementById('regPassword').addEventListener('input', (e) => {
    const val = e.target.value;
    const fill = document.getElementById('strengthFill');
    const text = document.getElementById('strengthText');
    let score = 0;
    if (val.length >= 8) score++;
    if (val.length >= 12) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const levels = [
      { w: '0%', c: 'var(--border)', t: '' },
      { w: '20%', c: '#f87171', t: 'Weak' },
      { w: '40%', c: '#f59e0b', t: 'Fair' },
      { w: '60%', c: '#f59e0b', t: 'Good' },
      { w: '80%', c: '#34d399', t: 'Strong' },
      { w: '100%', c: '#34d399', t: 'Very strong' },
    ];
    const l = levels[score];
    fill.style.width = l.w;
    fill.style.background = l.c;
    text.textContent = l.t;
    text.style.color = l.c;
  });

  document.getElementById('registerForm').onsubmit = async (e) => {
    e.preventDefault();
    const btn = document.getElementById('regBtn');
    const errEl = document.getElementById('regError');
    errEl.style.display = 'none';
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Creating…';

    try {
      const res = await api.post('/auth/register', {
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
      });
      localStorage.setItem('token', res.token);
      currentUser = res.user;
      router.navigate('dashboard');
    } catch (err) {
      errEl.textContent = err.message || 'Registration failed';
      errEl.style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'Create Account';
    }
  };
});

/* ─── Dashboard ──────────────────────────────────────── */
router.on('dashboard', requireAuth(async () => {
  const main = document.getElementById('mainContent');
  main.innerHTML = '<div class="page-loading"><div class="spinner-lg"></div></div>';

  try {
    const res = await api.get('/pages');
    const pages = res.pages || [];
    const totalSignups = pages.reduce((s, p) => s + (p.total_signups || 0), 0);
    const totalViews = pages.reduce((s, p) => s + (p.total_views || 0), 0);
    const plan = currentUser?.plan || 'free';

    main.innerHTML = `
      <div class="page-wrapper">
        <div class="page-header">
          <div>
            <h1 class="page-title">Dashboard</h1>
            <p class="page-subtitle">Manage your waitlist pages</p>
          </div>
          <button class="btn btn-primary" id="createPageBtn">${icons.plus} Create Page</button>
        </div>

        <div class="stats-row" style="margin-bottom:24px">
          <div class="stat-card">
            <div style="font-size:28px;font-weight:700;color:var(--accent);font-family:var(--font-heading)">${pages.length}</div>
            <div style="font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-top:4px">Pages</div>
          </div>
          <div class="stat-card">
            <div style="font-size:28px;font-weight:700;color:var(--success);font-family:var(--font-heading)">${totalSignups.toLocaleString()}</div>
            <div style="font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-top:4px">Total Signups</div>
          </div>
          <div class="stat-card">
            <div style="font-size:28px;font-weight:700;color:var(--info);font-family:var(--font-heading)">${totalViews.toLocaleString()}</div>
            <div style="font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-top:4px">Total Views</div>
          </div>
          <div class="stat-card">
            <div style="font-size:28px;font-weight:700;color:var(--warning);font-family:var(--font-heading);text-transform:capitalize">${plan}</div>
            <div style="font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-top:4px">Plan</div>
          </div>
        </div>

        ${pages.length === 0 ? `
          <div class="card">
            <div class="empty-state">
              <div style="font-size:48px;margin-bottom:16px">🚀</div>
              <h2 class="empty-state-title">Create your first waitlist</h2>
              <p class="empty-state-desc">Build a stunning waitlist page with viral referral mechanics. It only takes 60 seconds.</p>
              <button class="btn btn-primary" id="emptyCreateBtn">${icons.plus} Create Page</button>
            </div>
          </div>
        ` : `
          <div class="pages-grid">
            ${pages.map(p => `
              <div class="page-card">
                <div class="page-card-header">
                  <div style="min-width:0">
                    <h3 class="page-card-title">${esc(p.name)}</h3>
                    <a href="/p/${p.slug}" target="_blank" class="page-card-slug">/p/${p.slug}</a>
                  </div>
                  <span class="badge ${p.is_active ? '' : 'badge-subtle'}">${p.is_active ? 'Active' : 'Inactive'}</span>
                </div>
                <div class="page-card-stats">
                  <div class="page-stat">
                    <span class="page-stat-value">${(p.total_signups || 0).toLocaleString()}</span>
                    <span class="page-stat-label">Signups</span>
                  </div>
                  <div class="page-stat">
                    <span class="page-stat-value">${(p.total_views || 0).toLocaleString()}</span>
                    <span class="page-stat-label">Views</span>
                  </div>
                  <div class="page-stat">
                    <span class="page-stat-value">${p.total_views > 0 ? ((p.total_signups / p.total_views) * 100).toFixed(1) + '%' : '—'}</span>
                    <span class="page-stat-label">Conv.</span>
                  </div>
                </div>
                <div class="page-card-actions">
                  <a href="#/page/${p.id}" class="btn btn-primary btn-sm">Edit</a>
                  <a href="#/signups/${p.id}" class="btn btn-secondary btn-sm">${icons.signups} Signups</a>
                  <a href="#/analytics/${p.id}" class="btn btn-secondary btn-sm">${icons.analytics} Analytics</a>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

    // Create page button handlers
    document.getElementById('createPageBtn')?.addEventListener('click', () => router.navigate('create'));
    document.getElementById('emptyCreateBtn')?.addEventListener('click', () => router.navigate('create'));

  } catch (err) {
    main.innerHTML = `<div class="page-wrapper"><div class="alert alert-danger">${esc(err.message)}</div></div>`;
  }
}));

/* ─── Create Page ────────────────────────────────────── */
router.on('create', requireAuth(async () => {
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <div class="page-wrapper" style="max-width:600px">
      <div class="page-header">
        <div>
          <h1 class="page-title">Create Waitlist Page</h1>
          <p class="page-subtitle">Set up your new waitlist in seconds</p>
        </div>
      </div>
      <div class="card" style="padding:24px">
        <form id="createForm">
          <div class="form-group">
            <label class="form-label">Page Name <span class="required">*</span></label>
            <input type="text" class="form-input" name="name" required placeholder="My Awesome Product" />
          </div>
          <div class="form-group">
            <label class="form-label">Headline</label>
            <input type="text" class="form-input" name="headline" placeholder="Something amazing is coming" />
          </div>
          <div class="form-group">
            <label class="form-label">Subheadline</label>
            <textarea class="form-input form-textarea" name="subheadline" placeholder="Be the first to know. Join the waitlist." rows="3"></textarea>
          </div>
          <div id="createError" class="alert alert-danger" style="display:none;margin-bottom:16px"></div>
          <div style="display:flex;gap:10px">
            <button type="submit" class="btn btn-primary" style="flex:1;justify-content:center" id="createBtn">${icons.plus} Create Page</button>
            <button type="button" class="btn btn-secondary" style="flex:1;justify-content:center" id="cancelBtn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('cancelBtn').addEventListener('click', () => router.navigate('dashboard'));
  document.getElementById('createForm').onsubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = document.getElementById('createBtn');
    const errEl = document.getElementById('createError');
    errEl.style.display = 'none';
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Creating…';

    try {
      await api.post('/pages', {
        name: form.name.value,
        headline: form.headline.value || undefined,
        subheadline: form.subheadline.value || undefined,
        slug: form.name.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      });
      showToast('Page created successfully!');
      router.navigate('dashboard');
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = 'block';
      btn.disabled = false;
      btn.innerHTML = `${icons.plus} Create Page`;
    }
  };
}));

/* ─── Page Builder (Edit) ────────────────────────────── */
router.on('page', requireAuth(async () => {
  const main = document.getElementById('mainContent');
  const pageId = window.location.hash.split('/')[2];
  if (!pageId) return router.navigate('dashboard');

  main.innerHTML = '<div class="page-loading"><div class="spinner-lg"></div></div>';

  try {
    const res = await api.get(`/pages/${pageId}`);
    const page = res.page;

    main.innerHTML = `
      <div class="builder-wrapper">
        <div class="builder-header">
          <div style="display:flex;align-items:center;gap:12px">
            <button class="btn btn-ghost btn-sm" id="backBtn">← Back</button>
            <h2 style="font-size:16px;font-weight:600;margin:0;font-family:var(--font-heading)">${esc(page.name)}</h2>
          </div>
          <div style="display:flex;gap:8px">
            <a href="/p/${page.slug}" target="_blank" class="btn btn-secondary btn-sm">View Live →</a>
            <button class="btn btn-primary btn-sm" id="saveBtn">Save Changes</button>
          </div>
        </div>

        <div class="builder-body">
          <div class="builder-form">
            <form id="pageForm">
              <!-- Content Section -->
              <div class="form-section">
                <div class="form-section-header" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'">
                  Content <span class="section-chevron">▾</span>
                </div>
                <div class="form-section-body">
                  <div class="form-group">
                    <label class="form-label">Page Name</label>
                    <input type="text" class="form-input" name="name" value="${esc(page.name)}" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Headline</label>
                    <input type="text" class="form-input" name="headline" value="${esc(page.headline || '')}" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Subheadline</label>
                    <textarea class="form-input form-textarea" name="subheadline" rows="3">${esc(page.subheadline || '')}</textarea>
                  </div>
                  <div class="form-group">
                    <label class="form-label">CTA Button Text</label>
                    <input type="text" class="form-input" name="cta_text" value="${esc(page.cta_text || '')}" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Success Message</label>
                    <textarea class="form-input form-textarea" name="success_message" rows="2">${esc(page.success_message || '')}</textarea>
                  </div>
                </div>
              </div>

              <!-- Design Section -->
              <div class="form-section">
                <div class="form-section-header" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'">
                  Design <span class="section-chevron">▾</span>
                </div>
                <div class="form-section-body">
                  <div class="form-group">
                    <label class="form-label">Background Style</label>
                    <select class="form-input form-select" name="bg_style">
                      <option value="gradient" ${page.bg_style === 'gradient' ? 'selected' : ''}>Gradient</option>
                      <option value="solid" ${page.bg_style === 'solid' ? 'selected' : ''}>Solid Color</option>
                      <option value="mesh" ${page.bg_style === 'mesh' ? 'selected' : ''}>Mesh Gradient</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Accent Color</label>
                    <input type="color" class="form-input" name="accent_color" value="${page.accent_color || '#a78bfa'}" style="height:44px;padding:4px;cursor:pointer" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Font Pair</label>
                    <select class="form-input form-select" name="font_pair">
                      <option value="cabinet-inter" ${page.font_pair === 'cabinet-inter' ? 'selected' : ''}>Sora + Inter</option>
                      <option value="clash-satoshi" ${page.font_pair === 'clash-satoshi' ? 'selected' : ''}>Outfit + DM Sans</option>
                      <option value="general-sans" ${page.font_pair === 'general-sans' ? 'selected' : ''}>Jakarta + Nunito</option>
                      <option value="space-dm" ${page.font_pair === 'space-dm' ? 'selected' : ''}>Space Grotesk + DM Sans</option>
                      <option value="epilogue-karla" ${page.font_pair === 'epilogue-karla' ? 'selected' : ''}>Epilogue + Karla</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Settings Section -->
              <div class="form-section">
                <div class="form-section-header" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'">
                  Settings <span class="section-chevron">▾</span>
                </div>
                <div class="form-section-body">
                  <div class="form-group" style="display:flex;align-items:center;justify-content:space-between">
                    <label class="form-label" style="margin:0">Remove Branding (Pro+)</label>
                    <label class="toggle-switch">
                      <input type="checkbox" name="remove_branding" ${page.remove_branding ? 'checked' : ''} />
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                  <div class="form-group" style="display:flex;align-items:center;justify-content:space-between">
                    <label class="form-label" style="margin:0">Page Active</label>
                    <label class="toggle-switch">
                      <input type="checkbox" name="is_active" ${page.is_active ? 'checked' : ''} />
                      <span class="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <!-- Preview Panel -->
          <div class="builder-preview">
            <div class="preview-header">
              <span class="preview-label">Live Preview</span>
              <button class="btn btn-ghost btn-sm" id="refreshPreview">↻ Refresh</button>
            </div>
            <div class="preview-frame">
              <iframe id="preview" src="/p/${page.slug}?preview=true" style="width:100%;height:100%;border:none;border-radius:12px"></iframe>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('backBtn').addEventListener('click', () => router.navigate('dashboard'));
    document.getElementById('refreshPreview').addEventListener('click', () => {
      document.getElementById('preview').src = `/p/${page.slug}?preview=true&t=${Date.now()}`;
    });

    document.getElementById('saveBtn').addEventListener('click', async () => {
      const form = document.getElementById('pageForm');
      const btn = document.getElementById('saveBtn');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Saving…';

      try {
        await api.put(`/pages/${pageId}`, {
          name: form.name.value,
          headline: form.headline.value,
          subheadline: form.subheadline.value,
          cta_text: form.cta_text.value,
          bg_style: form.bg_style.value,
          accent_color: form.accent_color.value,
          font_pair: form.font_pair.value,
          success_message: form.success_message.value,
          remove_branding: form.remove_branding.checked ? 1 : 0,
          is_active: form.is_active.checked ? 1 : 0,
        });

        showToast('Changes saved!');
        btn.innerHTML = '✓ Saved!';
        setTimeout(() => {
          btn.textContent = 'Save Changes';
          btn.disabled = false;
          document.getElementById('preview').src = `/p/${page.slug}?preview=true&t=${Date.now()}`;
        }, 1500);
      } catch (err) {
        showToast(err.message, 'error');
        btn.textContent = 'Save Changes';
        btn.disabled = false;
      }
    });

  } catch (err) {
    showToast(err.message, 'error');
    router.navigate('dashboard');
  }
}));

/* ─── Signups Management ─────────────────────────────── */
router.on('signups', requireAuth(async () => {
  const main = document.getElementById('mainContent');
  const pageId = window.location.hash.split('/')[2];
  if (!pageId) return router.navigate('dashboard');

  main.innerHTML = '<div class="page-loading"><div class="spinner-lg"></div></div>';

  try {
    const pageRes = await api.get(`/pages/${pageId}`);
    const signupsRes = await api.get(`/pages/${pageId}/signups`);
    const page = pageRes.page;
    const signups = signupsRes.signups || [];
    const total = signupsRes.total || 0;

    main.innerHTML = `
      <div class="page-wrapper">
        <div class="page-header">
          <div>
            <button class="btn btn-ghost btn-sm" id="backBtn" style="margin-bottom:8px">← Back to Dashboard</button>
            <h1 class="page-title">Signups: ${esc(page.name)}</h1>
            <p class="page-subtitle">${total.toLocaleString()} total signups</p>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-secondary btn-sm" id="exportBtn">↓ Export CSV</button>
          </div>
        </div>

        <div class="table-card">
          ${signups.length === 0 ? `
            <div class="empty-state" style="padding:60px 24px">
              <div style="font-size:36px;margin-bottom:12px">📬</div>
              <h3 class="empty-state-title">No signups yet</h3>
              <p class="empty-state-desc">Share your waitlist page to start collecting signups!</p>
              <a href="/p/${page.slug}" target="_blank" class="btn btn-primary btn-sm" style="margin-top:8px">View Page →</a>
            </div>
          ` : `
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Referrals</th>
                  <th>Referred By</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                ${signups.map((s, i) => `
                  <tr>
                    <td>${s.position || i + 1}</td>
                    <td style="color:var(--text-primary)">${esc(s.email)}</td>
                    <td><span class="badge">${s.referral_count || 0}</span></td>
                    <td style="font-family:var(--font-mono);font-size:12px">${s.referred_by || '—'}</td>
                    <td style="font-size:13px">${new Date(s.created_at).toLocaleDateString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `}
        </div>

        ${signupsRes.pages > 1 ? `
          <div class="pagination">
            <span class="pag-info">Page ${signupsRes.page} of ${signupsRes.pages}</span>
            <div class="pag-buttons">
              ${Array.from({ length: signupsRes.pages }, (_, i) =>
                `<button class="pag-btn ${i + 1 === signupsRes.page ? 'active' : ''}" data-page="${i + 1}">${i + 1}</button>`
              ).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    document.getElementById('backBtn').addEventListener('click', () => router.navigate('dashboard'));

    // Export CSV via server endpoint
    document.getElementById('exportBtn').addEventListener('click', () => {
      const token = localStorage.getItem('token');
      const link = document.createElement('a');
      link.href = `/api/pages/${pageId}/signups/csv`;
      link.download = `${page.slug}-signups.csv`;
      // Use fetch with auth header for download
      fetch(`/api/pages/${pageId}/signups/csv`, {
        headers: { 'Authorization': `Bearer ${token}` },
      }).then(r => r.blob()).then(blob => {
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }).catch(() => showToast('Export failed', 'error'));
    });

    // Pagination
    main.querySelectorAll('.pag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Reload with page number — for simplicity, reload entire route
        // In production you'd fetch just the new page of data
        router.navigate(`signups/${pageId}`);
      });
    });

  } catch (err) {
    main.innerHTML = `<div class="page-wrapper"><div class="alert alert-danger">${esc(err.message)}</div></div>`;
  }
}));

/* ─── Analytics ──────────────────────────────────────── */
router.on('analytics', requireAuth(async () => {
  const main = document.getElementById('mainContent');
  const pageId = window.location.hash.split('/')[2];
  if (!pageId) return router.navigate('dashboard');

  main.innerHTML = '<div class="page-loading"><div class="spinner-lg"></div></div>';

  try {
    const pageRes = await api.get(`/pages/${pageId}`);
    const analyticsRes = await api.get(`/pages/${pageId}/analytics`);
    const page = pageRes.page;
    const { daily, totals } = analyticsRes;

    // Build SVG chart
    const chartHeight = 200;
    const chartWidth = 600;
    let chartSvg = '';
    if (daily.length > 1) {
      const maxVal = Math.max(...daily.map(d => d.views || 0), 1);
      const stepX = chartWidth / (daily.length - 1);
      const points = daily.map((d, i) => {
        const x = i * stepX;
        const y = chartHeight - ((d.views || 0) / maxVal) * (chartHeight - 20);
        return `${x},${y}`;
      });
      const areaPoints = `0,${chartHeight} ${points.join(' ')} ${chartWidth},${chartHeight}`;
      chartSvg = `
        <svg viewBox="0 0 ${chartWidth} ${chartHeight}" style="width:100%;height:220px" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <polygon points="${areaPoints}" fill="url(#chartGrad)"/>
          <polyline points="${points.join(' ')}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    } else {
      chartSvg = '<div style="text-align:center;padding:40px;color:var(--text-muted);font-size:14px">Not enough data to display chart</div>';
    }

    main.innerHTML = `
      <div class="page-wrapper">
        <div class="page-header">
          <div>
            <button class="btn btn-ghost btn-sm" id="backBtn" style="margin-bottom:8px">← Back to Dashboard</button>
            <h1 class="page-title">Analytics: ${esc(page.name)}</h1>
            <p class="page-subtitle">Last 30 days performance</p>
          </div>
        </div>

        <div class="stats-row" style="margin-bottom:24px">
          <div class="stat-card">
            <div style="font-size:28px;font-weight:700;color:var(--info);font-family:var(--font-heading)">${(totals.views || 0).toLocaleString()}</div>
            <div style="font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-top:4px">Views</div>
          </div>
          <div class="stat-card">
            <div style="font-size:28px;font-weight:700;color:var(--success);font-family:var(--font-heading)">${(totals.signups || 0).toLocaleString()}</div>
            <div style="font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-top:4px">Signups</div>
          </div>
          <div class="stat-card">
            <div style="font-size:28px;font-weight:700;color:var(--accent);font-family:var(--font-heading)">${(totals.referrals || 0).toLocaleString()}</div>
            <div style="font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-top:4px">Referrals</div>
          </div>
          <div class="stat-card">
            <div style="font-size:28px;font-weight:700;color:var(--warning);font-family:var(--font-heading)">${totals.views > 0 ? ((totals.signups / totals.views) * 100).toFixed(1) + '%' : '—'}</div>
            <div style="font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-top:4px">Conversion</div>
          </div>
        </div>

        <div class="card" style="padding:24px">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:16px;color:var(--text-secondary)">Page Views</h3>
          ${chartSvg}
        </div>
      </div>
    `;

    document.getElementById('backBtn').addEventListener('click', () => router.navigate('dashboard'));

  } catch (err) {
    main.innerHTML = `<div class="page-wrapper"><div class="alert alert-danger">${esc(err.message)}</div></div>`;
  }
}));

/* ─── Billing ────────────────────────────────────────── */
router.on('billing', requireAuth(async () => {
  const main = document.getElementById('mainContent');
  const plan = currentUser?.plan || 'free';

  const checkIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

  main.innerHTML = `
    <div class="page-wrapper">
      <div class="page-header">
        <div>
          <h1 class="page-title">Billing & Plans</h1>
          <p class="page-subtitle">You're currently on the <strong style="color:var(--accent);text-transform:capitalize">${plan}</strong> plan</p>
        </div>
      </div>

      <div class="plans-grid">
        <!-- Free -->
        <div class="plan-card ${plan === 'free' ? 'plan-card-current' : ''}">
          ${plan === 'free' ? '<div class="plan-badge" style="background:var(--success);color:#fff">Current Plan</div>' : ''}
          <div class="plan-header">
            <h3 style="font-size:20px;font-weight:700">Free</h3>
            <p style="color:var(--text-muted);font-size:13px;margin-top:4px">Perfect for testing</p>
            <div style="margin-top:16px"><span style="font-size:36px;font-weight:800;font-family:var(--font-heading)">$0</span><span style="color:var(--text-muted);font-size:14px"> /forever</span></div>
          </div>
          <ul class="plan-features">
            <li>${checkIcon} 1 waitlist page</li>
            <li>${checkIcon} Up to 100 signups</li>
            <li>${checkIcon} Basic analytics</li>
            <li>${checkIcon} Email notifications</li>
          </ul>
          ${plan === 'free' ? '<button class="btn btn-secondary" style="width:100%;justify-content:center" disabled>Current Plan</button>' : ''}
        </div>

        <!-- Pro -->
        <div class="plan-card plan-card-highlight ${plan === 'pro' ? 'plan-card-current' : ''}">
          <div class="plan-badge" style="background:linear-gradient(135deg,var(--accent),#7c5cfc);color:#fff">${plan === 'pro' ? 'Current Plan' : 'Most Popular'}</div>
          <div class="plan-header">
            <h3 style="font-size:20px;font-weight:700">Pro</h3>
            <p style="color:var(--text-muted);font-size:13px;margin-top:4px">For serious launches</p>
            <div style="margin-top:16px"><span style="font-size:36px;font-weight:800;font-family:var(--font-heading)">$19</span><span style="color:var(--text-muted);font-size:14px"> /month</span></div>
          </div>
          <ul class="plan-features">
            <li>${checkIcon} 5 waitlist pages</li>
            <li>${checkIcon} Unlimited signups</li>
            <li>${checkIcon} Advanced analytics</li>
            <li>${checkIcon} Remove branding</li>
            <li>${checkIcon} CSV export</li>
          </ul>
          ${plan === 'pro'
            ? '<button class="btn btn-secondary" style="width:100%;justify-content:center" disabled>Current Plan</button>'
            : '<button class="btn btn-primary" style="width:100%;justify-content:center" data-plan="pro" id="checkoutPro">Upgrade to Pro</button>'}
        </div>

        <!-- Business -->
        <div class="plan-card ${plan === 'business' ? 'plan-card-current' : ''}">
          ${plan === 'business' ? '<div class="plan-badge" style="background:var(--success);color:#fff">Current Plan</div>' : ''}
          <div class="plan-header">
            <h3 style="font-size:20px;font-weight:700">Business</h3>
            <p style="color:var(--text-muted);font-size:13px;margin-top:4px">For teams & agencies</p>
            <div style="margin-top:16px"><span style="font-size:36px;font-weight:800;font-family:var(--font-heading)">$49</span><span style="color:var(--text-muted);font-size:14px"> /month</span></div>
          </div>
          <ul class="plan-features">
            <li>${checkIcon} 20 waitlist pages</li>
            <li>${checkIcon} Unlimited signups</li>
            <li>${checkIcon} Priority support</li>
            <li>${checkIcon} API access</li>
            <li>${checkIcon} White-label option</li>
            <li>${checkIcon} Team collaboration</li>
          </ul>
          ${plan === 'business'
            ? '<button class="btn btn-secondary" style="width:100%;justify-content:center" disabled>Current Plan</button>'
            : '<button class="btn btn-primary" style="width:100%;justify-content:center" data-plan="business" id="checkoutBiz">Upgrade to Business</button>'}
        </div>
      </div>
    </div>
  `;

  // Checkout handlers
  async function handleCheckout(planName) {
    try {
      const res = await api.post('/billing/checkout', { plan: planName });
      if (res.checkout_url) {
        window.open(res.checkout_url, '_blank');
      } else {
        showToast('Could not create checkout session', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  document.getElementById('checkoutPro')?.addEventListener('click', () => handleCheckout('pro'));
  document.getElementById('checkoutBiz')?.addEventListener('click', () => handleCheckout('business'));
}));

/* ─── 404 Page ───────────────────────────────────────── */
router.notFound(() => {
  document.getElementById('app').innerHTML = `
    <div class="auth-wrapper">
      <div class="auth-card" style="text-align:center">
        <div style="font-size:64px;margin-bottom:16px">🔍</div>
        <h1 class="auth-title">Page Not Found</h1>
        <p class="auth-subtitle">The page you're looking for doesn't exist.</p>
        <a href="#/dashboard" class="btn btn-primary" style="margin-top:16px">Go to Dashboard</a>
      </div>
    </div>
  `;
});

/* ─── Utility ────────────────────────────────────────── */
function esc(s) {
  const d = document.createElement('div');
  d.textContent = String(s || '');
  return d.innerHTML;
}

/* ─── Initialize ─────────────────────────────────────── */
async function init() {
  await initAuth();
  router.start();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
