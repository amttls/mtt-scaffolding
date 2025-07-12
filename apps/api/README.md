# API - Type-Safe REST API with OpenAPI

A modern, type-safe REST API built with Hono and automatic OpenAPI documentation generation.

## 🚀 Features

- **Type Safety**: Full TypeScript support with Zod schema validation
- **OpenAPI Documentation**: Automatic API documentation generation
- **Domain-Driven Architecture**: Organized by business modules
- **Database Integration**: Drizzle ORM with PostgreSQL support
- **Development Experience**: Hot reloading and comprehensive error handling

## 🛠 Tech Stack

- **[Hono](https://hono.dev/)** - Fast, lightweight web framework
- **[@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)** - Type-safe API routes with OpenAPI generation
- **[Zod](https://zod.dev/)** - Runtime type validation and schema generation
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe SQL ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Primary database
- **[@scalar/hono-api-reference](https://github.com/scalar/scalar)** - Beautiful API documentation UI

## 📁 Project Structure

```
src/
├── modules/                 # Domain-driven API modules
│   ├── user/               # User management
│   │   ├── user.handlers.ts    # Route handlers
│   │   ├── user.router.ts      # Router configuration
│   │   ├── user.routes.ts      # Route definitions
│   │   └── user.schema.ts      # Zod schemas
│   └── example/            # Example API routes
│       └── example.route.ts
├── shared/                 # Shared utilities and configuration
│   ├── db/                 # Database configuration
│   ├── env.ts              # Environment variables
│   ├── http/               # HTTP utilities
│   ├── lib/                # Core utilities
│   │   ├── configure-open-api.ts  # OpenAPI setup
│   │   ├── create-app.ts          # App factory
│   │   ├── create-router.ts       # Router factory
│   │   └── types.ts               # Shared types
│   ├── middlewares/        # Custom middleware
│   └── openapi/            # OpenAPI helpers and schemas
├── app.ts                  # Application setup
└── index.ts                # Server entry point
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended)

### Installation

```bash
# Install dependencies (from project root)
pnpm install

# Copy environment variables
cp .env.example .env

# Configure your database connection in .env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

### Development

```bash
# Start the API server
pnpm run dev --filter=api

# The API will be available at:
# - API: http://localhost:3000
# - OpenAPI Docs: http://localhost:3000/reference
```

### Available Scripts

```bash
# Development
pnpm run dev              # Start with hot reloading

# Building
pnpm run build            # Build for production
pnpm run start            # Start production server

# Type Checking
pnpm run check-types      # Type check without building
```

## 📚 API Documentation

The API automatically generates OpenAPI documentation accessible at `/reference` when running in development mode.

### Key Endpoints

- `GET /v1/users` - List all users
- `GET /v1/users/:id` - Get user by ID
- `POST /v1/users` - Create new user
- `PATCH /v1/users/:id` - Update user
- `DELETE /v1/users/:id` - Delete user

## 🏗 Architecture

### Type-Safe Routes

Routes are defined using `@hono/zod-openapi` for automatic type safety and OpenAPI generation:

```typescript
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

const getUserRoute = createRoute({
  method: "get",
  path: "/users/{id}",
  request: {
    params: z.object({
      id: z.string().min(1).openapi({
        param: {
          name: "id",
          in: "path",
        },
      }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "User details",
    },
  },
});
```

### Domain-Driven Modules

Each business domain has its own module with:

- **Schemas** (`*.schema.ts`) - Zod validation schemas
- **Routes** (`*.routes.ts`) - Route definitions with OpenAPI specs
- **Handlers** (`*.handlers.ts`) - Business logic implementation
- **Router** (`*.router.ts`) - Router setup and middleware

### Database Integration

Uses Drizzle ORM for type-safe database operations:

```typescript
import { db } from "@/shared/db";
import { users } from "@/shared/db/schema";

export const getUser = async (id: string) => {
  return await db.select().from(users).where(eq(users.id, id));
};
```

## 🔧 Adding New Endpoints

1. **Create Module Structure**:
   ```bash
   mkdir src/modules/feature
   touch src/modules/feature/{feature.schema.ts,feature.routes.ts,feature.handlers.ts,feature.router.ts}
   ```

2. **Define Schemas** (`feature.schema.ts`):
   ```typescript
   import { z } from "zod";
   
   export const FeatureSchema = z.object({
     id: z.string(),
     name: z.string(),
   });
   ```

3. **Create Routes** (`feature.routes.ts`):
   ```typescript
   import { createRoute } from "@hono/zod-openapi";
   
   export const getFeatureRoute = createRoute({
     // Route definition
   });
   ```

4. **Implement Handlers** (`feature.handlers.ts`):
   ```typescript
   export const getFeatureHandler = async (c) => {
     // Business logic
   };
   ```

5. **Register Router** in `app.ts`:
   ```typescript
   import featureRouter from "@/modules/feature/feature.router";
   
   const routes = [featureRouter, /* other routes */];
   ```

## 🌐 Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Server
PORT=3000
NODE_ENV=development

# API
API_VERSION=v1
```

## 📖 Learn More

- [Hono Documentation](https://hono.dev/)
- [Zod Documentation](https://zod.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [OpenAPI Specification](https://swagger.io/specification/)