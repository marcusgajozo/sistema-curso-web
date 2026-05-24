FROM node:22-alpine AS base
RUN npm install -g pnpm

FROM base AS deps
WORKDIR /web
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /web
COPY --from=deps /web/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM nginx:alpine AS runner
COPY --from=builder /web/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY env.sh /docker-entrypoint.d/40-env.sh
RUN chmod +x /docker-entrypoint.d/40-env.sh
CMD ["nginx", "-g", "daemon off;"]