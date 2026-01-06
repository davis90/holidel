# Holidel - Frontend

Application frontend Vue.js + TypeScript pour la gestion et filtrage des offres de travail.

## Fonctionnalités

- ✅ Liste des offres avec paginationn
- ✅ Système de filtres avancés :
  - Filtrer par nombre de jours (min/max)
  - Filtrer par taux de rétrocession (min/max)
  - Filtrer par soins techniques moyens par jour
  - Filtrer par kilomètres moyens par jour
  - Filtrer par consultations moyennes par jour
- ✅ Affichage des détails de l'infirmière associée à chaque offre
- ✅ Interface responsive et moderne
- ✅ Typages TypeScript complets

## Installation

### Prérequis
- Node.js 18.x ou supérieur
- npm ou yarn

### Étapes

1. Installer les dépendances :
```bash
npm install
```

2. Configurer l'URL de l'API :
```bash
cp .env.example .env
```

Éditer le fichier `.env` et mettre à jour `VITE_API_URL` si nécessaire :
```env
VITE_API_URL=http://localhost:3000
```

## Développement

Lancer le serveur de développement :
```bash
npm run dev
```

L'application sera disponible à http://localhost:5173

## Construction

Générer le build de production :
```bash
npm run build
```

Prévisualiser le build de production :
```bash
npm run preview
```

## Architecture

```
src/
├── components/          # Composants Vue.js
│   ├── OfferFilters.vue    # Composant de filtrage
│   └── OffersList.vue      # Composant liste des offres
├── services/           # Services (API calls)
│   └── offerService.ts    # Service pour les appels fetch vers l'API
├── types/              # Types TypeScript
│   └── offer.ts        # Types relatifs aux offres
├── App.vue            # Composant principal
├── main.ts            # Point d'entrée
└── style.css          # Styles globaux
```

## Détails des composants

### OfferFilters
Composant qui affiche tous les filtres disponibles :
- Nombre de jours (min/max)
- Taux de rétrocession (min/max)
- Soins techniques (min/max)
- Kilomètres (min/max)
- Consultations (min/max)

### OffersList
Composant qui affiche :
- La liste des offres sous forme de cartes
- Les informations de l'infirmière
- La période de l'offre
- Les statistiques (jours, taux, etc.)
- La pagination

### OfferService
Service utilisant l'API Fetch pour :
- Récupérer les offres avec filtres
- Gérer la pagination
- Construire les requêtes avec les paramètres appropriés

## API Endpoints utilisés

- `GET /api/offers` - Liste les offres avec support des filtres et pagination

Paramètres supportés :
- `page` - Numéro de page (défaut: 1)
- `limit` - Nombre d'offres par page (défaut: 10)
- `nbDaysMin` - Nombre de jours minimum
- `nbDaysMax` - Nombre de jours maximum
- `retrocessionRateMin` - Taux de rétrocession minimum
- `retrocessionRateMax` - Taux de rétrocession maximum
- `averageTechnicalCareDayMin` - Soins techniques minimum
- `averageTechnicalCareDayMax` - Soins techniques maximum
- `averageKilometersDayMin` - Kilomètres minimum
- `averageKilometersDayMax` - Kilomètres maximum
- `averageConsultationsDayMin` - Consultations minimum
- `averageConsultationsDayMax` - Consultations maximum
- `departments[]` - Tableaux de numéros de département

## Styles

L'application utilise un système de styling avec :
- CSS scoped pour les composants
- Variables CSS pour la cohérence
- Design responsive avec media queries
- Gradient moderne pour le header

## Développé avec

- Vue 3 (Composition API)
- TypeScript 5.x
- Vite 7.x
- CSS3

