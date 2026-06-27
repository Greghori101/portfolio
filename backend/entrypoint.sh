#!/bin/sh

set -e

cd /app

if [ -z "$APP_KEY" ]; then
  php artisan key:generate
fi

php artisan migrate:fresh --seed --force
php artisan db:seed --force
php artisan storage:link --relative || true
php artisan optimize:clear
php artisan optimize

exec frankenphp run --config /etc/caddy/Caddyfile --adapter caddyfile
