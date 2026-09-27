# ─── Build stage ───────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies (fresh resolution, no lockfile required)
COPY package.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Build the Next.js standalone application
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ─── Runtime stage ─────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
# Railway injects PORT automatically (defaults to 3000)
ENV PORT=3000

# Standalone output already bundles static assets & public dir
COPY --from=builder /app/.next/standalone ./

EXPOSE 3000
CMD ["node", "server.js"]
