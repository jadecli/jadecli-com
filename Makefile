.PHONY: install dev build test typecheck migrate seed db-generate db-push nightly clean

SHELL := /bin/bash
.SHELLFLAGS := -euo pipefail -c

## install — install deps
install:
	npm ci

## dev — start Next.js dev server with Turbopack
dev:
	npx next dev --turbopack

## build — production build
build:
	npx next build

## test — run test suite
test:
	npx vitest run

## typecheck — type-check without emitting
typecheck:
	npx tsc --noEmit

## migrate — run Drizzle migrations
migrate:
	npx tsx lib/db/migrate.ts

## seed — seed initial entities
seed:
	npx tsx lib/db/seed.ts

## db-generate — generate SQL migration from Drizzle schema changes
db-generate:
	npx drizzle-kit generate

## db-push — push schema directly to database (development only)
db-push:
	npx drizzle-kit push

## nightly — full nightly: install, build, typecheck, test
nightly: install build typecheck test

## clean — remove build artifacts
clean:
	rm -rf .next dist drizzle/meta
