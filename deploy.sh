#!/bin/bash
# Script de déploiement Cerebrals

set -e

echo "🧠 Cerebrals — Déploiement"
echo ""

# Vérifier la clé API
if [ -z "$VITE_GROQ_API_KEY" ]; then
    if [ -f .env ]; then
        export $(cat .env | grep -v '#' | xargs)
    fi
fi

if [ -z "$VITE_GROQ_API_KEY" ]; then
    echo "❌ Erreur: VITE_GROQ_API_KEY non définie"
    echo "Créez un fichier .env avec votre clé API Groq"
    exit 1
fi

echo "✅ Clé API configurée"
echo "📦 Installation des dépendances..."
pnpm install --prefer-offline

echo "🔨 Build production..."
rm -rf dist
pnpm run build

echo ""
echo "✅ Build terminé dans ./dist"
echo ""
echo "Options de déploiement:"
echo "  1. Vercel: vercel --prod"
echo "  2. Netlify: netlify deploy --prod --dir=dist"
echo "  3. GitHub Pages: git subtree push --prefix dist origin gh-pages"
echo ""
