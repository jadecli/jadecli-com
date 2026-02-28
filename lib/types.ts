/**
 * Core types for jadecli.com
 */

export interface Entity {
  id: string;
  name: string;
  slug: string;
  domain: string;
  source_url: string;
  category: EntityCategory;
  status: EntityStatus;
  consecutive_failures: number;
  last_error: string | null;
  created_at: Date;
  updated_at: Date;
}

export type EntityCategory =
  | "general"
  | "tools"
  | "data";

export type EntityStatus = "active" | "paused" | "unreachable";

export interface ContentRecord {
  id: string;
  entity_id: string;
  content: string;
  content_hash: string;
  byte_size: number;
  line_count: number;
  link_count: number;
  fetched_at: Date;
  http_status: number;
  response_time_ms: number;
  security_score: number;
}

export interface Diff {
  id: string;
  entity_id: string;
  previous_record_id: string;
  current_record_id: string;
  lines_added: number;
  lines_removed: number;
  links_added: string[];
  links_removed: string[];
  created_at: Date;
}

export interface ApiKey {
  id: string;
  key_hash: string;
  key_prefix: string;
  tier: PricingTier;
  request_count: number;
  last_used_at: Date | null;
  created_at: Date;
  expires_at: Date | null;
  revoked: boolean;
  revoked_at: Date | null;
}

export type PricingTier = "free" | "starter" | "pro";
