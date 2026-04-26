# ✅ CEREBRALS — PRÊT À PUBLIER

## 🎯 Ce que tu as maintenant

Un **moteur de recherche oncologique alimenté par l'IA** — prêt à impressionner les médias.

### Fonctionnalités
- 🔍 Recherche mono ou comparaison de pathologies
- 📚 Agrégation multi-sources (PubMed, ClinicalTrials, TCGA/GDC, GEO)
- 🤖 Synthèse IA via Groq LLM
- 📄 Export PDF
- 🎨 UI médicale professionnelle (dark mode)

### Sécurité ✅
- Clé API Groq retirée du code (variable d'environnement)
- .gitignore configuré
- .env.example fourni

---

## 📋 CHECKLIST PUBLICATION

### 1. Créer le repo GitHub
```bash
# Aller sur https://github.com/new
# Nom: cerebrals
# Description: AI-powered oncology research engine
# Public ✅
```

### 2. Initialiser et pousser
```bash
cd ~/.openclaw/workspace/celebrals
./publish.sh
```

### 3. Déployer sur Vercel
```bash
# Installer Vercel CLI si besoin
npm i -g vercel

# Connexion (une fois)
vercel login

# Déploiement
vercel --prod
```

**⚠️ Important**: Dans les settings Vercel, ajouter la variable d'environnement :
- `VITE_GROQ_API_KEY` = ta clé API Groq

### 4. Mettre à jour le communiqué
Éditer `PRESS_RELEASE.md` :
- Remplacer `[DATE]` par la date réelle
- Remplacer `[URL_DEMO]` par l'URL Vercel
- Remplacer `[VILLE]` par ta ville

### 5. Publier / contacter la presse
**Cibles prioritaires:**
1. **Twitter/X** — thread avec screenshots et lien
2. **Reddit** — r/cancer, r/medicine, r/artificial, r/webdev
3. **Hacker News** — "Show HN: 14yo builds AI oncology research engine"
4. **Journaux tech FR** — Numerama, Next INpact, Le Monde Informatique
5. **Journaux généralistes** — via formulaire "une de nos lectrices/lecteurs"

---

## 🎤 MESSAGE CLÉ (pour les médias)

> **"Un adolescent de 14 ans développe un moteur d'IA pour accélérer la recherche contre le cancer"**

Accroches :
- "500 000 articles scientifiques par an — Cerebrals les synthétise en 30 secondes"
- "L'IA au service des oncologues, pas pour les remplacer"
- "Open source : la transparence comme antidote au black box médical"

---

## 📁 Fichiers créés

| Fichier | Purpose |
|---------|---------|
| `README.md` | Documentation projet |
| `PRESS_RELEASE.md` | Communiqué de presse prêt à envoyer |
| `.env.example` | Template configuration |
| `vercel.json` | Config déploiement Vercel |
| `deploy.sh` | Script build local |
| `publish.sh` | Script publication GitHub |
| `READY.md` | Ce fichier — récap |

---

## ⚡ ACTION IMMÉDIATE

1. **Maintenant** : Créer repo GitHub → `github.com/new`
2. **Dans 5 min** : `./publish.sh`
3. **Dans 10 min** : `vercel --prod` + configurer `VITE_GROQ_API_KEY`
4. **Dans 15 min** : Poster sur Twitter avec screenshots

---

## 🔒 RAPPEL SÉCURITÉ

Ta clé API Groq était exposée dans le ZIP original. **Elle a été retirée du code.**

Actions recommandées :
1. Rotater la clé sur https://console.groq.com
2. Utiliser la nouvelle clé dans les variables Vercel uniquement

---

**Cerebrals peut être live ce soir.** 🚀

Par Relay, pour Lévy — 23 avril 2026
