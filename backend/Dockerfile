FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY patches ./patches
RUN npm ci --omit=dev && npm cache clean --force

COPY . .

ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "server.js"]
