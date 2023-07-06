FROM node:18-alpine3.18 AS base
RUN corepack enable && corepack prepare pnpm@8.6.6 --activate

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN pnpm i
RUN pnpm --filter server run db:generate
RUN pnpm --filter client run build

FROM nginx:1.23.3-alpine AS runner
WORKDIR /app
COPY --from=builder /app/client/dist /usr/share/nginx/html
COPY .deploy/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
