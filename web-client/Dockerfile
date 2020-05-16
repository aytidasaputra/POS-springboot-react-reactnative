FROM node:13-alpine as build
ARG BACKEND_URL
ENV REACT_APP_BACKEND_URL $BACKEND_URL
WORKDIR /usr/src/app
COPY . ./
# RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY configs/nginx.conf /etc/nginx/conf.d/default.conf
#CMD ["nginx", "-g", "daemon off;"]

#docker build --build-arg BACKEND_URL=<BACKEND_URL> . -t com.enigma/web-client
#docker run -p 8000:80 -d com.enigma/web-client
