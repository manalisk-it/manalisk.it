# Manalisk website development guidelines

This repository contains the Manalisk website, built with Hugo and Bootstrap.
Follow these conventions when creating, restructuring, or reviewing pages.

## Hugo architecture

- Keep content and presentation separate.
- Store titles, descriptions, services, examples, calls to action, durations,
  links, and other editable copy under `content/`.
- Prefer structured front matter for repeated content such as service cards,
  steps, FAQs, packages, and statistics.
- Keep files under `layouts/` limited to reusable HTML structure and Hugo
  rendering logic.
- Do not hardcode page-specific commercial copy or service lists in layouts.
- Reuse an existing layout when pages share the same information architecture.
- Put styling under `assets/sass/`; do not add page styling inline.
- A normal content change should require editing only the relevant content file.

## Visual identity

- Preserve the existing Manalisk logo, colors, typography, navbar, breadcrumb,
  and footer.
- Use a modern, restrained, informative visual style.
- Internal service pages must look like pages in a service catalogue, not like
  campaign landing pages.
- Avoid oversized hero sections, exaggerated slogans, excessive whitespace,
  and promotional bands that dominate internal pages.
- Prefer clear vertical reading, compact introductions, informative cards, and
  discreet calls to action.
- Dedicated landing pages may use stronger visual emphasis, but must remain
  recognizably part of the same website.

## Layout and responsive design

- Use the site's Bootstrap `.container` as the shared alignment system.
- Breadcrumbs, headings, section introductions, cards, roadmaps, and other main
  content must follow the same responsive container axis.
- Do not override Bootstrap container breakpoints with a single fixed
  `max-width`.
- Do not give card lists an independent width or centering that causes them to
  drift away from the main content at some breakpoints.
- Use media queries only for component behavior that Bootstrap's container
  system does not already handle.
- Verify at representative mobile, tablet, desktop, and wide-desktop widths.
- Always check that `scrollWidth` does not exceed `clientWidth`.

## Service pages

- Preserve all useful information from the existing page when redesigning it.
- Keep service descriptions practical and understandable to non-specialists.
- Make examples concrete and sufficiently explained.
- In example lists, emphasize the role, scenario, or use case in bold.
- Keep duration, expected output, and the service-specific contact link easy to
  identify.
- Present phone or booking calls to action and email calls to action as distinct
  alternatives.
- Reuse `layouts/_default/ai-services-modern.html` for service catalogue pages
  that follow the shared structure, supplying all page-specific data through
  front matter.

## Experimental redesigns

- Preserve the current production page while a redesign is under evaluation.
- Use a temporary URL ending in `2` for side-by-side comparison.
- Set `noindex: true` on experimental alternatives to avoid duplicate indexed
  content.
- Do not change navbar links to an experimental page until the user explicitly
  approves the replacement.
- Do not delete the original page without explicit approval.

## Content and claims

- Do not invent statistics, credentials, prices, legal requirements, customer
  names, or guarantees.
- Preserve approved authority statements and commercial facts exactly unless
  the user requests a change.
- For legal, regulatory, pricing, or other time-sensitive claims, verify current
  authoritative sources before introducing or materially changing the claim.
- Do not promise guaranteed legal compliance or present participation
  certificates as accredited certifications unless this is demonstrably true.

## Verification

- Inspect existing content, layouts, shortcodes, and styles before implementing
  a new component.
- Build the site with Hugo after structural or styling changes.
- Visually inspect changed pages on desktop and mobile.
- For responsive alignment changes, compare the breadcrumb and main content at
  multiple viewport widths rather than validating a single desktop size.
- Check navigation targets, mail links, anchors, accordion behavior, browser
  errors, and horizontal overflow when relevant.
- Existing Sass deprecation warnings from bundled Bootstrap are not caused by
  page work; report new build failures separately.

## Git workflow

- Preserve unrelated user changes already present in the working tree.
- Stage and commit only files belonging to the requested change.
- Do not modify navbar links, replace production pages, delete content, push
  branches, or open pull requests unless explicitly requested.
- Before handing off, state which changes are committed, which remain
  uncommitted, and what verification was performed.
