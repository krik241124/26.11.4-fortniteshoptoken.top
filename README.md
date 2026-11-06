# Fortnite Shop Token

Independent English-language guide at https://fortniteshoptoken.top.

Cloudflare Pages project: `fortniteshoptoken-top`.
Hosted site: https://fortniteshoptoken-top.pages.dev.
The GitHub integration is connected and production deployments are enabled for `main`.
The custom domain is registered with Pages; DNS activation is managed separately in Cloudflare.

## Local development

Use Node 20 and the committed npm lockfile:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Build with `npm run build`; the deployable static site is `out/`. Run `npm run typecheck` for TypeScript checking and `npm run test:tools` for the probability and date boundary checks. `next start` is not a static-export preview server.

## Routes

- `/` — answer hub and visible FAQ
- `/how-to-get-pirate-shop-token/`
- `/pirate-shop-token-drop-rate/` — hypothetical odds calculator
- `/best-farming-spots/`
- `/what-is-pirate-shop-token/`
- `/how-to-activate-pirate-shop-access/`
- `/fortnite-item-shop-today/` — searchable, dated shop inventory
- `/editorial-policy/` — evidence labels, methodology and corrections
- `/about/`, `/privacy/`, `/contact/`

Every indexable page has an independent title, description, self-canonical, one H1, and real anchor links. The guide pages include breadcrumbs and Article structured data. The homepage FAQ structured data matches visible questions; rich-result eligibility or ranking is not promised. Sitemap and robots are generated at build time.

## Cloudflare Pages

Connect the GitHub repository `krik241124/26.11.4-fortniteshoptoken.top`, production branch `main`:

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export), or None with the settings below |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | Repository root |
| Node version | 20 (`.nvmrc`) |

Do not select a server-side Next.js adapter. No Workers runtime, database or secrets are required for this static export. Cloudflare reads `_headers` and `_redirects` from `out`.

After the first successful Pages deployment, add `fortniteshoptoken.top` under the project's Custom domains. Follow the actual conflict shown in the dashboard. A public DNS lookup through Cloudflare proxy addresses cannot reveal the original A-record target. Do not infer which record to delete from the IP addresses alone. Preserve existing MX and email TXT records.

References:
- https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
- https://developers.cloudflare.com/pages/configuration/custom-domains/

## Analytics

The user-supplied scripts are installed once in `src/app/layout.tsx`, with Next Script `afterInteractive`:

- Google Analytics 4: `G-N1HG4MNBJ2`
- Microsoft Clarity: `z8aax1xzlf`

The privacy page describes both services. These IDs are public client identifiers, not secrets. Validate production data in each provider's dashboard after deployment; local QA does not establish receipt by those accounts.

## Content maintenance

Sources and shared metadata live in `src/lib/site.ts`. Reviewed date: 2026-11-04; only change it after an editorial review. Ordinary chest drops, squad sharing, two activations and the 14-day window are attributed to reporting or published in-game terms. The December 5 finale and December 15 activation deadline are separate events. The 2027 window remains subject to the dates shown in-game.

The 1/700,000 and 0.05% rates are explicitly unconfirmed. No chest-type probability table or guaranteed route is invented. The calculator uses `1 - (1 - p)^n` under independent, fixed-probability assumptions and is not an actual game prediction. No original chest-opening experiment has been conducted.

## Tool upgrade (2026-11-04)

- The homepage includes a working chest-count calculator, presets and a reset control.
- The full calculator accepts reported assumptions or a custom percentage. It separates the model probability for past openings from future-session probability. The expected additional wait is `1/p`, never `1/p - previous failures`.
- A calendar-based plan counts days from the selected start date up to, excluding, a target date. December 5 is the announced finale and a planning default, not a verified token drop cutoff. The initial static date is an editorial snapshot; after hydration, the start date uses the visitor's local calendar date.
- Two inline SVG figures and an HTML probability table use the same probability functions. Rates of 1/100,000 and 1/10,000 are explicitly illustrative; they are not chest-type estimates.
- The activation planner accepts UTC dates/times and adds 336 hours. The reported 2026 cutoff is December 16 at 00:00 UTC (December 15 at 18:00 GMT-6). It does not predict shop rotations, activate rewards or create reminders.
- Beebom citations link to its article, not an image CDN. No third-party map, game screenshot or asset was copied.
- `ContactEmail` uses Cloudflare's documented `email_off` HTML markers around every contact address. The zone-wide Email Obfuscation setting could not be accessed with the current OAuth authorization; the page-level exception is independent of that dashboard toggle.

Design references informed immediate tool feedback, reset/error states and decision tables. They did not establish gameplay facts, traffic performance or ranking claims. All dependency versions are unchanged.

The SVG token illustration, social preview and guide diagrams are original editorial graphics, not game screenshots. Guide diagrams are local; shop artwork comes from the third-party API's image servers. Contact: support@fortniteshoptoken.top (verify that the mailbox receives mail before public launch).

## Illustrated guides and shop MVP (2026-11-06)

Seven original 1200×675 WebP diagrams have captions, alt text and explicit dimensions. Rebuild them with `npm run images:guides`; their reproducible SVG sources are in `assets/diagrams/`. Each is under 150 KB. `logo-512.png` is generated from the original logo. Guide Article and Open Graph metadata use the matching illustration. WebSite, Organization and editorial identity are linked by stable IDs; information pages use WebPage types. Dates distinguish presentation changes from gameplay-source review. FAQ markup only describes visible questions; Google no longer displays FAQ rich results. `llms.txt` is a directory, not a Google ranking requirement.

The Item Shop page statically renders all offers in `src/data/item-shop.json`, including bundle contents and different cosmetic families. Search, filters, sort, budget, reset and countdowns work in the browser. V-Bucks prices are not converted to cash. The public third-party source is `https://fortnite-api.com/v2/shop?language=en`; it needs no key. Data is a snapshot, not an account or live checkout connection. Source time and retrieval time are displayed separately; older dates and expired offers are flagged.

Run `npm run update:shop` to fetch and validate a snapshot, then `npm run test:shop` and `npm run build`. `.github/workflows/update-shop.yml` requests an update daily at 00:15 UTC (08:15 China time) and also supports manual dispatch. GitHub schedules can be delayed. Valid changed data is committed to main and the existing Cloudflare integration deploys it. No change means no timestamp-only commit. Failed requests, empty/invalid data and older snapshots do not replace good data. Check the Action and Cloudflare deployment if the public timestamp stops advancing; this schedule is best effort, not an uptime guarantee. No historical pages or cosmetic detail-page sprawl are generated in this MVP.

Clarity's script element ID is `microsoft-clarity-bootstrap`. Do not change it to `clarity`: browser DOM named properties can expose that element as `window.clarity`, preventing the vendor bootstrap from creating its function. The project identifier remains `z8aax1xzlf`. Verify an actual successful POST to `/collect` after deployment, not just a 200 response for the tag script; dashboard receipt still needs account-side confirmation.

## Template migration

This repository was initialized independently from the user's supplied `krik241124/25.11.27-citybrawl.top` source at commit `5fe91c7242a236fff4f678acfd3c5dbebc2c6333`.

Dependencies and their locked versions were retained. The old tracking, advertising, game iframe, unrelated cards, remote images, legal text, icons and generated build files were removed. The local copied Git metadata and discarded files were archived outside this repository. The source repository was not modified.
