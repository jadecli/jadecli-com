/**
 * API key authentication middleware.
 * Validates key, checks tier, enforces rate limits.
 */

import { createHash } from "node:crypto";
import { sql } from "./db/pool";
import type { PricingTier } from "./types";

type Row = Record<string, any>;

/** Requests per day by tier. */
const RATE_LIMITS: Record<PricingTier, number> = {
  free: 100,
  starter: 5000,
  pro: 50000,
};

export interface AuthResult {
  authenticated: boolean;
  tier: PricingTier;
  apiKeyId: string | null;
  error: string | null;
}

function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

const KEY_PREFIX = "jade_";

export function generateApiKey(): { key: string; prefix: string; hash: string } {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const key = KEY_PREFIX + Buffer.from(bytes).toString("base64url");
  const prefix = key.slice(0, 12);
  const hash = hashKey(key);
  return { key, prefix, hash };
}

export async function authenticate(authHeader: string | undefined): Promise<AuthResult> {
  // No auth = free tier (public data only)
  if (!authHeader) {
    return { authenticated: false, tier: "free", apiKeyId: null, error: null };
  }

  const key = authHeader.replace("Bearer ", "");
  if (!key.startsWith(KEY_PREFIX)) {
    return { authenticated: false, tier: "free", apiKeyId: null, error: "Invalid API key format" };
  }

  const keyHash = hashKey(key);
  const db = sql();

  const apiKeyRows = (await db`
    SELECT * FROM api_keys WHERE key_hash = ${keyHash} AND revoked = false
  `) as Row[];
  const apiKey = apiKeyRows[0];

  if (!apiKey) {
    return { authenticated: false, tier: "free", apiKeyId: null, error: "Invalid or revoked API key" };
  }

  if (apiKey.expires_at && new Date(apiKey.expires_at) < new Date()) {
    return { authenticated: false, tier: "free", apiKeyId: null, error: "API key expired" };
  }

  // Check daily rate limit
  const rateLimit = RATE_LIMITS[apiKey.tier as PricingTier] ?? RATE_LIMITS.free;
  const countRows = (await db`
    SELECT COUNT(*) as count FROM request_log
    WHERE api_key_id = ${apiKey.id}
    AND created_at > now() - interval '1 day'
  `) as Row[];

  if (Number(countRows[0].count) >= rateLimit) {
    return { authenticated: true, tier: apiKey.tier, apiKeyId: apiKey.id, error: "Rate limit exceeded" };
  }

  // Update usage
  await db`UPDATE api_keys SET request_count = request_count + 1, last_used_at = now() WHERE id = ${apiKey.id}`;

  return { authenticated: true, tier: apiKey.tier, apiKeyId: apiKey.id, error: null };
}
