/**
 * SPA Hash Router with render()/afterRender() pattern,
 * nested route params, and 404 fallback.
 */
const routes = {};
let notFoundHandler = null;

const router = {
  /**
   * Register a route handler.
   * @param {string} path — first segment of the hash (e.g. 'dashboard', 'page', 'signups')
   * @param {object|function} handler — either a function or { render, afterRender }
   */
  on(path, handler) {
    routes[path] = handler;
  },

  /** Set a handler for unmatched routes */
  notFound(handler) {
    notFoundHandler = handler;
  },

  /** Navigate to a hash route */
  navigate(path) {
    window.location.hash = '#/' + path;
  },

  /** Get the current route path segment (first part) */
  currentRoute() {
    const hash = window.location.hash.slice(2) || '';
    return hash.split('/')[0];
  },

  /** Get route params (everything after first segment, split by /) */
  getParams() {
    const hash = window.location.hash.slice(2) || '';
    const parts = hash.split('/');
    return parts.slice(1);
  },

  /** Start listening for hash changes */
  start() {
    const handleRoute = async () => {
      const hash = window.location.hash.slice(2) || 'login';
      const routeName = hash.split('/')[0];
      const handler = routes[routeName];

      if (!handler) {
        if (notFoundHandler) {
          notFoundHandler();
        } else {
          router.navigate('login');
        }
        return;
      }

      try {
        if (typeof handler === 'function') {
          await handler();
        } else if (handler.render) {
          const app = document.getElementById('app');
          const mainEl = app.querySelector('.main-content') || app;
          mainEl.innerHTML = handler.render();
          if (handler.afterRender) {
            await handler.afterRender();
          }
        }
      } catch (err) {
        console.error(`Route "${routeName}" error:`, err);
      }
    };

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  },
};

export { router };
