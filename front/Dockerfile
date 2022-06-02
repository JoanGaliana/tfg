# Builder container
FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci 

ARG API_URL=backendurl
ENV REACT_APP_API_URL=__API_URL__

COPY . ./
RUN npm run build

# Actual container
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=builder /usr/src/app/build .
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["/bin/sh", "-c", "sed -i 's|__API_URL__|'\"$API_URL\"'|g' /usr/share/nginx/html/static/js/main.*.js ; exec  nginx -g 'daemon off;'"]