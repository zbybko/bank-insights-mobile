# Bank Insights · Mobile

Expo SDK 58 / React Native / TypeScript personal finance app, using the approved
presentation's dark cosmic palette, glass-style controls and rounded cards.
[Companion Java backend](https://github.com/zbybko/bank-insights-backend).

## Current screens

- **Plan**: money received in the selected month, money out, net flow and category
  spending. No transaction list on the home screen.
- **Activity**: transactions for the selected month and currency, search, and a
  needs-review filter. Shows the clarification question when one exists.
- **Insights**: monthly cash flow, separately recorded fees and category spending.
- **Category detail**: spending total and matching outgoing transactions, with
  search and month switching.

Month and currency selection are shared across screens. Future months are
blocked; tap the month label to return to the current month. Additional currency
chips appear when a month contains more than one currency. Pull to refresh Plan
or transaction lists. Empty, loading and error states are explicit.

The visual reference is the existing `bank-insights-linkedin-wide` approved
composition. The selected wallpaper is Graphite Pearl, scaled to the screen
container with `cover`. Five generated background variants and their prompts
are kept in `assets/backgrounds/`. Nothing in the video source was edited.

## Run locally

Use Node 22.13+ (22.23.3 was used for verification), JDK/backend and Expo Go
compatible with SDK 58. No native directories need to be generated.

```bash
npm ci
npx expo start --lan
```

In LAN development, `src/config/api.ts` automatically uses Expo's host address
with backend port `8080`. Keep the phone and Mac on the same Wi-Fi, run the
backend on a network-accessible interface, and reconnect to Expo after changing
networks. No hard-coded Mac IP is needed.

To override this address (for example, for a hosted backend):

```bash
EXPO_PUBLIC_API_URL=https://your-backend.example.com npx expo start --lan
```

An existing `EXPO_PUBLIC_API_URL` in `.env` takes priority: remove it to use
automatic detection, then restart Expo. Expo tunnel mode does not expose backend
port `8080`; use a separate backend URL override for that mode. Release builds
require an explicit backend URL. Web development without an Expo host falls back
to `http://localhost:8080`. The URL is public configuration, not a secret.
Never include bank or model credentials in an `EXPO_PUBLIC_*` variable.

For web preview:

```bash
npx expo start --web --port 8082
```

The backend allows localhost web origins on 8081/8082 by default. Restart the
backend after adding the monthly summary endpoint if hot reload did not pick it
up. Restart Metro after the initial Expo Router installation/entry-point change.

## Data contract

- `GET /api/transactions`: persisted transactions and category/review fields.
- `GET /api/transactions/summary?month=YYYY-MM`: currency-separated monthly totals,
  category amounts, counts and category spending shares in basis points.

All monetary arithmetic is performed with `BigDecimal` on the backend. The app
validates responses and formats decimal strings without floating point money
conversion. Statement booking months use the source's timezone-free local date,
not a conversion to UTC.

Money in means all positive completed payments, including refunds and transfers;
it is not verified salary. Net flow is not an account balance. Category bars show
a share of actual outgoing payments, not an invented budget limit. Uncategorized
spending remains visible. Fees remain separate from the amount totals.

Budget limits, obligation schedules, balance forecasts, account connection,
category editing in the mobile UI and AI chat are not implemented yet. There are
no fake balances, fabricated bills or automatic model calls in this UI.

## Structure and checks

Routes are in `src/app/` (Expo Router); reusable native controls in `components`,
screens in `screens`, shared month/data state in `state`, theme tokens and category
styles in `theme`. API validation lives beside the HTTP client.

```bash
npx tsc --noEmit
npx expo lint
```

Web interaction checks verify navigation, category drill-down, month changes,
search and empty results. Native iOS/Android appearance still needs device review.
