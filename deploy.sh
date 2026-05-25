#!/bin/bash
# deploy.sh — Build and deploy to GitHub Pages via gh-pages branch

set -e

echo "Building..."
npm ci
npm run build

echo "Deploying to gh-pages branch..."
cd dist
git init
git add -A
git commit -m "Deploy: $(date)"
git push -f "https://sasithedirector:${GH_TOKEN}@github.com/sasithedirector/filmmaker-portfolio.git" main:gh-pages
cd ..
echo "Deployed! Site will be live at https://sasithedirector.github.io/filmmaker-portfolio"
