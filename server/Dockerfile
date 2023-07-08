FROM node:18-alpine3.18 AS base
RUN corepack enable && corepack prepare pnpm@8.6.6 --activate

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY pnpm-workspace.yaml pnpm-workspace.yaml
COPY server server
RUN pnpm i
RUN pnpm --filter server run build

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 fone
RUN adduser --system --uid 1001 fone
USER fone
COPY --from=builder /app . 
CMD node server/dist
