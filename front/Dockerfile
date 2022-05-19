# Builder container
FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm i 

ARG API_URL=backendurl
ENV REACT_APP_API_URL=${API_URL}

COPY . ./
RUN npm run build

# Actual container
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=builder /usr/src/app/build .
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
