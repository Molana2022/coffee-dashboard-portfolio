FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm i -g json-server@0.17.4

COPY db.json ./db.json
COPY routes.json ./routes.json

EXPOSE 3001

CMD ["sh", "-c", "json-server --watch db.json --routes routes.json --host 0.0.0.0 --port 3001"]
