FROM node:14.9.0

EXPOSE 8080

COPY --chown=node:node package.json /usr/app/

USER node

WORKDIR /usr/app

RUN npm install