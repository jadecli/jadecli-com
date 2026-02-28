import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const SITE_NAME = "jadecli";
const SITE_DESCRIPTION = "Your agentic cofounder, built on Claude.";

const NAV_LINKS = [
  { href: "/", label: "Home", external: false },
  { href: "https://jade-agent-marketplace.vercel.app", label: "Marketplace", external: true },
  { href: "https://dotfiles-delta.vercel.app", label: "Tasks Spec", external: true },
  { href: "https://github.com/jadecli", label: "GitHub", external: true },
];

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_DESCRIPTION}`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#141413",
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="text-[var(--color-accent)]">&#9670;</span>
          <span>{SITE_NAME}</span>
        </a>
        <div className="flex items-center gap-4 text-sm sm:gap-6">
          {NAV_LINKS.filter((link) => link.href !== "/").map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-[var(--color-text-muted)]">
            <span className="text-[var(--color-accent)]">&#9670;</span> {SITE_NAME}
          </div>
          <div className="flex gap-6 text-sm text-[var(--color-text-muted)]">
            <a
              href="https://jade-agent-marketplace.vercel.app"
              className="hover:text-[var(--color-text)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Marketplace
            </a>
            <a
              href="https://github.com/jadecli"
              className="hover:text-[var(--color-text)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
