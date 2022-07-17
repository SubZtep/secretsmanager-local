FROM node:18-alpine
USER node
ENV SERVER_PORT=7000
ENV SECRET_NAME=test
ENV SECRET_STRING=
WORKDIR /home/node
COPY --chown=node:node [".", "./"]
EXPOSE ${SERVER_PORT}
CMD ["node", "index.js"]
