---
title: "Weeknote 2 — Building momentum"
date: "2026-03-13"
slug: "weeknote-2"
summary: "Progress on the weeknotes site, RSS feed working, and early user feedback."
draft: false
tags: ["delivery", "platform"]
---

## What we did

Good progress this week. The site is now fully functional and ready for regular use.

- Completed the weeknotes index and detail pages
- Added previous/next navigation between notes
- Implemented RSS feed generation at build time
- Set up the GitHub Actions deployment workflow
- Added reading time estimates

## Design decisions

We kept the design deliberately restrained. No sidebar, no related posts, no complex navigation. The structure follows a simple pattern:

1. **Home** → introduces the site
2. **Weeknotes index** → shows all notes in reverse chronological order
3. **Weeknote detail** → full content with adjacent navigation

Each weeknote file lives in `/content/weeknotes/` and is just a Markdown file with some frontmatter metadata. Publishing a new note is as simple as adding a file and pushing to `main`.

## Feedback so far

> "It's refreshingly simple. I can actually focus on the content." — Team member

The team appreciated the low barrier to publishing. No login, no admin panel, no build steps beyond the automatic deploy.

## What's next

- Monitor the site in production for any routing issues
- Consider adding a simple tag-based filter
- Write more weeknotes (the best test of any publishing tool)
