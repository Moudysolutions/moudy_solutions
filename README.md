# 🚀 Moudy Solutions

**Solutions numériques innovantes** - Nous transformons vos idées en réalité numérique.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

---

## 📋 Description

Moudy Solutions est un site web vitrine et une plateforme de gestion pour une agence de services numériques basée à Niamey, Niger. L'application présente les services offerts, le portfolio de réalisations et permet aux clients de contacter l'équipe.

## ✨ Fonctionnalités

### 🌐 Site Public
- **Page d'accueil** - Présentation dynamique avec animations modernes
- **Services** - Liste des services proposés (développement web, applications mobiles, hébergement, etc.)
- **Portfolio** - Galerie des projets réalisés avec détails et technologies utilisées
- **Contact** - Formulaire de contact avec envoi de messages

### 🔐 Espace Admin
- **Tableau de bord** - Vue d'ensemble des statistiques (services, projets, messages)
- **Gestion des Services** - CRUD complet pour les services
- **Gestion du Portfolio** - CRUD complet pour les projets
- **Gestion des Messages** - Consultation et gestion des messages clients

## 🛠️ Technologies

| Catégorie | Technologie |
|-----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Frontend** | React 19, TypeScript |
| **Styling** | Tailwind CSS 4, CSS personnalisé |
| **Base de données** | Supabase (PostgreSQL) |
| **Icônes** | Font Awesome 6 |
| **Déploiement** | Vercel |

## 📁 Structure du Projet

```
moudy_solutions/
├── app/
│   ├── admin/           # Pages d'administration
│   │   ├── login/       # Authentification admin
│   │   ├── services/    # Gestion des services
│   │   ├── portfolio/   # Gestion du portfolio
│   │   └── messages/    # Gestion des messages
│   ├── contact/         # Page de contact
│   ├── portfolio/       # Page portfolio public
│   ├── services/        # Page services public
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Page d'accueil
│   └── globals.css      # Styles globaux
├── components/
│   ├── Header.tsx       # En-tête du site
│   └── Footer.tsx       # Pied de page
├── lib/
│   └── supabase.ts      # Client Supabase et types
├── public/
│   └── images/          # Images statiques
└── supabase/            # Configuration Supabase
```

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm, yarn, pnpm ou bun
- Compte Supabase

### Étapes

1. **Cloner le projet**
   ```bash
   git clone https://github.com/votre-repo/moudy_solutions.git
   cd moudy_solutions
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   
   Créez un fichier `.env.local` à la racine du projet :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Ouvrir dans le navigateur**
   
   Accédez à [http://localhost:3000](http://localhost:3000)

## 📜 Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm run start` | Lance le serveur de production |
| `npm run lint` | Vérifie le code avec ESLint |

## 🗄️ Base de Données

### Tables Supabase

- **services** - Services proposés par l'agence
- **portfolio** - Projets réalisés
- **messages** - Messages reçus via le formulaire de contact

## 🌍 Déploiement

L'application est optimisée pour un déploiement sur [Vercel](https://vercel.com) :

```bash
npm run build
```

## 📞 Contact

**Moudy Solutions**  
📍 Niamey, Niger  
📧 contact@moudysolutions.com

---

<p align="center">
  Développé avec ❤️ par <strong>Moudy Solutions</strong>
</p>
