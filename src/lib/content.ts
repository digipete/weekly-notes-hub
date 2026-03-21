/** Weeknote data shape */
export interface Weeknote {
  title: string;
  date: string;
  slug: string;
  summary: string;
  draft: boolean;
  tags: string[];
  content: string;
  readingTime: number;
}

/* ------------------------------------------------------------------ */
/*  Frontmatter parser (no external dependency)                       */
/* ------------------------------------------------------------------ */

function parseFrontmatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    // Strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    )
      value = value.slice(1, -1);

    // Booleans
    if (value === "true") {
      data[key] = true;
    } else if (value === "false") {
      data[key] = false;
    }
    // JSON arrays
    else if (value.startsWith("[")) {
      try {
        data[key] = JSON.parse(value);
      } catch {
        data[key] = value;
      }
    } else {
      data[key] = value;
    }
  }
  return { data, content: match[2] };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function readingTime(text: string): number {
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200));
}

function excerpt(content: string, max = 160): string {
  const plain = content
    .replace(/[#*_\[\]()>`~\-]/g, "")
    .replace(/\n+/g, " ")
    .trim();
  return plain.length > max ? plain.slice(0, max).trim() + "…" : plain;
}

/* ------------------------------------------------------------------ */
/*  Load all weeknotes via Vite's import.meta.glob                    */
/* ------------------------------------------------------------------ */

const modules = import.meta.glob("/content/weeknotes/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function loadAll(): Weeknote[] {
  const notes: Weeknote[] = [];

  for (const [filePath, raw] of Object.entries(modules)) {
    if (filePath.includes("_template")) continue;

    const { data, content } = parseFrontmatter(raw);
    const title = data.title as string | undefined;
    const date = data.date as string | undefined;
    if (!title || !date) continue;

    const slug =
      (data.slug as string) ||
      filePath.split("/").pop()?.replace(".md", "") ||
      "";

    notes.push({
      title,
      date,
      slug,
      summary: (data.summary as string) || excerpt(content),
      draft: data.draft === true,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      content,
      readingTime: readingTime(content),
    });
  }

  return notes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

const allWeeknotes = loadAll();

/** Returns published weeknotes (drafts hidden in production). */
export function getPublishedWeeknotes(): Weeknote[] {
  if (import.meta.env.PROD) return allWeeknotes.filter((n) => !n.draft);
  return allWeeknotes;
}

/** Find a single weeknote by slug. */
export function getWeeknoteBySlug(slug: string): Weeknote | undefined {
  return getPublishedWeeknotes().find((n) => n.slug === slug);
}

/** Get previous and next weeknotes for navigation. */
export function getAdjacentWeeknotes(slug: string) {
  const notes = getPublishedWeeknotes();
  const idx = notes.findIndex((n) => n.slug === slug);
  return {
    prev: idx < notes.length - 1 ? notes[idx + 1] : undefined,
    next: idx > 0 ? notes[idx - 1] : undefined,
  };
}

/** Get all unique tags from published weeknotes, sorted by frequency (descending). */
export function getAllTags(): string[] {
  const counts = new Map<string, number>();
  for (const note of getPublishedWeeknotes()) {
    for (const tag of note.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
}

/** Format a date string as "13 March 2026". */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Format a date string as "06-03-2026". */
export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}
