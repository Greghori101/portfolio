#!/bin/sh

set -e

cd /app

if [ -z "$APP_KEY" ]; then
  php artisan key:generate
fi

php artisan migrate:fresh --force
php artisan passport:keys --force
php artisan passport:client --personal --name="Laravel" --no-interaction || true
php artisan passport:revoke-all || true
php artisan db:seed --force
php artisan storage:link --relative || true
php artisan optimize:clear
php artisan optimize

exec frankenphp run --config /etc/caddy/Caddyfile --adapter caddyfile
