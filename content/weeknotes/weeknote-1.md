---
title: "Weeknote 1 — Getting started"
date: "2026-03-06"
slug: "weeknote-1"
summary: "Setting up the project, defining our approach, and laying the foundations for delivery."
draft: false
tags: ["setup", "planning"]
---

## What we did

This week we kicked off the project properly. We set up the repository, agreed on our tech stack, and started building out the foundational components.

Key activities:

- Created the initial project structure with Vite, React, and TypeScript
- Defined the content model for weeknotes using Markdown with frontmatter
- Set up the deployment pipeline for GitHub Pages
- Agreed on the design direction: clean, content-first, editorial

## What we learned

Starting simple pays off. Rather than reaching for a CMS or database, we chose to keep weeknotes as Markdown files in the repo. This means:

- Anyone on the team can publish by opening a pull request
- The content is version-controlled alongside the code
- There are no external dependencies to manage

We also learned that getting the typography right early makes everything else easier. Choosing **Inter** for UI and **Source Serif 4** for body text gave us a solid foundation.

## What's next

- Write the first real weeknotes
- Add RSS feed generation
- Test the GitHub Pages deployment end-to-end
- Share the site with the wider team for feedback
