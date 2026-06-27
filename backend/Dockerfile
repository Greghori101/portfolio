FROM dunglas/frankenphp

WORKDIR /app

RUN install-php-extensions pdo_mysql gd intl zip opcache mbstring bcmath exif pcntl

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY backend/ /app
COPY .env /app/.env

RUN composer install --optimize-autoloader

RUN chmod -R 775 /app/storage /app/bootstrap/cache

COPY backend/Caddyfile.frankenphp /etc/caddy/Caddyfile
COPY backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
