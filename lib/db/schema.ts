/**
 * Drizzle ORM schema for Neon Postgres 18.
 * jadecli.com database schema.
 */

import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ── Entities (tracked sources) ──

export const entities = pgTable(
  "entities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    domain: text("domain").notNull(),
    sourceUrl: text("source_url").notNull(),
    category: text("category").notNull(),
    status: text("status").notNull().default("active"), // active | paused | unreachable
    consecutiveFailures: integer("consecutive_failures").notNull().default(0),
    lastError: text("last_error"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
);

export const entitiesRelations = relations(entities, ({ many }) => ({
  records: many(records),
  diffs: many(diffs),
}));

// ── Records (versioned content snapshots) ──

export const records = pgTable(
  "records",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    entityId: uuid("entity_id").notNull().references(() => entities.id),
    content: text("content").notNull(),
    contentHash: text("content_hash").notNull(),
    byteSize: integer("byte_size").notNull(),
    lineCount: integer("line_count").notNull(),
    linkCount: integer("link_count").notNull(),
    fetchedAt: timestamp("fetched_at", { withTimezone: true }).notNull().defaultNow(),
    httpStatus: integer("http_status").notNull(),
    responseTimeMs: integer("response_time_ms").notNull(),
    securityScore: integer("security_score").notNull().default(0),
  },
  (table) => [
    index("idx_records_entity_fetched").on(table.entityId, table.fetchedAt),
    index("idx_records_hash").on(table.contentHash),
  ],
);

export const recordsRelations = relations(records, ({ one }) => ({
  entity: one(entities, {
    fields: [records.entityId],
    references: [entities.id],
  }),
}));

// ── Diffs (line/link-level changes between consecutive records) ──

export const diffs = pgTable(
  "diffs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    entityId: uuid("entity_id").notNull().references(() => entities.id),
    previousRecordId: uuid("previous_record_id").notNull().references(() => records.id),
    currentRecordId: uuid("current_record_id").notNull().references(() => records.id),
    linesAdded: integer("lines_added").notNull(),
    linesRemoved: integer("lines_removed").notNull(),
    linksAdded: jsonb("links_added").notNull().default([]),
    linksRemoved: jsonb("links_removed").notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("idx_diffs_entity_created").on(table.entityId, table.createdAt),
  ],
);

export const diffsRelations = relations(diffs, ({ one }) => ({
  entity: one(entities, {
    fields: [diffs.entityId],
    references: [entities.id],
  }),
  previousRecord: one(records, {
    fields: [diffs.previousRecordId],
    references: [records.id],
  }),
  currentRecord: one(records, {
    fields: [diffs.currentRecordId],
    references: [records.id],
  }),
}));

// ── API Keys ──

export const apiKeys = pgTable(
  "api_keys",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    keyHash: text("key_hash").notNull().unique(),
    keyPrefix: text("key_prefix").notNull(),
    tier: text("tier").notNull().default("free"), // free | starter | pro
    requestCount: integer("request_count").notNull().default(0),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    revoked: boolean("revoked").notNull().default(false),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (table) => [
    index("idx_api_keys_prefix").on(table.keyPrefix),
  ],
);

// ── Request Log (rate limiting & analytics) ──

export const requestLog = pgTable(
  "request_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    apiKeyId: uuid("api_key_id").notNull().references(() => apiKeys.id),
    endpoint: text("endpoint").notNull(),
    statusCode: integer("status_code").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("idx_request_log_key_created").on(table.apiKeyId, table.createdAt),
  ],
);
