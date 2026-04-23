# Cerebrals — Biomedical Research Engine

Moteur de recherche oncologique alimenté par l'IA. Agrège PubMed, ClinicalTrials, TCGA/GDC et GEO pour fournir des synthèses intelligentes sur les pathologies cancéreuses.

## 🚀 Fonctionnalités

- **Recherche intelligente** : Analyse mono ou comparaison de pathologies
- **Multi-sources** : PubMed, ClinicalTrials.gov, TCGA/GDC, GEO
- **Synthèse IA** : Groq LLM pour synthétiser les données
- **Export PDF** : Impression optimisée pour partage
- **UI médicale** : Interface sombre professionnelle

## 🛠️ Installation

```bash
# Cloner le repo
git clone https://github.com/lvs0/cerebrals.git
cd cerebrals

# Installer les dépendances
pnpm install

# Configuration
cp .env.example .env
# Éditer .env avec votre clé API Groq

# Développement
pnpm dev

# Build production
pnpm build
```

## ⚠️ Configuration requise

Créer un fichier `.env` à la racine :
```
VITE_GROQ_API_KEY=votre_cle_api_groq_ici
```

Obtenir une clé API : [console.groq.com](https://console.groq.com)

## 📊 Sources de données

- **PubMed/NCBI** : Articles scientifiques
- **ClinicalTrials.gov** : Essais cliniques en recrutement
- **TCGA/GDC** : Données génomiques du cancer
- **GEO** : Datasets d'expression génique

## ⚠️ Avertissement

Outil de recherche académique uniquement. Ne constitue pas un avis médical.

## 📝 Licence

MIT — par Lévy Verpoort Scherpereel
