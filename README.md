# MTT Scaffolding - Modern Turborepo Setup

A modern, opinionated Turborepo setup featuring domain-driven architecture, a design system with shadcn/ui components, and hot module reloading for optimal development experience.

## 🚀 Features

- **Domain-Driven Architecture**: Organized by business modules instead of technical layers
- **Modern UI System**: Custom shadcn/ui package with hot reloading
- **Full-Stack Monorepo**: Multiple apps sharing components and utilities
- **Developer Experience**: Hot module reloading across packages, TypeScript, and modern tooling
- **Production Ready**: Optimized builds with source file imports during development

## 📁 Project Structure

```
apps/
├── web/                    # React app with Vite + TanStack Router
│   ├── src/
│   │   ├── modules/        # Domain-driven modules
│   │   │   ├── form/       # Form-related components, routes, hooks
│   │   │   ├── query/      # Query demo and related features
│   │   │   └── dashboard/  # Dashboard functionality
│   │   ├── shared/         # Shared components and utilities
│   │   └── integrations/   # Third-party integrations (TanStack Query, etc.)
│   └── ...
├── docs/                   # Documentation app
└── ...

packages/
├── mtt-ui/                 # Custom shadcn/ui component library
│   ├── src/
│   │   ├── components/     # shadcn/ui components
│   │   ├── lib/           # Utilities (cn, etc.)
│   │   └── hooks/         # Shared hooks
│   └── ...
├── eslint-config/         # Shared ESLint configurations
├── typescript-config/     # Shared TypeScript configurations
└── tailwind-config/      # Shared Tailwind configurations
```

## 🛠 Tech Stack

### Frontend

- **React 19** with modern hooks and patterns
- **Vite** for fast development and building
- **TanStack Router** for type-safe routing
- **TanStack Query** for server state management
- **TanStack Form** for form handling with validation

### UI & Styling

- **shadcn/ui** components (custom package)
- **Tailwind CSS 4** for styling
- **Radix UI** primitives for accessibility
- **Lucide Icons** for consistent iconography

### Development

- **TypeScript 5.8** for type safety
- **ESLint 9** for code linting
- **Turborepo** for monorepo management
- **pnpm** for package management
- **tsup** for TypeScript compilation

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mtt-scaffolding

# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

### Available Scripts

```bash
# Development
pnpm dev          # Start all apps in development mode
pnpm dev:web      # Start only the web app
pnpm dev:docs     # Start only the docs app

# Building
pnpm build        # Build all apps and packages
pnpm build:web    # Build only the web app

# Linting & Type Checking
pnpm lint         # Lint all packages
pnpm typecheck    # Type check all packages

# UI Package Development
pnpm --filter @repo/mtt-ui dev:components  # Watch UI components
pnpm --filter @repo/mtt-ui build:components # Build UI components
```

## 🎨 UI Package Features

The `@repo/mtt-ui` package provides:

- **Hot Reloading**: Source file imports during development
- **Production Optimized**: Built files for production
- **Type Safety**: Full TypeScript support with proper exports
- **Clean Imports**: Short import paths (`@repo/mtt-ui/button`)
- **Accessibility**: Built on Radix UI primitives

### Import Examples

```typescript
// Components
import { Button } from "@repo/mtt-ui/button";
import { Card, CardContent } from "@repo/mtt-ui/card";

// Utilities
import { cn } from "@repo/mtt-ui/utils";

// Hooks
import { useIsMobile } from "@repo/mtt-ui/use-mobile";
```

## 🏗 Architecture Principles

### Domain-Driven Modules

Instead of organizing by technical layers (`components/`, `hooks/`, `utils/`), we organize by business domains:

```
modules/
├── form/           # Everything related to forms
│   ├── components.tsx
│   ├── hooks.ts
│   ├── context.ts
│   └── *.route.tsx
├── user/           # User management features
└── product/        # Product-related features
```

### Package Export Conditions

The UI package uses export conditions for optimal DX:

```json
{
  "./button": {
    "source": "./src/components/button.tsx", // Development (hot reload)
    "types": "./src/components/button.tsx",
    "import": "./dist/components/button.mjs", // Production (optimized)
    "require": "./dist/components/button.js"
  }
}
```

## 🔧 Development Workflow

1. **Add New Components**: Place in appropriate module or shared directory
2. **UI Components**: Add to `packages/mtt-ui/src/components/`
3. **Export Updates**: Update `packages/mtt-ui/package.json` exports
4. **Hot Reloading**: Changes reflect immediately during development
5. **Production**: Run builds for optimized output

## 📚 Learn More

- [Turborepo Documentation](https://turborepo.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Documentation](https://tanstack.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
