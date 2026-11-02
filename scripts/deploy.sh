#!/usr/bin/env bash
# Host-side deploy for /opt/wwcons. The Jenkinsfile resets the checkout to origin/main and then runs this.
# Database migrations are NOT applied here: the SQL files are not idempotent (one of them rewrites the
# founders content edited in the admin panel), so apply new files in prisma/migrations to wwcons_db by hand.
set -euo pipefail
cd "$(dirname "$0")/.."

mkdir -p /var/www/storage/wwcons
chown -R andry:andry /var/www/storage/wwcons
chmod -R 775 /var/www/storage/wwcons

[ -f .env ] || cp .env.production.example .env

docker compose up -d --build --remove-orphans
