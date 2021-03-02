FROM nginx:1.19.7

# Remove the default config
RUN rm /etc/nginx/conf.d/default.conf

COPY saas.conf /etc/nginx/conf.d
COPY packages/platform-ui/build /usr/share/nginx/html
