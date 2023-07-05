FROM node:18-alpine as build

ENV REACT_APP_NAME=KOTH
ENV REACT_APP_SOCKET_SERVER=https://web-system-files.s3.ap-northeast-1.amazonaws.com/public
ENV REACT_APP_END_POINT=https://api.kingofthehill.live

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i --legacy-peer-deps
COPY ./ ./

RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]


#FROM node:18-alpine as build
#
#
#
#WORKDIR /app
#COPY package.json ./
#COPY package-lock.json ./
#RUN npm i --legacy-peer-deps
#COPY ./ ./
#
#CMD ["npm", "start"]
