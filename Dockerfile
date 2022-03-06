FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm update

COPY client/package*.json client/
RUN npm run i-client --only=production

COPY server/package*.json server/
RUN npm run i-server --only=production

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD ["npm", "start","--prefix", "server"]

EXPOSE 8000