
FROM node:alpine

WORKDIR /app/doofmanager

COPY . .

RUN npm install

RUN npm run build

EXPOSE 5173

CMD ["npx", "http-server", "./dist", "-p 5173"]