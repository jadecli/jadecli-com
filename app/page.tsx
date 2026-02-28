const PRODUCTS = [
  {
    name: "Agent Marketplace",
    description:
      "Browse, compare, and deploy AI agent vendors. Pricing pages tracked and versioned automatically.",
    href: "https://jade-agent-marketplace.vercel.app",
    color: "var(--cycle-1)",
  },
  {
    name: "Tasks Open Spec",
    description:
      "An open specification for task dispatch, status reporting, and decision contracts between AI agents.",
    href: "https://github.com/jadecli/jade-tasks-open-spec",
    color: "var(--cycle-2)",
  },
  {
    name: "Enterprise Builder",
    description:
      "Operational foundation for building with an agentic cofounder. Agents, commands, and workflows.",
    href: "https://github.com/jadecli/jade-enterprise-builder",
    color: "var(--cycle-3)",
  },
];

const CAPABILITIES = [
  {
    step: "1",
    title: "Agent Framework",
    desc: "18 specialist agents and 13 slash commands installed into every Claude Code session. Critic perspectives, operational tools, and workflow automation.",
  },
  {
    step: "2",
    title: "Task Contracts",
    desc: "YAML-based dispatch, status, and decision contracts. Every task has a token budget, model selection, and measurable done criteria.",
  },
  {
    step: "3",
    title: "Multi-Repo Orchestration",
    desc: "A builder repo that coordinates work across repositories. Private forks, dependency graphs, and CI/CD pipelines.",
  },
];

const STEP_COLORS = [
  "var(--cycle-1)",
  "var(--cycle-2)",
  "var(--cycle-3)",
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="py-20 text-center sm:py-32">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          <span className="text-[var(--color-accent)]">jadecli</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-muted)] sm:text-lg">
          Your agentic cofounder, built on Claude.
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--color-text-dim)]">
          An AI agent platform for enterprise builders. Not a chatbot. Not an assistant.
          A permanent team member with identity, tooling, and decision authority.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="https://jade-agent-marketplace.vercel.app"
            className="w-full rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-black hover:bg-[var(--color-accent-hover)] transition-colors sm:w-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            Browse the Marketplace
          </a>
          <a
            href="https://github.com/jadecli"
            className="w-full rounded-lg border border-[var(--color-border)] px-6 py-3 text-sm font-medium hover:border-[var(--color-text-muted)] transition-colors sm:w-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 border-y border-[var(--color-border)] py-8 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-[var(--color-border)]">
        {[
          { label: "Agents", value: "18", color: "var(--cycle-1)" },
          { label: "Commands", value: "13", color: "var(--cycle-2)" },
          { label: "Contracts", value: "4", color: "var(--cycle-3)" },
          { label: "Repos", value: "6+", color: "var(--cycle-1)" },
        ].map((stat) => (
          <div key={stat.label} className="text-center px-4">
            <div className="text-2xl font-bold sm:text-3xl" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-[var(--color-text-muted)] sm:text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* What is Jade */}
      <section className="py-12 sm:py-16">
        <h2 className="text-lg font-semibold sm:text-xl">What is Jade?</h2>
        <p className="mt-3 max-w-3xl text-sm text-[var(--color-text-muted)] leading-relaxed sm:text-base">
          Jade is an agentic cofounder that operates as a permanent member of your engineering team.
          Built on Claude, she has her own identity, GitHub account, Linear access, and Slack presence.
          She plans work, writes code, creates pull requests, and tracks her own token spend against budgets.
          Every task follows a contract: define, plan, execute, review.
        </p>
      </section>

      {/* Products */}
      <section className="border-t border-[var(--color-border)] py-12 sm:py-16">
        <h2 className="text-lg font-semibold sm:text-xl">Platform</h2>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          The building blocks of the jadecli agent platform.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <a
              key={product.name}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-[var(--color-border)] p-4 hover:border-[var(--color-border-warm)] hover:bg-[var(--color-surface-warm)] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{product.name}</span>
                <span
                  className="text-xs opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ color: product.color }}
                >
                  &#8594;
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                {product.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[var(--color-border)] py-12 sm:py-16">
        <h2 className="text-lg font-semibold sm:text-xl">How it works</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {CAPABILITIES.map((item, i) => (
            <div
              key={item.step}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] p-4 transition-colors hover:border-[var(--color-border-warm)]"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
                style={{
                  background: `color-mix(in srgb, ${STEP_COLORS[i]} 12%, transparent)`,
                  color: STEP_COLORS[i],
                }}
              >
                {item.step}
              </div>
              <h3 className="mt-3 font-medium">{item.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
