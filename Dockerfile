FROM nginx:1.19.6

# Remove the default config
RUN rm /etc/nginx/conf.d/default.conf

COPY saas.conf /etc/nginx/conf.d
COPY packages/platform-ui/build /usr/share/nginx/html
