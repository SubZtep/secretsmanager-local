FROM node:18.4-alpine3.16@sha256:7ae41699c38d8e50f5bf592867cf661368d71ff922e07f6f66f36dca2ff0c590
USER node
ENV SERVER_PORT=7000
ENV SECRET_NAME=test
ENV SECRET_STRING=
WORKDIR /home/node
COPY --chown=node:node [".", "./"]
EXPOSE ${SERVER_PORT}
CMD ["node", "index.js"]
