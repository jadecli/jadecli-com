---
name: template-sync
description: Compare template/ files against live app/ and lib/ files to detect drift
tools:
  - Bash
  - Grep
  - Glob
  - Read
---

# Template Sync

Compare the `template/` directory against the live `app/` and `lib/` directories to detect drift between the template and the live site.

## What to check

1. **Verbatim files** — These should be identical between template and live:
   - `app/globals.css` ↔ `template/app/globals.css`
   - `lib/db/pool.ts` ↔ `template/lib/db/pool.ts`
   - `lib/security/sanitize.ts` ↔ `template/lib/security/sanitize.ts`
   - `lib/security/detect-injection.ts` ↔ `template/lib/security/detect-injection.ts`
   - `lib/security/sandbox.ts` ↔ `template/lib/security/sandbox.ts`
   - `lib/security/index.ts` ↔ `template/lib/security/index.ts`

2. **Parameterized files** — Structure should match, but product-specific content differs:
   - `app/layout.tsx` vs `template/app/layout.tsx` — same structure, different site name
   - `app/page.tsx` vs `template/app/page.tsx` — same layout, different content
   - `app/pricing/page.tsx` vs `template/app/pricing/page.tsx` — same structure, different features
   - `lib/types.ts` vs `template/lib/types.ts` — same patterns, different entity names
   - `lib/auth.ts` vs `template/lib/auth.ts` — should be identical except key prefix

## How to run

```bash
# Check verbatim files for drift
for f in app/globals.css lib/db/pool.ts lib/security/sanitize.ts lib/security/detect-injection.ts lib/security/sandbox.ts lib/security/index.ts; do
  if diff -q "$f" "template/$f" > /dev/null 2>&1; then
    echo "OK: $f"
  else
    echo "DRIFT: $f"
  fi
done
```

## When to sync

- After modifying any file listed above in the live site
- Before creating a PR that touches security/ or db/ modules
- When `session-setup.sh` reports template drift warnings
