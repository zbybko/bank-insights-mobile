# Bank Insights · Mobile

**A React Native iPhone client for understanding bank transactions.**

Built with Expo SDK 57, React Native 0.86, React 19 and TypeScript. The current
screen fetches completed transactions from a Java/Spring Boot API and displays
their descriptions, booking dates, currency and exact amount strings.

The direction is an account connection flow, currency-separated spending
dashboards, and explainable AI category suggestions. These are planned; the
current app is a local-development transaction feed. Independent project; not
affiliated with Revolut or any other bank.

**Companion:** [Java / Spring Boot backend API](https://github.com/zbybko/bank-insights-backend).

**Legacy implementation:** [Python bank-insights](https://github.com/zbybko/bank-insights).

[Mobile checklist](docs/ROADMAP.md) · [Development workflow](CONTRIBUTING.md)

## Current behavior

- Fetches `GET /api/transactions` when the screen mounts.
- Loading indicator, error message, empty state and transaction count.
- Transaction cards with description, local booking timestamp and currency.
- Distinguishes negative and nonnegative amounts visually without doing money
  arithmetic in JavaScript. "Money in" is not necessarily income.
- Aborts the request when the effect is cleaned up.
- User-facing interface text is English; bank descriptions retain their original text.

There is one screen in `App.tsx`. No account login, bank connection, on-device CSV
upload, persistent/offline cache, dashboard, category editing or AI is present.
Bank/model API credentials belong on the server, never in the app bundle.

## Run on an iPhone

Requires Node 22.13 or later and an Expo Go version compatible with SDK 57.
Commands below run from the mobile repository root.

1. Start the companion backend with a local CSV. For a shared demo, use synthetic
   transactions; the backend does not include that demo file yet.
2. Put the Mac and phone on a mutually reachable trusted network. If university
   Wi-Fi isolates devices, a personal hotspot may work.
3. Open `http://YOUR_MAC_LAN_IP:8080/api/transactions` in iPhone Safari. The
   backend must allow LAN access. `localhost` on the phone means the phone.
4. In `App.tsx`, replace the current hardcoded development URL with that address.
   Moving the URL to configuration is task F-02; it is not implemented yet.
5. Install and start:

```bash
npm ci
npx expo login
npx expo start --lan
```

Sign in to Expo Go using the same account and scan the QR code with the iPhone
camera. Allow Local Network access if prompted. Keep Metro and the Java backend
running in separate terminals. An Expo tunnel exposes Metro, not the Java API.

Native installation through Xcode is a later task. Expo Go testing does not mean
this repository already contains a signed standalone iPhone application.

## Data contract

```ts
type Transaction = {
  description: string;
  currency: string;
  state: string;
  amount: string;
  fee: string;
  bookingDate: string;
};
```

Money remains decimal strings. Displayed timestamps currently replace the ISO
`T` separator with a space; the value has no timezone and must not be silently
converted to a UTC instant. Stable transaction IDs are not available yet, so the
list currently uses temporary index keys. API ownership belongs to the backend;
coordinate changes across both repositories.

## Verification and next steps

```bash
npx tsc --noEmit
```

TypeScript checking is available. Lint configuration, automated screen tests and
CI are not configured yet. Manually verify successful loading, stopped-backend
errors, empty results, long descriptions, large amounts and scrolling on iPhone.
No screenshot or automated UI-test result is claimed here.

First make the feed robust and reproducible, then add month/currency filters and
deterministic charts. Connect-account and AI-review screens come after their
backend contracts exist. See the [checklist](docs/ROADMAP.md).

## Suggested first dashboards

- Monthly money in/out/net per currency, clearly labeled as cash flow.
- Spending by category, including uncategorized transactions.
- Merchant totals and a month-to-month trend with an explicit date range.

Totals come from the backend. AI can help explain facts and suggest categories;
it must not invent transactions or calculate authoritative financial totals.
