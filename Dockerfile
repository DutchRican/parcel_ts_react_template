FROM node:alpine3.13 as build
RUN apk add --no-cache python3 g++ make util-linux
WORKDIR /app
COPY . .
RUN npm i && \
    npm run build && \
    npm prune --production 

CMD ["npm", "start"]