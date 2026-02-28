/**
 * Seed initial entities into Neon.
 * Idempotent — uses ON CONFLICT DO UPDATE.
 *
 * __PLACEHOLDER__: Replace SEED_ENTITIES with your initial data.
 */

import { sql } from "./pool";

const SEED_ENTITIES = [
  {
    name: "Example One",
    slug: "example-1",
    domain: "example.com",
    source_url: "https://example.com/data.txt",
    category: "general",
  },
  {
    name: "Example Two",
    slug: "example-2",
    domain: "example.org",
    source_url: "https://example.org/data.txt",
    category: "tools",
  },
];

export async function seedEntities() {
  const db = sql();

  for (const e of SEED_ENTITIES) {
    await db`
      INSERT INTO entities (name, slug, domain, source_url, category)
      VALUES (${e.name}, ${e.slug}, ${e.domain}, ${e.source_url}, ${e.category})
      ON CONFLICT (slug) DO UPDATE SET
        source_url = EXCLUDED.source_url,
        updated_at = now()
    `;
    console.log(`  Seeded: ${e.name} (${e.slug})`);
  }
}

// Run directly
const isMain = import.meta.url.endsWith(process.argv[1]?.replace(/.*\//, "") ?? "");
if (isMain) {
  seedEntities()
    .then(() => console.log("Seed complete."))
    .catch((err) => {
      console.error("Seed failed:", err);
      process.exit(1);
    });
}
