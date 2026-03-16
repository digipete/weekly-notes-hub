# Weeknotes

A simple, static weeknotes site built with Vite, React, TypeScript, and Tailwind CSS. Weeknotes are authored as Markdown files and deployed to GitHub Pages.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to see the site.

## Publishing a new weeknote

1. Copy `content/weeknotes/_template.md` to a new file, e.g. `content/weeknotes/weeknote-3.md`
2. Fill in the frontmatter (title, date, slug, summary) and write your content in Markdown
3. Set `draft: false` when the note is ready to publish
4. Commit and push to `main` — GitHub Actions will build and deploy automatically

### Frontmatter fields

| Field     | Required | Description                                         |
| --------- | -------- | --------------------------------------------------- |
| `title`   | Yes      | The weeknote title                                  |
| `date`    | Yes      | Publication date in `YYYY-MM-DD` format             |
| `slug`    | Yes      | URL slug (used in `/weeknotes/:slug`)               |
| `summary` | No       | Short description; auto-generated from content if omitted |
| `draft`   | No       | Set to `true` to hide from production builds        |
| `tags`    | No       | JSON array of tags, e.g. `["delivery", "platform"]` |

## Building for production

```bash
npm run build
```

Static files are output to `dist/`. The build also generates:

- `404.html` — a copy of `index.html` for GitHub Pages SPA routing
- `feed.xml` — an RSS feed of all published weeknotes

## Deploying to GitHub Pages

### Automatic (recommended)

1. Push your code to a GitHub repository
2. Go to **Settings → Pages** and set the source to **GitHub Actions**
3. Push to `main` — the included workflow (`.github/workflows/deploy.yml`) will build and deploy

### Base path and URL

The settings in `src/config/site.ts` control routing and links:

| Deployment type | `basePath` | `url` |
|-----------------|------------|-------|
| **Custom domain** (e.g. `example.com`) | `"/"` | `"https://example.com"` |
| **User/org site** (e.g. `username.github.io`) | `"/"` | `"https://username.github.io"` |
| **Project site** (e.g. `username.github.io/repo-name`) | `"/repo-name/"` | `"https://username.github.io/repo-name"` |

### Custom domain

To use a custom domain like `weeknote.hallett.life`:

1. Update `src/config/site.ts` — set `url` to your custom domain and `basePath` to `"/"`
2. In your GitHub repo, go to **Settings → Pages**
3. Under "Custom domain", enter your domain and save
4. Add DNS records at your domain provider:
   - **A records** for `@` pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or a **CNAME** record for `www` pointing to `username.github.io`

## Project structure

```
content/weeknotes/       # Markdown weeknote files
  _template.md            # Template for new notes
  weeknote-1.md           # Example note
  weeknote-2.md           # Example note
src/
  components/             # Shared React components
  config/site.ts          # Site branding & configuration
  lib/content.ts          # Markdown loading & parsing
  pages/                  # Route pages
.github/workflows/        # GitHub Actions deploy workflow
```

## Branding

All site branding is controlled from `src/config/site.ts`. Colours and typography are defined in `src/index.css` and `tailwind.config.ts`.

## RSS

The RSS feed is generated at build time and available at `/feed.xml`. It includes all published (non-draft) weeknotes.

## Local development

```bash
npm install     # Install dependencies
npm run dev     # Start dev server at localhost:8080
npm run build   # Production build to dist/
npm run preview # Preview the production build locally
```

## License

MIT
