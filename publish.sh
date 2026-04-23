#!/bin/bash
# Script de publication Cerebrals sur GitHub

set -e

echo "🧠 Cerebrals — Publication GitHub"
echo ""

# Vérifier si git est initialisé
if [ ! -d .git ]; then
    echo "🔧 Initialisation du repo git..."
    git init
    git branch -m main
fi

# Vérifier le remote
if ! git remote get-url origin >/dev/null 2>&1; then
    echo ""
    echo "⚠️  Remote 'origin' non configuré"
    echo "Créez d'abord le repo sur GitHub:"
    echo "  https://github.com/new"
    echo ""
    echo "Puis configurez le remote:"
    echo "  git remote add origin https://github.com/VOTRE_USER/cerebrals.git"
    exit 1
fi

echo "📁 Fichiers à publier:"
git add -A
git status --short

echo ""
echo "📝 Création du commit..."
git commit -m "Initial release: Cerebrals v1.0 — AI-powered oncology research engine

Features:
- Multi-source aggregation (PubMed, ClinicalTrials, TCGA/GDC, GEO)
- AI synthesis via Groq LLM
- Comparative pathology analysis
- PDF export
- Medical-grade dark UI

By Lévy Verpoort Scherpereel, 14yo"

echo ""
echo "🚀 Push vers GitHub..."
git push -u origin main

echo ""
echo "✅ Publié avec succès!"
echo ""
echo "Prochaines étapes:"
echo "  1. Ajouter la clé API Groq dans les variables d'environnement Vercel"
echo "  2. Déployer: vercel --prod"
echo "  3. Mettre à jour PRESS_RELEASE.md avec l'URL de démo"
echo ""
