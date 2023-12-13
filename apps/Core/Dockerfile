FROM node:16

WORKDIR /app

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/api/core/version || exit 1

COPY ./mongo.crt /app/mongo.crt
COPY ./dist/index.cjs /app/index.cjs

CMD ["node", "./index.cjs"]