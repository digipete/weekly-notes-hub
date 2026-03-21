import { useState } from "react";
import { Link } from "react-router-dom";
import { getPublishedWeeknotes, getAllTags, formatDateShort } from "@/lib/content";

export default function Weeknotes() {
  const notes = getPublishedWeeknotes();
  const allTags = getAllTags();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? notes.filter((n) => n.tags.includes(activeTag))
    : notes;

  return (
    <div className="mx-auto max-w-reading px-6 py-12">
      {/* Tag filter pills */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-display text-sm px-3 py-1 rounded-full border transition-colors ${
              activeTag === null
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-border hover:border-foreground"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`font-display text-sm px-3 py-1 rounded-full border transition-colors ${
                activeTag === tag
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-foreground border-border hover:border-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
        Weeknotes
      </h1>
      <p className="mt-2 text-muted-foreground">
        A week by week stream of consciousness.{" "}
        <a href="/feed.xml" aria-label="Subscribe to weeknotes via RSS">
          Subscribe via RSS
        </a>
      </p>

      {filtered.length === 0 ? (
        <p className="mt-12 text-muted-foreground">
          No weeknotes found{activeTag ? ` tagged "${activeTag}"` : ""}.
        </p>
      ) : (
        <ol className="mt-10 list-none p-0 divide-y divide-border">
          {filtered.map((note) => (
            <li key={note.slug} className="py-3 flex items-baseline justify-between gap-4">
              <Link
                to={`/weeknotes/${note.slug}`}
                className="font-display text-foreground no-underline hover:text-accent truncate"
              >
                {note.title}
              </Link>
              <time
                dateTime={note.date}
                className="font-display text-sm text-muted-foreground whitespace-nowrap shrink-0"
              >
                {formatDateShort(note.date)}
              </time>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
