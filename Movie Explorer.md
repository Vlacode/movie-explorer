# Movie Explorer

Une application web moderne de découverte de films construite avec **HTML5**, **CSS3** et **JavaScript ES6+** (sans frameworks). Explorez des milliers de films, recherchez vos titres préférés et gérez une liste de favoris personnalisée.

## 🎬 Fonctionnalités

*   **Recherche de films** — Trouvez instantanément des films par titre.
*   **Affichage dynamique** — Découvrez les films populaires au chargement de l'application.
*   **Détails complets** — Accédez à des informations détaillées sur chaque film (synopsis, genres, durée, acteurs, etc.).
*   **Gestion des favoris** — Ajoutez vos films préférés à une liste personnalisée, persistante via Local Storage.
*   **Mode sombre** — Basculez entre les thèmes clair et sombre selon vos préférences.
*   **Design responsive** — Optimisé pour mobile, tablette et ordinateur de bureau.
*   **Accessibilité** — Respecte les normes WCAG pour une expérience inclusive.

## 🛠 Technologies

| Technologie | Utilisation |
|---|---|
| **HTML5** | Structure sémantique et accessibilité |
| **CSS3** | Design moderne, responsive, variables CSS pour le thème |
| **JavaScript ES6+** | Logique métier, gestion d'état, intégration API |
| **TMDB API** | Source de données pour les films |
| **Local Storage** | Persistance des favoris et du thème |

## 📋 Prérequis

*   Un navigateur web moderne (Chrome, Firefox, Safari, Edge).
*   Une clé API TMDB gratuite (obtenue sur [themoviedb.org](https://www.themoviedb.org/settings/api)).

## ⚙️ Installation

### 1. Cloner ou télécharger le projet

```bash
git clone https://github.com/votre-utilisateur/movie-explorer.git
cd movie-explorer
```

### 2. Obtenir une clé API TMDB

1.  Visitez [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).
2.  Créez un compte ou connectez-vous.
3.  Générez une clé API v3.
4.  Copiez votre clé API.

### 3. Configurer la clé API

Ouvrez le fichier `js/script.js` et remplacez la ligne:

```javascript
const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';
```

par:

```javascript
const TMDB_API_KEY = 'votre_clé_api_tmdb_ici';
```

### 4. Ouvrir l'application

Ouvrez le fichier `index.html` directement dans votre navigateur ou utilisez un serveur local:

```bash
# Avec Python 3
python3 -m http.server 8000

# Avec Node.js (si vous avez http-server installé)
npx http-server
```

Puis accédez à `http://localhost:8000` dans votre navigateur.

## 📁 Structure du Projet

```
movie-explorer/
├── index.html                    # Fichier HTML principal
├── css/
│   └── style.css               # Feuille de styles CSS
├── js/
│   └── script.js               # Logique JavaScript
├── README.md                    # Ce fichier
├── functional_specification.md  # Spécification fonctionnelle
└── deployment_guide.md          # Guide de déploiement GitHub Pages
```

## 🚀 Déploiement sur GitHub Pages

### Étapes de déploiement

1.  **Créer un dépôt GitHub** — Créez un nouveau dépôt nommé `movie-explorer`.

2.  **Initialiser Git** — Dans le dossier du projet:

    ```bash
    git init
    git add .
    git commit -m "Initial commit: Movie Explorer application"
    git branch -M main
    git remote add origin https://github.com/votre-utilisateur/movie-explorer.git
    git push -u origin main
    ```

3.  **Activer GitHub Pages** — Allez dans les paramètres du dépôt:
    *   Accédez à **Settings** > **Pages**.
    *   Sélectionnez **main** comme branche source.
    *   Cliquez sur **Save**.

4.  **Accéder à votre application** — Après quelques secondes, votre application sera disponible à:
    ```
    https://votre-utilisateur.github.io/movie-explorer/
    ```

Pour plus de détails, consultez le fichier `deployment_guide.md`.

## 🎨 Utilisation

### Rechercher un film

1.  Entrez le titre d'un film dans la barre de recherche.
2.  Appuyez sur **Entrée** ou cliquez sur le bouton **Rechercher**.
3.  Les résultats s'affichent sous forme de cartes.

### Consulter les détails d'un film

1.  Cliquez sur une carte de film.
2.  Une fenêtre modale s'ouvre avec les informations détaillées.
3.  Consultez le synopsis, les genres, les acteurs, etc.

### Ajouter un film aux favoris

1.  Ouvrez les détails d'un film (cliquez sur une carte).
2.  Cliquez sur le bouton **Ajouter aux favoris**.
3.  Le film est sauvegardé dans votre liste personnelle.

### Basculer le thème

1.  Cliquez sur le bouton de bascule de thème (toggle) dans la barre de navigation.
2.  Le thème sombre/clair s'applique immédiatement.
3.  Votre préférence est sauvegardée pour les visites futures.

## 🔧 Architecture et Choix Techniques

### Structure HTML

La structure HTML suit les meilleures pratiques de sémantique:

*   **`<header>`** — Contient la navigation et la section héros.
*   **`<nav>`** — Barre de navigation avec titre et bascule de thème.
*   **`<main>`** — Contenu principal avec les cartes de films.
*   **`<section>`** — Sections sémantiques pour l'organisation logique.

### Gestion du CSS

*   **Variables CSS** — Utilisées pour gérer les couleurs et les thèmes.
*   **Mobile-first** — Les styles sont d'abord définis pour mobile, puis améliorés pour les écrans plus grands.
*   **Flexbox et Grid** — Utilisés pour les mises en page responsive.
*   **Transitions** — Animations fluides pour une meilleure UX.

### Logique JavaScript

*   **Approche modulaire** — Fonctions séparées pour chaque fonctionnalité.
*   **Gestion d'erreurs** — Try-catch pour les appels API.
*   **Local Storage** — Persistance des données utilisateur.
*   **Event listeners** — Gestion des interactions utilisateur.

## 📊 Captures d'écran

Les captures d'écran seront ajoutées ultérieurement pour montrer:

*   La page d'accueil avec les films populaires.
*   La barre de recherche en action.
*   La modale de détails d'un film.
*   Le thème sombre.

## 🐛 Dépannage

### La clé API ne fonctionne pas

*   Vérifiez que vous avez copié la clé API correctement.
*   Assurez-vous que votre clé API est activée sur le site TMDB.
*   Vérifiez que vous n'avez pas dépassé le quota de requêtes API (limite gratuite: 40 requêtes/10 secondes).

### Les films ne s'affichent pas

*   Ouvrez la console du navigateur (F12) et vérifiez les messages d'erreur.
*   Vérifiez que votre connexion Internet fonctionne.
*   Assurez-vous que l'API TMDB est accessible.

### Le thème sombre ne se sauvegarde pas

*   Vérifiez que le Local Storage n'est pas désactivé dans votre navigateur.
*   Videz le cache du navigateur et réessayez.

## 📚 Ressources

*   [Documentation TMDB API](https://developer.themoviedb.org/docs)
*   [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
*   [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
*   [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
*   [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 📄 Licence

Ce projet est fourni à titre d'exemple éducatif pour un portfolio de développeur. Vous êtes libre de l'utiliser, de le modifier et de le distribuer selon vos besoins.

## 👨‍💻 Auteur

Développé comme un projet portfolio de démonstration Front-End.

---

**Profitez de la découverte de films avec Movie Explorer! 🍿**
