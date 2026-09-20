@AGENTS.md

# Nina Flores Realty — the site

Next.js on Vercel, repo `urdadsabortedcryptobaby/nina-flores-realty-v.2`. Nina
is a sales agent at Omni Homes International, Tucson AZ. The wider real estate
bucket — AirBnB, lead gen, strategy — is described in `../CLAUDE.md`.

## The thing most likely to be got wrong

**The site is bilingual.** Copy lives in `messages/en.json` and
`messages/es.json`, with routes under `app/[locale]/`. **Every text change needs
both files.** Updating only English doesn't error and doesn't fail the build —
the Spanish site just quietly keeps saying the old thing. Always change the pair.

## Layout

- `app/[locale]/` — the public site: about, blog, buying, contact, events,
  first-time-buyers, investing, investment, neighborhoods, new-builds
- `app/admin/` — private admin area
- `app/links/` — the link-in-bio page
- `i18n/` — locale routing config

This repo previously doubled as the hub for every other project. Its
`.claude/launch.json` still has entries that start the coyoteflower and
angelmade dev servers; those now point at the new folder locations.
