FROM node:14.9.0

ENV BIND_HOST=0.0.0.0
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

WORKDIR /usr/app

RUN npm install -g expo-cli

ENV PATH=$PATH:/home/node/.npm-global/bin

USER root

# gatsby https
RUN apt-get update \
 && apt install -y libnss3-tools \
 && rm -rf /var/lib/apt/lists/*

USER node