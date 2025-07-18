ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine AS build

# WORKDIR /app

# COPY package.json .
# COPY package-lock.json .

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ .

RUN npm run build

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

# Copy necessary files from build stage
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/bin ./bin
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/views ./views
COPY --from=build /usr/src/app/package.json ./

EXPOSE 3000

CMD [ "npm","start" ]