ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine As build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY ./ .

RUN npm run build

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

# Copy necessary files from build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/bin ./bin
COPY --from=build /app/public ./public
COPY --from=build /app/views ./views
COPY --from=build /app/package.json ./

EXPOSE 3000

CMD [ "npm","start" ]