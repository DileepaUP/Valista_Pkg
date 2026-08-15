# Single build stage carrying full node_modules (incl. devDependencies like
# tsx and prisma CLI) into the runtime image — deliberately not using
# `output: "standalone"` so `npx prisma migrate deploy`, `npm run create-admin`,
# and `npm run seed-*` all work inside this same container/image, not just
# `next start`.
FROM node:22-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=base --chown=nextjs:nodejs /app ./
USER nextjs

EXPOSE 3000
CMD ["npm", "run", "start"]
