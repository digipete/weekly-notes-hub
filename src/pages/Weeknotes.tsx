import { Link } from "react-router-dom";
import { getPublishedWeeknotes, formatDate } from "@/lib/content";

export default function Weeknotes() {
  const notes = getPublishedWeeknotes();

  return (
    <div className="mx-auto max-w-reading px-6 py-12">
      <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
        Weeknotes
      </h1>
      <p className="mt-2 text-muted-foreground">
        A running log of what the team has been working on, week by week.{" "}
        <a href="/feed.xml" aria-label="Subscribe to weeknotes via RSS">
          Subscribe via RSS
        </a>
      </p>

      {notes.length === 0 ? (
        <p className="mt-12 text-muted-foreground">No weeknotes published yet.</p>
      ) : (
        <ol className="mt-10 list-none space-y-0 p-0">
          {notes.map((note, i) => (
            <li
              key={note.slug}
              className={
                i > 0 ? "border-t border-border pt-8 mt-8" : ""
              }
            >
              <article>
                <time
                  dateTime={note.date}
                  className="font-display text-sm text-muted-foreground"
                >
                  {formatDate(note.date)}
                </time>
                {note.readingTime && (
                  <span className="ml-2 font-display text-sm text-muted-foreground">
                    · {note.readingTime} min read
                  </span>
                )}
                <h2 className="mt-1 font-display text-xl font-semibold tracking-tight">
                  <Link
                    to={`/weeknotes/${note.slug}`}
                    className="text-foreground no-underline hover:text-accent"
                  >
                    {note.title}
                  </Link>
                </h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {note.summary}
                </p>
                {note.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-display text-xs text-muted-foreground bg-surface px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
