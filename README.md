# FrontDesk landing page

Vite, React, TypeScript and Tailwind v4. Start the preview with:

```sh
npm install
npm run dev -- --port 5183 --host 127.0.0.1
npm run build
npm run lint
```

The page leads with integrated payment collection and automatic reconciliation. Owner/tenant assistants are the second main feature. Screenshot reading is an optional alternative for payments outside the integration.

## Current page

- `src/components/site/hero.tsx`: original GLSL hills, short collection-led headline, original Inter treatment.
- `src/components/product/collections.tsx`: interactive sample payment and ledger update, with reset and timer cleanup.
- `src/components/product/assistant-showcase.tsx`: owner/tenant assistant examples.
- `src/components/product/operations.tsx`: supporting features and implementation setup.
- `src/components/product/page-end.tsx`: FAQ and enquiry draft.
- `src/index.css`: light atmospheric design system and responsive layouts.

Previous UI components remain available under `src/components/ui`, but are no longer the page's main feature presentation.

## Before publishing

Set `VITE_CONTACT_EMAIL` to the real enquiry destination. The existing fallback, `hello@frontdesk.app`, is a placeholder. The form opens a mail draft; it does not store or send a submission itself.

The collection demo is a local simulation: no payment providers, credentials or real transfers are connected. Provider integrations must be implemented in the product backend; their availability and merchant eligibility should be checked per client and market. Never place provider secrets in Vite environment variables.

The Three.js hero is lazy-loaded, pauses offscreen, and has a static fallback when WebGL is unavailable. Motion respects reduced-motion preferences.
