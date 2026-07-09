# backend/Dockerfile

# Этап сборки
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package файлы и устанавливаем зависимости
COPY backend/package*.json ./
RUN npm ci

# Копируем исходный код и собираем
COPY backend/ .
RUN npm run build

# Финальный образ
FROM node:18-alpine

WORKDIR /app

# Копируем собранный код и данные
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/data ./data

# Открываем порт
EXPOSE 4000

# Указываем, что используем npm (для Railway)
ENV NPM_CONFIG_PRODUCTION=true

# Запускаем сервер
CMD ["node", "dist/index.js"]