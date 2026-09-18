/**
 * SEHAT KENDRA — Client-Side Hash Router
 *
 * Routes are registered with:
 *   router.register('/path', renderFn, { layout: 'public'|'patient'|'admin' })
 *
 * Navigate with:
 *   router.navigate('/patient-portal')
 *   or: window.location.hash = '#/patient-portal'
 */

const routes = new Map();
let _current = null;

/**
 * @typedef {'public'|'patient'|'admin'} Layout
 *
 * @param {string}   path       - e.g. '/' or '/patient-portal'
 * @param {Function} renderFn   - async () => HTMLElement | string
 * @param {{ layout?: Layout, title?: string }} [opts]
 */
export function register(path, renderFn, opts = {}) {
  routes.set(path, { renderFn, layout: opts.layout ?? 'public', title: opts.title ?? 'SEHAT KENDRA' });
}

/**
 * Navigate to a route path.
 * @param {string} path
 * @param {{ replace?: boolean }} [opts]
 */
export function navigate(path, opts = {}) {
  const hash = '#' + path;
  if (opts.replace) {
    history.replaceState(null, '', hash);
  } else {
    history.pushState(null, '', hash);
  }
  _resolve();
}

/** Get current route path */
export function currentPath() {
  return _current;
}

/** Bootstrap the router (call once on DOMContentLoaded) */
export function init() {
  window.addEventListener('popstate', _resolve);
  window.addEventListener('hashchange', _resolve);

  // Intercept data-path anchor clicks (from Stitch screens)
  document.addEventListener('click', e => {
    const anchor = e.target.closest('[data-path], [data-route]');
    if (!anchor) return;
    e.preventDefault();
    const path = anchor.getAttribute('data-route') || _dataPathToRoute(anchor.getAttribute('data-path'));
    if (path) navigate(path);
  });

  _resolve();
}

/** Map legacy Stitch data-path values → router paths */
function _dataPathToRoute(dataPath) {
  const map = {
    'home':               '/',
    'patient-portal':     '/patient-portal',
    'prescriptions':      '/prescriptions',
    'ayurveda-care':      '/ayurveda-care',
    'verify-abha':        '/verify-abha',
    'hospital-admin':     '/hospital-admin',
    'staff-portal':       '/hospital-admin',
    'citizen-login':      '/patient-portal',
    'esanjeevani':        '/esanjeevani',
    'appointments':       '/appointments',
    'diagnostics':        '/diagnostics',
    'clinician-review':   '/clinician-review',
    'telemedicine-intake':'/esanjeevani',
    'help-desk':          '/help-desk',
  };
  return map[dataPath] ?? '/';
}

async function _resolve() {
  const hash  = window.location.hash;
  const path  = hash.startsWith('#') ? hash.slice(1) : '/';
  const clean = path.split('?')[0] || '/';

  const route = routes.get(clean) ?? routes.get('*');
  if (!route) {
    console.warn('[Router] No route for:', clean);
    return;
  }

  _current = clean;
  document.title = route.title + ' — SEHAT KENDRA';

  // Switch layout
  _applyLayout(route.layout);

  // Render into view container
  const container = document.getElementById('app-view');
  if (!container) return;

  container.classList.add('animate-fade-in');
  container.innerHTML = `<div class="page-loading">
    <div class="page-loading__spinner"></div>
    <span class="t-label-md" style="color:var(--color-on-surface-variant)">Loading…</span>
  </div>`;

  try {
    const content = await route.renderFn();
    if (typeof content === 'string') {
      container.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      container.innerHTML = '';
      container.appendChild(content);
    }
  } catch (err) {
    console.error('[Router] Render error:', err);
    container.innerHTML = `<div class="page-loading"><span style="color:var(--color-error)">⚠ Failed to load screen.</span></div>`;
  }

  // Re-apply i18n to newly rendered content
  window.dispatchEvent(new CustomEvent('sk:route-changed', { detail: { path: clean, layout: route.layout } }));

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Update active nav links
  document.querySelectorAll('[data-nav-path]').forEach(el => {
    const match = el.getAttribute('data-nav-path') === clean;
    el.classList.toggle('is-active', match);
    el.setAttribute('aria-current', match ? 'page' : 'false');
  });
}

function _applyLayout(layout) {
  const shell  = document.getElementById('app-shell');
  if (!shell) return;

  // Remove previous layout classes
  shell.className = shell.className.replace(/layout-\w+/g, '').trim();
  shell.classList.add('app-shell', `layout-${layout}`);

  // Show/hide sidebar wrapper
  const sidebarWrap = document.getElementById('sidebar-wrap');
  if (sidebarWrap) {
    sidebarWrap.hidden = layout === 'public';
  }

  // Adjust content margin
  const contentWrap = document.getElementById('content-wrap');
  if (contentWrap) {
    if (layout === 'public') {
      contentWrap.style.marginLeft = '0';
    }
  }
}
