FROM node:18.14.1-alpine as build

ENV REACT_APP_NAME=KOTH
ENV REACT_APP_SOCKET_SERVER=https://web-system-files.s3.ap-northeast-1.amazonaws.com
ENV REACT_APP_END_POINT=https://api.play4promote.com
ENV REACT_APP_END_POINT_TOURNAMENT=https://api.play4promote.com/api/games/store-score-tournament
ENV REACT_APP_END_POINT_PVP_BOT=https://api.play4promote.com/api/games/store-score-pvp-bot
ENV REACT_APP_URL_DOMAIN=play4promote.com

WORKDIR /app
COPY package.json ./
#COPY package-lock.json ./
RUN npm i --legacy-peer-deps
COPY ./ ./

RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
