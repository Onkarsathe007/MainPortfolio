# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-22 01:29:08 IST
**Commit:** 0be9484
**Branch:** frontend

## OVERVIEW
React portfolio with Hashnode blog integration, featuring custom UI components with Framer Motion animations and shadcn/ui base.

## STRUCTURE
```
/
├── src/
│   ├── components/
│   │   ├── ui/              # Custom UI components (17 files, 1255 lines)
│   │   │   └── Blog/        # Blog card components
│   │   └── NavBarDemo.jsx
│   ├── pages/               # Route pages (HomePage, BlogsPage)
│   ├── services/            # API layer (HashnodeAPI)
│   └── lib/                 # Utilities (cn helper)
├── public/                  # Static assets
└── [configs]                # vite, tailwind, eslint, postcss
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add page/route | `src/pages/` + `src/App.jsx` | Simple Router setup, no layouts |
| Add UI component | `src/components/ui/` | See ui/AGENTS.md for patterns |
| Modify blog API | `src/services/hashnodeAPI.js` | GraphQL Hashnode client |
| Update styles | `tailwind.config.js` | Custom theme, aurora animation |
| API proxy config | `vite.config.js` | Proxies `/api` to Render backend |
| Section components | `src/pages/HomePage.jsx` | Hero, About, Skills, Projects, etc. |

## CONVENTIONS

**Path Alias**: `@/` → `./src` (Vite config)

**Styling**: Tailwind + shadcn/ui design tokens via CSS vars
- Use `cn()` from `@/lib/utils` for class merging
- HSL color system: `hsl(var(--primary))`
- Custom animation: `aurora` keyframe (60s loop)

**Component Patterns**:
- shadcn/ui base (button, input, checkbox, label)
- Variants via `class-variance-authority` (see `button-variants.js`)
- Framer Motion for animations (tubelight-navbar, spotlight, moving-border)
- Radix UI primitives for accessibility

**API Integration**:
- Hashnode GraphQL via `hashnodeAPI.js`
- Proxied backend: `/api/*` → `mainportfolio-xyfi.onrender.com`
- No REST API client lib - native `fetch()`

**ESLint Custom Rule**:
```js
'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]|motion' }]
```
Ignores unused React imports, constants, and Framer Motion.

## COMMANDS
```bash
npm run dev       # Vite dev server
npm run build     # Production build
npm run lint      # ESLint check
npm run preview   # Preview production build
```

## NOTES

**No TypeScript**: Pure JSX, no .tsx files

**Blog Source**: Hashnode GraphQL API, NOT the proxied backend
- Backend proxy exists but blog uses direct Hashnode integration
- Check `hashnodeAPI.js` for schema

**Component Organization**: All UI components flat in `ui/` except Blog subfolder
- No feature-based folders
- Mix of page sections (Hero, About) and primitives (Button, Input)

**Dark Mode**: Configured in Tailwind (`darkMode: ["class"]`) but not implemented in app

**No Tests**: No test files, configs, or npm scripts
