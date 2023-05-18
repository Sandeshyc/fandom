#  Official Node.js Base Image (https://hub.docker.com/_/node/)
FROM public.ecr.aws/docker/library/node:16.20.0-alpine3.16


# Create App Directory
RUN mkdir appweb
WORKDIR /appweb
COPY . /appweb

# Install Dependencies
RUN rm package-lock.json
RUN npm cache verify
RUN npm install --no-optional --legacy-peer-deps
RUN npm install -D @swc/cli @swc/core


# Run Test Suite
#RUN npm run test

# Run Build
RUN  npm run build


# Open Port(s)
EXPOSE 3000

# Docker Run Entry
CMD APP_DIR=appweb PORT=3000 npm start
