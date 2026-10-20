# Mobile checklist

Checked items describe the inspected implementation on 2026-10-16. Open items
are proposed work. The backend checklist uses IDs B-XX; this checklist uses F-XX.
Backend dependencies refer to tasks in the companion repository.

## Current prototype

- [x] Expo / React Native / TypeScript app running on the owner's iPhone.
- [x] GET request to the Java transaction endpoint.
- [x] Loading, error and empty-list states.
- [x] Transaction cards, local booking timestamp and transaction count.
- [x] Decimal strings preserved in presentation; English UI labels.

## M0 — Reproducible, maintainable client

- [ ] **F-01 · Extract boundaries.** Move transaction types, HTTP client and row
  component out of App.tsx when doing the next feature; preserve current behavior.
  No speculative screens or framework layers.
- [ ] **F-02 · API configuration.** Replace the hardcoded LAN IP with a documented
  `EXPO_PUBLIC_API_URL` and ignored local config. Validate the address, document
  Expo restart requirements, and never put secrets in EXPO_PUBLIC variables.
- [ ] **F-03 · Resilient requests.** Runtime response validation, finite timeout,
  abort handling, safe error messages, visible retry and pull-to-refresh. Distinguish
  initial loading, refreshing with old data, empty results and connection failure.
- [ ] **F-04 · Device layout/accessibility.** Real safe-area insets instead of a
  fixed top padding; test notches, text scaling, dark mode, long merchant names,
  large amounts, contrast and non-color-only meaning. Use stable IDs after B-12.
- [ ] **F-05 · Quality checks.** Configure ESLint deliberately, add client/state/
  row tests with fictional data, and run lint/typecheck/tests in PR CI.
- [ ] **F-06 · Portfolio demo.** Capture synthetic-data screenshots and a short
  demo, then update README. Add screenshots only after the corresponding UI exists.

## M1 — Reliable transaction browsing

- [ ] **F-07 · CSV import UI** (B-11). Choose a file, show import progress/result,
  inserted/duplicate counts and safe row errors. Handle cancellation and size limits.
- [ ] **F-08 · Filters/pagination** (B-12). Account, month and currency selectors;
  clear filters, reset pagination safely, and keep old requests from overwriting
  the newly selected filter. Add stable keys rather than index keys.
- [ ] **F-09 · Details.** Description, date, amount, fee and source/account label;
  distinguish own transfers/refunds once the backend provides those semantics.
  Never infer a category or account balance from amount sign alone.

## M2 — Account connection and synchronization

- [ ] **F-10 · Authentication** (B-13). Follow the agreed backend auth flow;
  appropriate device token storage, logout and expired-session behavior.
- [ ] **F-11 · Connect account** (B-06/B-14). Follow the chosen provider's approved
  authorization/redirect flow. The app never asks for bank passwords or embeds
  provider secrets. Handle cancellation, failed callbacks and expired consent.
- [ ] **F-12 · Sync status** (B-15/B-16). Last successful refresh, stale-data label,
  manual sync, in-progress state, retry and re-consent. A failed refresh must not
  erase the last successful feed or falsely claim the account is up to date.
- [ ] **F-13 · Disconnect/data controls** (B-14). Explain consequences, confirm
  disconnect, and reflect the backend's data retention/deletion behavior.

## M3 — Dashboards with honest numbers

- [ ] **F-14 · Monthly overview** (B-17). Backend-calculated in/out/net, selected
  currency/month and comparison period. Show loading, empty and unavailable states.
- [ ] **F-15 · Category breakdown** (B-18/B-19). Clear category labels, uncategorized
  bucket and drill-down to matching transactions. Provide textual values as well
  as a chart; do not combine currencies in one total.
- [ ] **F-16 · Trends and merchants** (B-19). Monthly chart and merchant ranking
  with clear axes, currency and date range. Do not interpret missing data as zero.
- [ ] **F-17 · Recurring-payment candidates** (B-20). Show why a payment was flagged
  and allow confirmation/dismissal. Do not label a candidate as a certain subscription.

## M4 — AI review and grounded explanations

- [ ] **F-18 · Opt-in disclosure** (B-21). Explain which data is sent and for what
  purpose before real-data AI processing; browsing works without opting in.
- [ ] **F-19 · Category review** (B-22/B-23). Display suggested vs user-confirmed
  labels and uncertainty/review states. Make corrections easy and preserve them
  after another model run. Never present confidence as guaranteed correctness.
- [ ] **F-20 · Insights cards** (B-25). Explain verified backend aggregates with
  period/currency and links to supporting transactions. Show no-result/error states;
  no authoritative AI-generated arithmetic or fabricated financial claims.

## Release and collaboration

- [ ] **F-21 · Native iPhone build.** Document and validate a local Xcode build on
  a physical iPhone; verify file picking, network permissions and configured API.
- [ ] **F-22 · Two-repository demo.** Follow both READMEs from clean clones using
  synthetic data; publish reciprocal links and record compatible release versions.

For each task: understand it, implement it yourself, test the relevant behavior,
and ask for review. A task is done when behavior works, not when the file exists.
