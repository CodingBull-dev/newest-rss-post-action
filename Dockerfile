FROM node:18 as Builder

WORKDIR /action

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN ls .

FROM node:18-slim

COPY --from=Builder /action/dist /action

ENTRYPOINT ["node", "/action/index.js"]
