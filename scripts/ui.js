// Theme toggling and initialization
// Applies [data-theme] to <html> and persists selection to localStorage

const THEME_KEY = 'clp.theme';

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (_) {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (_) {
    // ignore
  }
}

function getPreferredTheme() {
  // Prefer stored; fall back to OS; default to light
  const stored = getStoredTheme();
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  updateToggleLabel(theme);
}

function updateToggleLabel(theme) {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const next = theme === 'dark' ? 'Light' : 'Dark';
  btn.setAttribute('aria-pressed', theme === 'dark');
  btn.textContent = `Toggle ${next} Mode`;
  btn.title = `Switch to ${next} mode`;
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  setStoredTheme(next);
}

function ensureToggleButtonListener() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  // Avoid duplicate listeners
  btn.removeEventListener('click', toggleTheme);
  btn.addEventListener('click', toggleTheme);
}

function initTheme() {
  const theme = getPreferredTheme();
  applyTheme(theme);
  ensureToggleButtonListener();
  // React to OS changes only if user hasn't stored preference yet
  if (!getStoredTheme() && window.matchMedia) {
    try {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', (e) => {
        const t = e.matches ? 'dark' : 'light';
        applyTheme(t);
      });
    } catch (_) {
      // older browsers
    }
  }
}

// Initialize after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme, { once: true });
} else {
  initTheme();
}

export { toggleTheme, applyTheme };

