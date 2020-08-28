FROM nginx:1.19.2

COPY packages/platform-ui/build /usr/share/nginx/html
