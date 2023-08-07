
FROM node:alpine

WORKDIR /app/doofmanager

COPY . .

RUN npm install


#RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "start"]