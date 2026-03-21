import { Link, Outlet } from "react-router-dom";
import { siteConfig } from "@/config/site";

export default function Layout() {
  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Site header */}
      <nav
        aria-label="Primary"
        className="border-b border-border bg-background"
      >
        <div className="mx-auto flex max-w-reading items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="font-display text-sm font-semibold tracking-tight text-foreground no-underline hover:text-accent"
          >
            {siteConfig.name}
          </Link>

          <div className="flex items-center gap-5 font-display text-sm">
            <Link
              to="/weeknotes"
              className="text-muted-foreground no-underline hover:text-accent"
            >
              Weeknotes
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground no-underline hover:text-accent"
            >
              About
            </Link>
            <a
              href="/feed.xml"
              className="text-muted-foreground no-underline hover:text-accent"
              aria-label="RSS Feed"
              title="RSS Feed"
            >
              <RssIcon />
            </a>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main id="main-content" className="min-h-[60vh]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-reading px-6 py-8">
          <p className="font-display text-sm text-muted-foreground">
            {siteConfig.footerText}
          </p>
        </div>
      </footer>
    </>
  );
}

function RssIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );
}
