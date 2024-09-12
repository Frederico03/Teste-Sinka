FROM node:20.11.1

WORKDIR /usr/src/api

COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=error


RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]