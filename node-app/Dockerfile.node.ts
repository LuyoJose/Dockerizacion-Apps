# Dockerfile.node.ts (multi-stage)
# Stage 1: build
FROM node:lts-slim AS builder
WORKDIR /app

# Copia sólo package.json/package-lock.json y tsconfig para aprovechar cache
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependencias (incluye dev para build)
RUN npm ci

# Copia el resto y compila
COPY . .
RUN npm run build

# Optimizar: instala sólo prod deps (si tu build los necesita, ajustar)
RUN npm prune --production

# Stage 2: runtime
FROM node:lts-slim AS runtime
WORKDIR /app

# Crea usuario no-root
RUN useradd --user-group --create-home --shell /bin/false appuser
USER appuser

# Copiar artefactos del builder
COPY --from=builder --chown=appuser:appuser /app/dist ./dist
COPY --from=builder --chown=appuser:appuser /app/package*.json ./

ENV NODE_ENV=production
EXPOSE 3000

# Healthcheck (ajusta URL/puerto según tu app)
HEALTHCHECK --interval=20s --timeout=3s --start-period=10s \
    CMD wget -q --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/index.js"]
