// This module is kept for reference but is not actively used.
// All page rendering is handled inline by app.js.
import { api } from '../api.js';

export default {
  render() {
    return `
      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-logo"><span style="font-size:36px">⚡</span></div>
          <h1 class="auth-title">Welcome back</h1>
          <p class="auth-subtitle">Sign in to your WaitlistWizard account</p>
          <form id="loginForm">
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" id="loginEmail" placeholder="you@example.com" required />
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="form-input" id="loginPassword" placeholder="••••••••" required />
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:12px">Sign In</button>
          </form>
          <p style="text-align:center;margin-top:20px;font-size:14px;color:var(--text-secondary)">
            No account? <a href="#/register">Create one free</a>
          </p>
        </div>
      </div>
    `;
  },
};
