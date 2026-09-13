# TaskFlow frontend

React + TypeScript + Vite, with Tailwind CSS and React Router.

## Development

Run these commands from `frontend/` using a Node.js version supported by Vite:

```sh
npm ci
npm run dev
```

On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`.

## Checks

```sh
npm run lint
npm run build
npm run preview
```

The build runs TypeScript checking before generating `dist/`.

## Structure

- `src/components/ui`: reusable UI components.
- `src/components/layout`: shared layout components.
- `src/features/auth`, `projects`, `tasks`, `teams`: feature-specific code.
- `src/pages`: route entry components; currently one temporary placeholder.
- `src/layouts`: page layouts.
- `src/services`: API clients and external service integrations.
- `src/store`: shared state when needed.
- `src/hooks`, `src/types`, `src/utils`: shared hooks, types, and utilities.

Empty directories are tracked with `.gitkeep`; remove these files when adding code.
Keep feature-specific components, hooks, and types inside their feature directory.

## Routing and styling

`src/main.tsx` provides BrowserRouter and imports the global stylesheet.
`src/App.tsx` defines temporary routes for `/`, `/login`, `/register`, and
`/dashboard`, plus a not-found fallback. These routes have no authentication
or application behavior yet.

Tailwind is configured through the Vite plugin and `src/index.css`.

## Deployment

Build and serve `dist/` with a production static host. Configure an SPA fallback
to `index.html` for frontend routes so direct visits and refreshes work.
`npm run preview` is for local build verification.
