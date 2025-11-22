# Campus Life Planner

Vanilla HTML, CSS, and JavaScript app to manage tasks/events, durations, and tags. Mobile-first, accessible, and persisted to localStorage.

## Features
- Dashboard stats + trend chart
- Add/Edit form with regex validation and aria-live feedback
- Task list: table (desktop) + cards (mobile), edit/delete, sorting
- Live regex search with safe compilation and <mark> highlights
- Settings: units (minutes/hours), custom tags, conversion rate
- Import/Export JSON (schema-validated planned)
- Accessibility: semantic structure, labels, skip link, focus styles, aria-live
- Theme toggle (light/dark) persisted to localStorage

## Regex Catalog
- Title: `^\S(?:.*\S)?$` — no leading/trailing whitespace
- Due Date: `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$` — YYYY-MM-DD
- Duration: `^(0|[1-9]\d*)(\.\d{1,2})?$` — non-negative, up to 2 decimals
- Tag: `^[A-Za-z]+(?:[ -][A-Za-z]+)*$` — letters, spaces, hyphens
- Advanced (title): `\b(\w+)\s+\1\b` — duplicate adjacent words

## Keyboard Map
- Tab/Shift+Tab: Navigate interactive elements
- Enter: Submit forms
- Esc: Dismiss native dialogs
- Access keys are intentionally not bound to avoid conflicts

## A11y Notes
- aria-live regions for form errors, feedback, and cap status
- Skip link to `#main`
- Visible focus outlines across controls
- Color contrast meets WCAG AA in light and dark schemes

## Tests
Open `tests.html` in a browser to run basic regex checks. Import/export tests coming with schema validation task.

## Demo
- Video (2–3 min):(https://youtu.be/mQFrmVsXJ24)
- GitHub Pages:(https://github.com/Liata-Ornella/Summative)

## Development
Open `index.html` with a local server or directly in a browser. No build required.

## Project Structure
```
/ (root)
├─ index.html           # Main app (dashboard, tasks, search)
├─ settings.html        # Units/tags/settings page
├─ about.html           # About/help page
├─ tests.html           # Simple in-browser tests (regex & basic flows)
├─ seed.json            # Example data you can import
├─ scripts/
│  ├─ state.js          # App state, derived selectors, event bus
│  ├─ storage.js        # LocalStorage I/O, import/export helpers
│  ├─ validators.js     # All regex + field validation utilities
│  ├─ search.js         # Live search + <mark> highlighting
│  ├─ chart.js          # Stats aggregation + trend chart rendering
│  └─ ui.js             # UI helpers (theme toggle + initialization)
├─ styles/
│  └─ main.css          # Light/dark theme, layout, components
└─ README.md
```

## Pages
- `index.html`: Dashboard with stats, weekly cap, and trend chart.
- `tasks.html`: Full tasks UI (add/edit form, search/sort, list with table/cards).
- `settings.html`: Configure units (minutes/hours), custom tags, and conversion rate.
- `about.html`: Context, keyboard map, and accessibility notes.
- `tests.html`: Open in a browser to run basic checks.

## Running Locally
No build step required. Any static server will work.
- Option A: Open `index.html` directly in your browser.
- Option B: Serve the folder, e.g. with VS Code Live Server or `python -m http.server`.

Example with Python (port 5500):

```bash
python -m http.server 5500
# then open http://127.0.0.1:5500/
```

## Usage
1) Add a task via the form on `index.html`.
2) Use live search to filter; matches are highlighted with `<mark>`.
3) Toggle sort in the table header (desktop) or use list controls (mobile).
4) Open Settings to switch time units, manage tags, or change conversion rate.
5) Export your data to JSON or import from `seed.json` to try things out.

## Data & Persistence
- Data is stored in `localStorage` under a dedicated key (see `scripts/storage.js`).
- Import/Export transfers the entire dataset as JSON.
- Planned: JSON schema validation to harden import safety.

## Scripts Overview
- `scripts/state.js`: Centralized state and derived views for stats and UI.
- `scripts/storage.js`: Persistence layer with get/set, import/export.
- `scripts/validators.js`: Regex-powered validation used by forms and search.
- `scripts/search.js`: Compiles safe regex, performs filtering, adds `<mark>`.
- `scripts/chart.js`: Aggregates task durations and renders the trend chart.
- `scripts/ui.js`: Theme toggle and initialization helpers.

## Styles
- `styles/main.css` implements a responsive, accessible design with light/dark themes and focus-visible outlines. Contrast aims for WCAG AA.

## Roadmap
- JSON schema validation for import/export
- More granular tests and fixtures
- Bulk actions (multi-select, complete/delete)
- Optional date/time pickers with localization
- PWA installability and offline hints

## License
Add your license of choice (e.g., MIT) here.
