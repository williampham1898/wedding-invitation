#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

# Verify build output exists
if [ ! -f dist/index.html ]; then
  echo "Error: dist/index.html not found. Run 'npm run build:pages' first." >&2
  exit 1
fi

# SPA fallback + skip Jekyll processing
cp dist/index.html dist/404.html
touch dist/.nojekyll

ORIGIN_URL=$(git config --get remote.origin.url)
SHORT_SHA=$(git rev-parse --short HEAD)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Cleanup on exit so dist/ stays gitignored in the main repo
cleanup() {
  rm -rf dist/.git
}
trap cleanup EXIT

# Orphan gh-pages commit inside dist/, force-push to origin
(
  cd dist
  rm -rf .git
  git init -b gh-pages
  git remote add origin "$ORIGIN_URL"
  git add -A
  git commit -m "deploy: ${TIMESTAMP} ${SHORT_SHA}"
  git push --force origin gh-pages
)

echo "Deployed to gh-pages (${TIMESTAMP}, ${SHORT_SHA})"
