ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
# ENV NODE_ENV=production


WORKDIR /usr/src/app


# Run the application as a non-root user.
# USER node

COPY package.json .
RUN npm install


# Copy the rest of the source files into the image.
COPY . .
RUN npm run build
# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm","start"]