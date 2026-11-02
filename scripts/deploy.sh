#!/usr/bin/env bash
# Deploy wwconstruction.id on the qualiv server (no CI). From your machine:
#   ssh qualiv /opt/wwcons/scripts/deploy.sh
# Database migrations are NOT applied here: the SQL files are not idempotent (one of them rewrites the
# founders content edited in the admin panel), so apply new files in prisma/migrations to wwcons_db by hand.
set -euo pipefail

# Wrapped in a function so bash reads the whole file before `git pull` can rewrite it.
main() {
  cd "$(dirname "$(readlink -f "$0")")/.."
  git pull --ff-only origin main
  docker compose up -d --build --remove-orphans
  docker ps --filter name=wwcons_web --format '{{.Names}} {{.Status}}'
}
main "$@"
exit
