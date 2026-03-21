export const siteConfig = {
  /** Site name used in titles and metadata */
  name: "PH Weeknotes",

  /** Author name for structured data */
  author: "Pete Hallett",

  /** Meta description for SEO */
  description:
    "Weeknotes and rambling from Pete Hallett, a grey haired technologist — updates on strategy, architecture, delivery, design and development.",

  /** Text shown in the hero banner */
  bannerTitle: "Weeknotes",

  /** Intro paragraph shown in the hero banner */
  bannerIntro:
    "Weeknotes and rambling from a grey haired technologist — updates on strategy, architecture, delivery, design and development.",

  /** Footer copyright / attribution text */
  footerText: "© 2026 Pete Hallett. Published with care.",

  /**
   * Base path for GitHub Pages project hosting.
   * Set to "/" for user/org sites (username.github.io)
   * Set to "/repo-name/" for project sites (username.github.io/repo-name)
   * Set to "/" for custom domains
   */
  basePath: "/",

  /** Full URL of the deployed site — used for RSS feed links */
  url: "https://weeknote.hallett.life",
} as const;
