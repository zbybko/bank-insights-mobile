# Development and learning workflow

The owner writes the application and makes material architecture choices.
Assistant help is for explanation, bounded examples, review and verification,
not automatically completing the implementation.

- Pick a task from `docs/ROADMAP.md` and agree on acceptance criteria.
- Use small feature branches and descriptive commits.
- Discuss significant alternatives before adding libraries or changing structure.
- Follow `AGENTS.md`; use Expo-compatible package versions and read matching docs.
- Keep UI text, identifiers and repository documentation in English.
- Keep financial calculations on the backend; preserve money strings in the UI.
- Verify loading, error, empty, success and cancellation behavior with fake data.
- Once configured, run lint, typecheck and relevant tests before opening a PR.
- Link the companion backend issue/PR when the API changes. A TS type is not
  runtime validation; coordinate both sides of the contract.
- Use only synthetic screenshots/fixtures and keep credentials off the client.

Before merge, explain the behavior and failure cases yourself. Reuse the PR
template to document the actual change and actual validation, without invented
test results or unsupported production claims.
