# Copilot: Repository Instructions

This repo is a JavaScript/TypeScript web app (React/Next.js). Copilot should follow these rules when proposing changes.

## Build & Test Commands
- Install deps: `npm ci`
- Lint: `npm run lint` (must pass)
- Typecheck: `npm run typecheck` (if present)
- Unit tests: `npm test` or `npm run test` (must pass)
- E2E (optional): `npm run e2e` (Cypress) if tests exist
- Production build: `npm run build`

> If a command is missing, prefer adding the script in `package.json` rather than inlining complex commands in CI.

## What good PRs look like
- Small, focused diffs that match the linked issue's acceptance criteria.
- Update or add tests for changed behavior.
- Keep accessibility in mind (semantic HTML, ARIA where needed).
- No secrets or hard-coded credentials. Use environment variables.
- Update README/docs when behavior or commands change.

## Coding standards
- Use ESLint + Prettier (existing config). Fix lint warnings where safe.
- Keep components small; prefer composition over deep prop drilling.
- For React:
  - Prefer functional components + hooks.
  - Use `useEffect` sparingly; lift state when it simplifies data flow.
  - Add `aria-*` labels and keyboard handling for interactive UI.
- For server code:
  - Validate inputs, handle errors, log meaningfully (no PII).
  - Write unit tests for nontrivial logic and add an integration test if endpoints change.

## Repository structure (guide, not strict)
- `app/` – Next.js app code (using app router)
- `lib/` – shared utilities and functions
- `public/` – static assets
- `cypress/` – E2E specs (if present)
- `tests/` or `__tests__/` – unit/integration tests

## Out of scope for Copilot
- Secrets management, auth keys, and production credential wiring.
- Risky schema/data migrations without explicit approval.
- Large rewrites or cross-repo refactors.

## Acceptance checklist for Copilot PRs
- [ ] All scripts above run cleanly in CI.
- [ ] New/changed code is covered by tests.
- [ ] A11y basics covered (labels, roles, focus order).
- [ ] README/docs updated if commands or behavior changed.