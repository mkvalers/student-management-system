# Copilot Response Guidelines

## Communication Style

- Give concise, direct answers — no preamble, no unnecessary explanation
- Skip obvious observations; get straight to the solution
- Prefer code over prose when the answer is code
- Do not add comments to code unless the logic is non-obvious

## Code Quality

- Write production-ready code by default — no TODOs, no mock stubs, no placeholder logic
- Follow scalable patterns: separate concerns, keep functions small and focused
- Never over-engineer; match complexity to the actual requirement

## Architecture — Layered Structure

Enforce a clear separation of layers in all generated code:

| Layer                   | Responsibility                                          |
| ----------------------- | ------------------------------------------------------- |
| **UI / View**           | Rendering and user interaction only — no business logic |
| **State / Store**       | Global client state management                          |
| **Service / API**       | All data fetching and external communication            |
| **Schema / Validation** | Input validation and type contracts                     |
| **Domain / Logic**      | Business rules, transformations, utilities              |

- Never mix fetching logic directly inside UI components
- Keep API calls in dedicated service files or custom hooks
- Keep validation schemas co-located with or separate from the form, never inline

## Documentation

- Add JSDoc docstrings to all exported functions, hooks, components, and types
- Format:
  ```ts
  /**
   * Brief description of what this does.
   *
   * @param paramName - Description of the param
   * @returns Description of the return value
   */
  ```
- Document non-obvious behavior, side effects, and important constraints
- Do not add docstrings to internal one-liners or self-explanatory helpers
