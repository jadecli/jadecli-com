import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Roster | jadecli",
  description:
    "18 specialist agents built on Claude Code. Critic perspectives, operational tools, and workflow automation.",
};

type Agent = {
  name: string;
  description: string;
  category: "critic" | "operational";
};

const AGENTS: Agent[] = [
  // Critics (14)
  {
    name: "abramov",
    description:
      "Dan Abramov voice. Understand before use, composition over inheritance, mental models matter.",
    category: "critic",
  },
  {
    name: "askell",
    description:
      "Decision-quality agent. Surfaces the right framing at decision points -- one-way doors, problem statements.",
    category: "critic",
  },
  {
    name: "cagan",
    description:
      "Marty Cagan voice. Product discovery, outcome over output, empowered teams.",
    category: "critic",
  },
  {
    name: "carmack",
    description:
      "John Carmack voice. Performance budgets, first principles, measure everything.",
    category: "critic",
  },
  {
    name: "cherny",
    description:
      "Cherny Standard nudge agent. Surfaces the right slash command at the right moment.",
    category: "critic",
  },
  {
    name: "code-simplifier",
    description:
      "Complexity reduction. Flags unnecessary abstraction, over-engineering, and dead code.",
    category: "critic",
  },
  {
    name: "doshi",
    description:
      "Shreyas Doshi voice. LNO framework, output vs outcome vs impact.",
    category: "critic",
  },
  {
    name: "hickey",
    description:
      "Rich Hickey voice. Simple vs easy, complecting detection, value semantics.",
    category: "critic",
  },
  {
    name: "hightower",
    description:
      "Kelsey Hightower voice. Production-first, operational simplicity.",
    category: "critic",
  },
  {
    name: "hunt",
    description:
      "Troy Hunt voice. Breach mindset, assume compromise, think like an attacker.",
    category: "critic",
  },
  {
    name: "karpathy",
    description:
      "Andrej Karpathy voice. Software 2.0 intuition, know when to train vs code.",
    category: "critic",
  },
  {
    name: "reis",
    description:
      "Joe Reis voice. Data contracts first, fundamentals over hype, data quality as first-class.",
    category: "critic",
  },
  {
    name: "router",
    description:
      "Model classification agent. Routes tasks to the right Claude model tier (Haiku, Sonnet, Opus).",
    category: "critic",
  },
  {
    name: "zhuo",
    description:
      "Julie Zhuo voice. Design/PM bridge, user empathy, clarity of intent, feedback quality.",
    category: "critic",
  },
  // Operational (4)
  {
    name: "org-apply",
    description:
      "Applies org-level GitHub settings to all repos. Squash-only merges, branch protection, Dependabot.",
    category: "operational",
  },
  {
    name: "org-audit",
    description:
      "Audits GitHub org settings across all repos. Read-only -- reports protection, merge strategy, security.",
    category: "operational",
  },
  {
    name: "stale-branches",
    description:
      "Finds stale merged-PR branches across the org. Two-phase workflow: audit, review, delete.",
    category: "operational",
  },
  {
    name: "business-planner",
    description:
      "Strategic planning agent. Business model analysis, competitive positioning, go-to-market strategy.",
    category: "operational",
  },
];

const CATEGORY_STYLES = {
  critic: {
    label: "Critic",
    color: "var(--cycle-2)",
  },
  operational: {
    label: "Operational",
    color: "var(--cycle-3)",
  },
} as const;

export default function AgentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Header */}
      <section className="py-16 text-center sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Agent Roster
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-muted)] sm:text-lg">
          18 specialist agents built on Claude Code
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--color-text-dim)]">
          Critic perspectives that nudge your workflow and operational agents
          that manage your infrastructure. Installed into every Claude Code
          session.
        </p>
      </section>

      {/* Stats bar */}
      <section className="grid grid-cols-2 gap-4 border-y border-[var(--color-border)] py-8 sm:gap-0 sm:divide-x sm:divide-[var(--color-border)]">
        <div className="text-center px-4">
          <div
            className="text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--cycle-2)" }}
          >
            14
          </div>
          <div className="mt-1 text-xs text-[var(--color-text-muted)] sm:text-sm">
            Critic Agents
          </div>
        </div>
        <div className="text-center px-4">
          <div
            className="text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--cycle-3)" }}
          >
            4
          </div>
          <div className="mt-1 text-xs text-[var(--color-text-muted)] sm:text-sm">
            Operational Agents
          </div>
        </div>
      </section>

      {/* Agent grid */}
      <section className="py-12 sm:py-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((agent) => {
            const style = CATEGORY_STYLES[agent.category];
            return (
              <div
                key={agent.name}
                className="rounded-xl border border-[var(--color-border)] p-4 hover:border-[var(--color-border-warm)] hover:bg-[var(--color-surface-warm)] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium font-mono text-sm">
                    {agent.name}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      background: `color-mix(in srgb, ${style.color} 12%, transparent)`,
                      color: style.color,
                    }}
                  >
                    {style.label}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  {agent.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
