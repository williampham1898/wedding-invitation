# Chateau Blue — Wedding Invitation

A React + TypeScript + Vite clone of a chateau-blue themed single-page wedding
invitation: envelope intro, countdown, ceremony details, timeline, gallery,
map, gift registry, RSVP, and guestbook.

## Quick start

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build to dist/
npm run lint     # oxlint
```

## Customization

| What                        | Where                              |
| --------------------------- | ---------------------------------- |
| Content (names, dates, etc.) | `src/config/invitation.ts`        |
| Styling (colors, fonts, radii) | `src/theme/tokens.css`          |
| Section order / enable       | `src/config/sections.ts`           |
| Section internals            | `src/components/sections/*`        |
| Fonts                        | `index.html` (Google Fonts links)  |

All user-facing strings — labels, button text, error messages, countdown
units — are defined in `src/config/invitation.ts` and typed in `src/types.ts`.
Theme tokens in `src/theme/tokens.css` are wired into Tailwind v4 via
`src/theme/theme.css` (`@theme inline`).

## Notes

- Gallery images, background music, and the map embed are **hot-linked CDN
  assets** (verified working). Replace the URLs in
  `src/config/invitation.ts` to use your own.
- RSVP and Guestbook are **non-persisting stubs**: submissions live in memory
  only and reset on reload. Wire them to a backend of your choice in
  `src/components/sections/Rsvp.tsx` / `Guestbook.tsx`.