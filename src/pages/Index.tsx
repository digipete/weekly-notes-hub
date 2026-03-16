import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

export default function Index() {
  return (
    <>
      {/* Hero banner */}
      <section className="bg-surface border-b border-border">
        <div className="mx-auto max-w-reading px-6 py-16 md:py-20">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {siteConfig.bannerTitle}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {siteConfig.bannerIntro}
          </p>
          <div className="mt-8 flex items-center gap-4 font-display text-sm">
            <Link
              to="/weeknotes"
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 font-medium text-accent-foreground no-underline hover:opacity-90"
            >
              Read weeknotes →
            </Link>
            <a
              href="/feed.xml"
              className="text-muted-foreground no-underline hover:text-accent"
              aria-label="Subscribe via RSS"
            >
              RSS feed
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
