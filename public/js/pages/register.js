// This module is kept for reference but is not actively used.
// All page rendering is handled inline by app.js.
import { api } from '../api.js';

export default {
  render() {
    return `
      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-logo"><span style="font-size:36px">⚡</span></div>
          <h1 class="auth-title">Create your account</h1>
          <p class="auth-subtitle">Start building viral waitlists in 60 seconds</p>
          <form id="registerForm">
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" id="regEmail" placeholder="you@example.com" required />
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="form-input" id="regPassword" placeholder="Min 8 characters" required minlength="8" />
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:12px">Create Account</button>
          </form>
          <p style="text-align:center;margin-top:20px;font-size:14px;color:var(--text-secondary)">
            Already have an account? <a href="#/login">Sign in</a>
          </p>
        </div>
      </div>
    `;
  },
};
