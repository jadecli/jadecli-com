import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | jadecli",
  description:
    "Choose the right plan for your agentic workflow. Free critic agents, Pro knowledge workers, or Enterprise custom deployments.",
};

type Tier = {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Free",
    price: "$0",
    priceNote: "/mo",
    description:
      "Get started with 14 critic agents for code review and architecture review.",
    features: [
      "14 critic agents (code review, architecture review)",
      "Basic task spec (TaskDefinition, TaskContract)",
      "Community support",
    ],
    cta: "Get Started",
    ctaHref: "https://jade-agent-marketplace.vercel.app",
  },
  {
    name: "Pro",
    price: "$49",
    priceNote: "/mo",
    description:
      "Full knowledge worker teams with MCP marketplace access and token spend tracking.",
    features: [
      "Everything in Free",
      "11 knowledge workers (productivity, sales, marketing, legal, finance, data, etc.)",
      "6-agent dev teams per worker (66 agents total)",
      "MCP marketplace access (120+ repos indexed)",
      "Token spend tracking (ROTS dashboard)",
    ],
    cta: "Start Free Trial",
    ctaHref: "https://jade-agent-marketplace.vercel.app",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Contact us",
    description:
      "Custom knowledge workers, multi-vendor payouts, and SOC2-compliant task contracts.",
    features: [
      "Everything in Pro",
      "Custom knowledge workers",
      "Stripe Connect multi-vendor payouts",
      "SOC2-compliant task contracts",
      "Priority support + SLA",
    ],
    cta: "Contact Sales",
    ctaHref: "https://jade-agent-marketplace.vercel.app",
  },
];

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0"
      style={{ color: "var(--color-success)" }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Header */}
      <section className="py-16 text-center sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Pricing
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-muted)] sm:text-lg">
          Choose the right plan for your agentic workflow
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--color-text-dim)]">
          From free critic agents to full enterprise deployments with custom
          knowledge workers and SOC2 compliance.
        </p>
      </section>

      {/* Tier cards */}
      <section className="pb-16 sm:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border p-6 flex flex-col ${
                tier.highlighted
                  ? "border-[var(--color-accent)] bg-[var(--color-surface-warm)] relative lg:-mt-4 lg:mb-4"
                  : "border-[var(--color-border)] bg-[var(--color-surface)]"
              }`}
            >
              {tier.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-medium"
                  style={{
                    background:
                      "color-mix(in srgb, var(--color-accent) 15%, transparent)",
                    color: "var(--color-accent)",
                  }}
                >
                  Recommended
                </div>
              )}

              {/* Tier header */}
              <div>
                <h2 className="text-lg font-semibold">{tier.name}</h2>
                <div className="mt-3 flex items-baseline gap-1">
                  <span
                    className="text-3xl font-bold tracking-tight sm:text-4xl"
                    style={{
                      color: tier.highlighted
                        ? "var(--color-accent)"
                        : "var(--color-text)",
                    }}
                  >
                    {tier.price}
                  </span>
                  {tier.priceNote && (
                    <span className="text-sm text-[var(--color-text-muted)]">
                      {tier.priceNote}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {tier.description}
                </p>
              </div>

              {/* Divider */}
              <div className="my-5 border-t border-[var(--color-border)]" />

              {/* Features */}
              <ul className="flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]"
                  >
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={tier.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 block w-full rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-colors ${
                  tier.highlighted
                    ? "bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-hover)]"
                    : "border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
