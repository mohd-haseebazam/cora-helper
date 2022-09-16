# https://wkrzywiec.medium.com/build-and-run-angular-application-in-a-docker-container-b65dbbc50be8

### STAGE 1: Build ###
FROM node:18.7.0-bullseye AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.23.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/cora-helper /usr/share/nginx/html

