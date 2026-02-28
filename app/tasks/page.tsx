import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks Open Specification | jadecli",
  description:
    "Schema-first task lifecycle for AI agents. Zero deps, model-agnostic, language-agnostic.",
};

const FEATURES = [
  {
    title: "Schema-first",
    description:
      "Every task, status report, and decision is defined by a YAML schema. Contracts before code.",
    color: "var(--cycle-1)",
  },
  {
    title: "Zero deps",
    description:
      "Pure spec. No runtime, no framework, no vendor lock-in. Validate with any JSON Schema tool.",
    color: "var(--cycle-2)",
  },
  {
    title: "Model-agnostic",
    description:
      "Works with Claude, GPT, Gemini, open-source models, or no model at all. The spec is the interface.",
    color: "var(--cycle-3)",
  },
  {
    title: "Language-agnostic",
    description:
      "Python, TypeScript, Go, Rust -- any language that can read YAML can implement the spec.",
    color: "var(--cycle-1)",
  },
];

const CONTRACTS = [
  {
    name: "task-dispatch",
    description: "Builder sends work assignments with token budgets and model selection.",
  },
  {
    name: "status-report",
    description: "Repos report progress, blockers, and token spend back to the builder.",
  },
  {
    name: "decision-request",
    description: "Repos escalate one-way door decisions for human review.",
  },
  {
    name: "decision-response",
    description: "Builder approves or rejects with conditions and rationale.",
  },
];

export default function TasksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Header */}
      <section className="py-16 text-center sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Tasks Open Specification
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-muted)] sm:text-lg">
          Schema-first task lifecycle for AI agents
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--color-text-dim)]">
          An open specification for task dispatch, status reporting, and decision
          contracts between AI agents and human operators.
        </p>
      </section>

      {/* Install */}
      <section className="border-t border-[var(--color-border)] py-12 sm:py-16">
        <h2 className="text-lg font-semibold sm:text-xl">Install</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] p-4">
            <div className="text-xs text-[var(--color-text-muted)] mb-2">
              Python
            </div>
            <code className="font-mono text-sm text-[var(--color-accent)]">
              pip install jade-agents-tasks
            </code>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] p-4">
            <div className="text-xs text-[var(--color-text-muted)] mb-2">
              Node.js
            </div>
            <code className="font-mono text-sm text-[var(--color-accent)]">
              npm install @jadecli/tasks-spec
            </code>
          </div>
        </div>
      </section>

      {/* Key features */}
      <section className="border-t border-[var(--color-border)] py-12 sm:py-16">
        <h2 className="text-lg font-semibold sm:text-xl">Key Features</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-[var(--color-border)] p-4 hover:border-[var(--color-border-warm)] hover:bg-[var(--color-surface-warm)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: feature.color }}
                />
                <h3 className="font-medium">{feature.title}</h3>
              </div>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contracts */}
      <section className="border-t border-[var(--color-border)] py-12 sm:py-16">
        <h2 className="text-lg font-semibold sm:text-xl">Contracts</h2>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Four YAML schemas that define the full task lifecycle.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {CONTRACTS.map((contract) => (
            <div
              key={contract.name}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] p-4"
            >
              <span className="font-medium font-mono text-sm">
                {contract.name}
              </span>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                {contract.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--color-border)] py-12 text-center sm:py-16">
        <h2 className="text-lg font-semibold sm:text-xl">Read the full spec</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--color-text-muted)]">
          The complete specification, schema files, and reference
          implementations are on GitHub.
        </p>
        <div className="mt-6">
          <a
            href="https://github.com/jadecli/dotfiles/tree/main/tasks/spec"
            className="inline-block rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-black hover:bg-[var(--color-accent-hover)] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
