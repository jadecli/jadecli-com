# App Template

Reusable Next.js + Neon + Stripe + Drizzle scaffold for SaaS data products.

Extracted from [llms-txt-feed](https://github.com/jadecli/llms-txt-feed) — a live production app that tracks, versions, and monetizes content feeds.

## Quick Start

```bash
# 1. Copy template to your new project
cp -r template/ ~/projects/my-new-app/
cd ~/projects/my-new-app/

# 2. Install dependencies
npm install

# 3. Configure environment
cp env.template .env
# Edit .env with your Neon connection string, Stripe keys, etc.

# 4. Set up database
make migrate    # Run Drizzle migrations
make seed       # Seed initial entities

# 5. Start developing
make dev        # Next.js dev server with Turbopack
```

## Architecture

```
Source URLs ──→ lib/fetcher/fetch.ts ──→ Neon Postgres 18 (records + diffs)
                 │ fetchEntity()           │
                 │ storeRecord()           │ SHA-256 dedup: identical content = no new record
                 │ computeLineDiff()       │
                 │                         │
                 │ lib/security/           │ Content sanitized + scanned before storage
                 │  sanitize.ts            │ Strip invisible Unicode chars (8 categories)
                 │  detect-injection.ts    │ Heuristic prompt injection scanner (20+ patterns)
                 │  sandbox.ts             │ XML-wrap untrusted content for LLM consumers
                 │                         │
                 └── cli.ts (entry point)  │
                                           ▼
app/api/v1/* ──→ lib/auth.ts ──→ lib/db/pool.ts ──→ Neon
 │ /feed          │ Bearer token → SHA-256 hash → api_keys table lookup
 │ /entities      │ No auth header = free tier (not an error)
 │ /content/:slug │ Security-gated: rejects security_score >= 3
 │ /stats         │ Rate limit: COUNT(request_log) per day vs tier limit
 │ /pricing       │
 └── cron/fetch   └── lib/pricing.ts (free: 100/day, starter: 5k, pro: 50k)

Stripe checkout → webhook → API key provisioning (api_keys table)
```

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5.9 (strict mode) |
| Database | Neon Postgres 18 (serverless HTTP) |
| ORM | Drizzle ORM (type-safe, ~7.4kb) |
| Styling | Tailwind CSS 4 + CSS variables |
| Fonts | Geist Sans + Mono |
| Payments | Stripe (subscriptions) |
| Analytics | Cube.js semantic layer (optional) |
| Testing | Vitest |
| CI/CD | GitHub Actions |

## Customization Guide

Search for `__PLACEHOLDER__` comments across all files to find customization points.

### 1. Rename entities

| Template name | Replace with |
|--------------|-------------|
| `Entity` | Your domain object (e.g., `Vendor`, `Source`, `Feed`) |
| `Record` | Your snapshot type (e.g., `Snapshot`, `Version`, `Capture`) |
| `entities` table | Your table name |
| `records` table | Your table name |

Key files: `lib/types.ts`, `lib/db/schema.ts`, `lib/fetcher/fetch.ts`, `lib/db/seed.ts`

### 2. Configure categories

Edit `EntityCategory` type in `lib/types.ts` and update `CATEGORY_LABELS` in page files.

### 3. Update pricing

Edit `lib/pricing.ts` — adjust tiers, prices, and limits. Update `TIER_FEATURES` in `app/pricing/page.tsx`.

### 4. Brand your site

- `app/layout.tsx` — Change `SITE_NAME`, `SITE_DESCRIPTION`, `NAV_LINKS`
- `app/globals.css` — Adjust CSS variables for your brand colors
- `app/page.tsx` — Replace hero text, stats, and grid items

### 5. Set up CI/CD

- `.github/workflows/ci.yml` — Typecheck + test + build (works out of the box)
- `.github/workflows/neon-branch.yml` — Set `NEON_API_KEY` and `NEON_PROJECT_ID` secrets
- `.github/workflows/vercel-preview.yml` — Set `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` secrets

## Design System

### CSS Variables

| Variable | Dark | Light | Purpose |
|----------|------|-------|---------|
| `--color-bg` | `#141413` | `#faf9f5` | Page background |
| `--color-surface` | `#1c1b18` | `#eeece2` | Card background |
| `--color-surface-warm` | `#1e1d1a` | — | Hover/active state |
| `--color-border` | `#2e2c28` | `#e8e6dc` | Default border |
| `--color-accent` | `#d97757` | — | Primary accent (warm clay) |
| `--color-info` | `#6a9bcc` | — | Informational (slate blue) |
| `--color-success` | `#788c5d` | — | Success (forest green) |
| `--color-error` | `#c15f3c` | — | Error (crail red) |

### Cycle Colors

Use `var(--cycle-1)` through `var(--cycle-3)` for data visualization:
- Cycle 1: `#d97757` (orange)
- Cycle 2: `#6a9bcc` (blue)
- Cycle 3: `#788c5d` (green)

## Database Commands

```bash
make migrate       # Run Drizzle migrations
make seed          # Seed initial data
make db-generate   # Generate SQL migration from schema changes
make db-push       # Push schema directly (dev only)
```

## Key Patterns

### Content hash deduplication
`storeRecord()` skips insertion when `content_hash` matches the latest record. Diffs only exist when content actually changes.

### Security pipeline
`fetchEntity()` sanitizes (strip invisible chars) → scans (heuristic injection detection) → stores with `security_score`. Content with `security_score >= 3` is blocked.

### Auth returns free tier on failure
`authenticate()` returns `tier: "free"` even when auth fails. Check the `error` field, not just the `tier`.

### Neon uses HTTP queries
`sql()` returns a tagged template function, NOT a connection pool. No persistent connections to manage.
