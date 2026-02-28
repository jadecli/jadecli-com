import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Workers | jadecli",
  description:
    "11 domain-specialized AI teams. Each worker runs a 6-agent squad with connectors to the tools your team already uses.",
};

type Worker = {
  name: string;
  description: string;
  connectors: string[];
};

const WORKERS: Worker[] = [
  {
    name: "productivity",
    description:
      "Personal and team productivity — task management, workplace memory, daily workflows",
    connectors: [
      "Slack",
      "Notion",
      "Asana",
      "Linear",
      "Jira",
      "Monday",
      "ClickUp",
      "Microsoft 365",
    ],
  },
  {
    name: "sales",
    description:
      "Sales pipeline, deal management, customer relationships, revenue forecasting",
    connectors: [
      "Salesforce",
      "HubSpot",
      "Pipedrive",
      "Gong",
      "LinkedIn Sales Navigator",
    ],
  },
  {
    name: "customer-support",
    description:
      "Customer service operations — ticket management, knowledge base, resolution workflows",
    connectors: ["Zendesk", "Intercom", "Freshdesk", "Slack"],
  },
  {
    name: "product-management",
    description:
      "Product strategy, roadmaps, user research, feature prioritization",
    connectors: ["Linear", "Jira", "Notion", "Productboard", "Amplitude"],
  },
  {
    name: "marketing",
    description:
      "Content strategy, campaign management, brand voice, analytics",
    connectors: [
      "HubSpot",
      "Mailchimp",
      "Buffer",
      "Google Analytics",
      "Webflow",
    ],
  },
  {
    name: "legal",
    description:
      "Contract review, compliance monitoring, regulatory tracking, legal research",
    connectors: ["DocuSign", "Ironclad", "Westlaw", "LexisNexis"],
  },
  {
    name: "finance",
    description:
      "Financial planning, budgeting, reporting, expense tracking",
    connectors: ["QuickBooks", "Xero", "Stripe", "Brex", "Ramp"],
  },
  {
    name: "data",
    description:
      "Data engineering, analytics, pipeline management, data quality",
    connectors: ["Snowflake", "dbt", "Fivetran", "Looker", "BigQuery"],
  },
  {
    name: "enterprise-search",
    description:
      "Cross-system search, knowledge discovery, content indexing",
    connectors: ["Elasticsearch", "Algolia", "Pinecone", "Confluence"],
  },
  {
    name: "bio-research",
    description:
      "Biological research, lab management, literature review, experimental design",
    connectors: ["PubMed", "UniProt", "NCBI", "BioRxiv"],
  },
  {
    name: "cowork-plugin-management",
    description:
      "Plugin ecosystem management, skill installation, agent configuration",
    connectors: ["GitHub", "npm", "Claude Code CLI"],
  },
];

const TEAM_ROLES = [
  "VP-product-management",
  "VP-software-engineering",
  "frontend-engineer",
  "middleware-engineer",
  "backend-engineer",
  "quality-assurance-engineer",
];

const TOTAL_WORKERS = WORKERS.length;
const AGENTS_PER_WORKER = TEAM_ROLES.length;
const TOTAL_AGENTS = TOTAL_WORKERS * AGENTS_PER_WORKER;
const TOTAL_CONNECTORS = new Set(WORKERS.flatMap((w) => w.connectors)).size;

const CYCLE_COLORS = [
  "var(--cycle-1)",
  "var(--cycle-2)",
  "var(--cycle-3)",
] as const;

export default function WorkersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="py-16 text-center sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Knowledge Workers
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-muted)] sm:text-lg">
          11 domain-specialized AI teams, each running a 6-agent squad
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--color-text-dim)]">
          Every worker connects to the tools your team already uses. One
          platform, every department, full coverage.
        </p>
      </section>

      {/* Summary bar */}
      <section className="grid grid-cols-3 gap-4 border-y border-[var(--color-border)] py-8 sm:gap-0 sm:divide-x sm:divide-[var(--color-border)]">
        <div className="text-center px-4">
          <div
            className="text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--cycle-1)" }}
          >
            {TOTAL_WORKERS}
          </div>
          <div className="mt-1 text-xs text-[var(--color-text-muted)] sm:text-sm">
            Workers
          </div>
        </div>
        <div className="text-center px-4">
          <div
            className="text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--cycle-2)" }}
          >
            {TOTAL_AGENTS}
          </div>
          <div className="mt-1 text-xs text-[var(--color-text-muted)] sm:text-sm">
            Agents
          </div>
        </div>
        <div className="text-center px-4">
          <div
            className="text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--cycle-3)" }}
          >
            {TOTAL_CONNECTORS}+
          </div>
          <div className="mt-1 text-xs text-[var(--color-text-muted)] sm:text-sm">
            Connectors
          </div>
        </div>
      </section>

      {/* Worker grid */}
      <section className="py-12 sm:py-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WORKERS.map((worker, i) => {
            const cycleColor = CYCLE_COLORS[i % CYCLE_COLORS.length];
            return (
              <div
                key={worker.name}
                className="rounded-xl border border-[var(--color-border)] p-4 hover:border-[var(--color-border-warm)] hover:bg-[var(--color-surface-warm)] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium font-mono text-sm">
                    {worker.name}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      background: `color-mix(in srgb, ${cycleColor} 12%, transparent)`,
                      color: cycleColor,
                    }}
                  >
                    6-agent team
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  {worker.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[var(--color-text-dim)]">
                    {worker.connectors.length} connector
                    {worker.connectors.length !== 1 ? "s" : ""}
                  </span>
                  <div className="flex flex-wrap justify-end gap-1">
                    {worker.connectors.map((c) => (
                      <span
                        key={c}
                        className="rounded bg-[var(--color-surface)] px-1.5 py-0.5 text-[10px] text-[var(--color-text-dim)] font-mono"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team composition */}
      <section className="border-t border-[var(--color-border)] py-12 sm:py-16">
        <h2 className="text-center text-lg font-semibold sm:text-xl">
          Every Worker&apos;s Team
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-[var(--color-text-muted)]">
          Each knowledge worker runs an identical 6-role squad, mirroring a
          real product team.
        </p>
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-3">
          {TEAM_ROLES.map((role, i) => {
            const cycleColor = CYCLE_COLORS[i % CYCLE_COLORS.length];
            return (
              <div
                key={role}
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-center"
              >
                <span
                  className="font-mono text-xs font-medium"
                  style={{ color: cycleColor }}
                >
                  {role}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
