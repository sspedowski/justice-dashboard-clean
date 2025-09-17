---
applyTo: "**/*.{tsx,jsx}"
---

# React Component Guidelines

- Functional components + hooks.
- Keep components focused; extract small pure helpers.
- Accessibility: use semantic elements, roles, labels, and keyboard nav.
- State: prefer local state; lift or context only when necessary.
- Styling: keep to existing system (e.g., Tailwind / CSS Modules) and avoid ad-hoc inline styles unless trivial.