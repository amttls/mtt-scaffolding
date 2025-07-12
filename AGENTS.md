# Agent Guidelines for MTT Scaffolding

## Build/Lint/Test Commands

- **Build**: `turbo build` (optimized parallel build)
- **Dev**: `turbo dev` (starts all apps in dev mode)
- **Lint**: `turbo lint` (parallel lint across apps)
- **Type Check**: `turbo check-types` (parallel type checking)
- **Format**: `turbo format` (prettier format - root only)
- **Test**: `turbo test --filter=web` (vitest for web app)
- **Single App**: Use `--filter` flag (e.g., `turbo dev --filter=api`)
- **Single Test**: `cd apps/web && pnpm vitest run <test-file>`

## Code Style Guidelines

- **Package Manager**: Use `pnpm` exclusively
- **TypeScript**: Strict mode enabled, use explicit types
- **Imports**: Use path aliases (`@modules/`, `@shared/`) in API, relative imports in web
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Components**: Use React.FunctionComponent type. 
- **API Routes**: Use Hono with zod-openapi, export default router
- **Error Handling**: Use structured error responses with proper HTTP status codes
- **Formatting**: Prettier with Tailwind plugin, no semicolons preference
- **ESLint**: Uses shared configs, warnings-only mode enabled
