/**
 * Neon serverless Postgres connection pool.
 * Uses @neondatabase/serverless for HTTP-based queries (no persistent connections).
 */

import { neon, NeonQueryFunction } from "@neondatabase/serverless";

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is required — set it in .env or environment");
  }
  return url;
}

let _sql: NeonQueryFunction<false, false> | null = null;

export function sql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    _sql = neon(getDatabaseUrl());
  }
  return _sql;
}
