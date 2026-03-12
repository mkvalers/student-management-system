---
description: "Use when writing frontend React code, components, hooks, forms, API calls, routing, or state management. Covers the full frontend tech stack including TanStack Query, Zod, React Hook Form, React Router, Axios, and Zustand."
applyTo: "frontend/src/**"
---

# Frontend Stack Guidelines

## Tech Stack

| Concern                 | Library                                  |
| ----------------------- | ---------------------------------------- |
| UI Components           | React + shadcn/ui + Tailwind CSS         |
| Data Fetching & Caching | TanStack Query (`@tanstack/react-query`) |
| Form Management         | React Hook Form (`react-hook-form`)      |
| Validation              | Zod                                      |
| HTTP Client             | Axios                                    |
| Global State            | Zustand                                  |
| Routing                 | React Router                             |

## Forms

- Always use `react-hook-form` with `zodResolver` from `@hookform/resolvers/zod`
- Define Zod schemas before the component — export the inferred type: `type FormValues = z.infer<typeof schema>`
- Use `mode: 'onBlur'` unless the UX specifically requires `onChange`
- Never use uncontrolled inputs without `register()` or `Controller`

```ts
const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;
```

## Data Fetching

- All server state goes through TanStack Query — no raw `fetch`/`axios` calls inside components
- Define query and mutation functions in a dedicated service file (e.g. `src/services/auth.service.ts`)
- Use `queryKey` arrays that are descriptive and consistent: `['students', { page, filters }]`
- Handle `isPending`, `isError`, and `error` states explicitly

```ts
// src/services/auth.service.ts
export const login = (data: LoginValues) =>
  axios.post<JwtResponse>("/auth/login", data);

// In component
const { mutate, isPending } = useMutation({ mutationFn: login });
```

## HTTP Client

- Create a single Axios instance in `src/lib/axios.ts` with `baseURL` and interceptors
- Handle token attachment and 401 refresh logic in request/response interceptors
- Never instantiate `axios` directly in components or services — always import the shared instance

## Global State

- Use Zustand only for global client state (auth user, UI theme, etc.)
- Keep stores in `src/stores/` — one store per concern
- Avoid storing server state in Zustand; use TanStack Query for that

```ts
// src/stores/auth.store.ts
interface AuthStore {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}
```

## Application Architecture

- This is a **Single Page Application (SPA)** — all routing is client-side, no full page reloads
- The server serves a single `index.html`; React Router handles all navigation
- Use `history` mode routing (not hash-based)
- Keep the entry point lean — bootstrap only router, query client, and global providers in `main.tsx`

## Routing

- Use React Router v6+ with `createBrowserRouter` and `RouterProvider`
- Define routes in `src/routes/` — separate file per route group
- Use lazy loading for non-critical pages: `React.lazy(() => import('./pages/Dashboard'))`
- Protect authenticated routes with a `<PrivateRoute>` wrapper component

## File Structure

```
src/
  components/       # Reusable UI components
    ui/             # shadcn generated primitives
  pages/            # Route-level page components
  routes/           # Router definitions
  services/         # Axios API call functions
  stores/           # Zustand stores
  hooks/            # Custom React hooks
  lib/              # Shared utilities (axios instance, queryClient, etc.)
  schemas/          # Standalone Zod schemas (if shared across features)
```
