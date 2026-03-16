import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { siteConfig } from "./src/config/site";

/* ------------------------------------------------------------------ */
/*  Vite plugin: generate feed.xml + 404.html at build time           */
/* ------------------------------------------------------------------ */

function parseFm(raw: string): Record<string, unknown> {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const data: Record<string, unknown> = {};
  for (const line of m[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    )
      val = val.slice(1, -1);
    if (val === "true") data[key] = true;
    else if (val === "false") data[key] = false;
    else if (val.startsWith("[")) {
      try { data[key] = JSON.parse(val); } catch { data[key] = val; }
    } else data[key] = val;
  }
  return data;
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function staticSitePlugin(): Plugin {
  let outDir: string;
  let isProd: boolean;

  return {
    name: "static-site-extras",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
      isProd = config.mode === "production";
    },
    closeBundle() {
      // 1. Copy index.html → 404.html for GitHub Pages SPA routing
      const indexHtml = path.join(outDir, "index.html");
      if (fs.existsSync(indexHtml)) {
        fs.copyFileSync(indexHtml, path.join(outDir, "404.html"));
      }

      // 2. Generate RSS feed
      const contentDir = path.resolve("content/weeknotes");
      if (!fs.existsSync(contentDir)) return;

      interface FmData { title?: string; date?: string; slug?: string; summary?: string; draft?: boolean; }

      const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
      const notes = files
        .map((f) => {
          const raw = fs.readFileSync(path.join(contentDir, f), "utf-8");
          return parseFm(raw) as FmData;
        })
        .filter((d) => d.title && d.date && (!isProd || d.draft !== true))
        .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());

      const baseUrl = siteConfig.url.replace(/\/$/, "");
      const items = notes
        .map(
          (n) => `    <item>
      <title>${escapeXml(n.title!)}</title>
      <link>${baseUrl}/weeknotes/${n.slug || ""}</link>
      <pubDate>${new Date(n.date! + "T00:00:00").toUTCString()}</pubDate>
      <description>${escapeXml(n.summary || "")}</description>
    </item>`
        )
        .join("\n");

      const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

      fs.writeFileSync(path.join(outDir, "feed.xml"), rss, "utf-8");
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Vite config                                                       */
/* ------------------------------------------------------------------ */

export default defineConfig(({ mode }) => ({
  base: siteConfig.basePath,
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
    fs: { allow: [".", "content"] },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    staticSitePlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
