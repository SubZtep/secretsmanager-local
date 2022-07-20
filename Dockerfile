FROM node:18-alpine

ENV SERVER_PORT 7000
ENV SECRET_NAME TestKeyFromTheMock
ENV SECRET_STRING {}
ENV SECRET_VERSION_ID 1.0
ENV SECRET_ARN arn:aws:iam:mock

WORKDIR /home/node
COPY --chown=node:node [".", "./"]
RUN ["chown", "-R", "node:node", "."]
USER node

EXPOSE ${SERVER_PORT}
CMD ["node", "index.js"]
