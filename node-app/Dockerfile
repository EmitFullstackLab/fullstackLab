# FROM nginx:alpine
# COPY . /usr/share/nginx/html/

# CMD ["nginx", "-g", "daemon off;"]


FROM node:19.8.1

RUN apt-get update && \
    apt-get install -y python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]