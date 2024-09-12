# Etapa 1: Build
FROM node:20.11.1 AS build

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

# Etapa 2: Serve
FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["npm", "run", "start"]
