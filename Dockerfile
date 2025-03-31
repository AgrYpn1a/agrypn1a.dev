# https://hub.docker.com/_/node
FROM node:20-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Copy local code to the container image.
COPY . ./

# Install production dependencies.
RUN apk add --no-cache git
RUN npm install --only=production

# Fetch the content repp
RUN mkdir -p ./public/org/
RUN git clone https://github.com/AgrYpn1a/my-org.git ./public/org/

RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "start" ]
