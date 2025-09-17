---
applyTo: "**/*.{test,spec}.{js,jsx,ts,tsx}"
---

# Unit/Integration Test Guidelines

- Prefer **Vitest** or **Jest** matchers already in use.
- Arrange/Act/Assert; keep tests deterministic and isolated.
- For React code: use @testing-library; do not test implementation details.
- Mock external I/O (network, storage) and assert on visible behavior.
- Name files `*.test.ts` near the code they verify; keep test names descriptive.