FROM node:lts-alpine

ENV NODE_ENV=development

# set this env explicitly to disable bluebird debug output 
# see: https://npm.community/t/npm-ci-produces-a-tonn-of-excess-warnings-on-install/3261
# see: http://bluebirdjs.com/docs/api/environment-variables.html
ENV BLUEBIRD_DEBUG=0

RUN apk add --no-cache git openssh-client

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait


RUN mkdir -p /usr/src/app 
WORKDIR  /usr/src/app
RUN mkdir src test fixtures api
RUN chown -R node:node /usr/src/app

USER node

ADD package.json /usr/src/app/package.json
ADD package-lock.json  /usr/src/app/package-lock.json

RUN npm ci 
#; npm run postinstall

EXPOSE 3030

## Launch the wait tool and then your application
CMD /wait && npm run dev