import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getWeeknoteBySlug,
  getAdjacentWeeknotes,
  formatDate,
} from "@/lib/content";

export default function WeeknotesDetail() {
  const { slug } = useParams<{ slug: string }>();
  const note = slug ? getWeeknoteBySlug(slug) : undefined;

  if (!note) return <Navigate to="/404.html" replace />;

  const { prev, next } = getAdjacentWeeknotes(note.slug);

  return (
    <article className="mx-auto max-w-reading px-6 py-12">
      {/* Breadcrumb / back link */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          to="/weeknotes"
          className="font-display text-sm text-muted-foreground no-underline hover:text-accent"
        >
          ← Back to weeknotes
        </Link>
      </nav>

      {/* Header */}
      <header>
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
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {note.title}
        </h1>
        {note.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
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
      </header>

      {/* Content */}
      <div className="prose-weeknote mt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {note.content}
        </ReactMarkdown>
      </div>

      {/* Previous / Next navigation */}
      {(prev || next) && (
        <nav
          aria-label="Weeknote navigation"
          className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between"
        >
          {prev ? (
            <Link
              to={`/weeknotes/${prev.slug}`}
              className="font-display text-sm text-muted-foreground no-underline hover:text-accent"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/weeknotes/${next.slug}`}
              className="font-display text-sm text-muted-foreground no-underline hover:text-accent sm:text-right"
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  );
}
