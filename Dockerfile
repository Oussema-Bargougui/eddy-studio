# syntax=docker/dockerfile:1

# ---- 1. Build: compile the app (types are checked by `pnpm build`) ----------
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
# Dependencies first, so this layer is reused while only the code changes.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# ---- 2. Serve: a small nginx with the compiled files only -------------------
FROM nginx:1.27-alpine
# nginx's entrypoint fills /etc/nginx/templates/*.template from the environment.
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
# Runs before the template step: validates EDUCAP_ORIGINS and writes /config.js.
COPY docker/15-eddy-config.sh /docker-entrypoint.d/15-eddy-config.sh
RUN chmod +x /docker-entrypoint.d/15-eddy-config.sh
COPY --from=build /app/dist /usr/share/nginx/html

# EduCap addresses allowed to embed Eddy Studio (space-separated).
# Override per environment: docker run -e EDUCAP_ORIGINS="https://www.educap.io" …
ENV EDUCAP_ORIGINS="http://localhost:3002 http://localhost:3001"

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://127.0.0.1/healthz || exit 1
