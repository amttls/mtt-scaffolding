FROM node:18-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Install turbo globally
RUN npm install -g turbo@^2
COPY . .

# Generate a partial monorepo with a pruned lockfile for the API workspace
RUN turbo prune api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm and turbo globally
RUN npm install -g pnpm@10.12.4 turbo@^2

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .

# Uncomment these lines when you want to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM
# ARG TURBO_TOKEN  
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN turbo run build

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 apiuser

# Copy the entire workspace (like the official example)
COPY --from=installer --chown=apiuser:nodejs /app .

USER apiuser

# Expose the port your API runs on
EXPOSE 3001

# Start the API
CMD ["node", "apps/api/dist/src/index.js"]
