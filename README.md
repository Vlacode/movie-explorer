# Movie Explorer - L'Expérience Cinéma Ultime

![Movie Explorer Screenshot](https://via.placeholder.com/1200x600?text=Capture+d%27écran+de+Movie+Explorer)

Découvrez **Movie Explorer**, une application web moderne et immersive pour explorer l'univers du cinéma. Conçue avec **HTML5**, **CSS3** et **JavaScript ES6+** (Vanilla), cette application offre une expérience utilisateur fluide et intuitive, inspirée des plateformes de streaming de premier plan comme Netflix et IMDb. Idéale pour un portfolio de développeur Front-End, elle met en valeur des compétences solides en développement web sans l'aide de frameworks.

## 🌟 Fonctionnalités Clés

Movie Explorer propose une gamme complète de fonctionnalités pour une exploration cinématographique enrichie :

*   **Recherche Intelligente** : Trouvez instantanément des films par titre grâce à une barre de recherche réactive.
*   **Navigation Intuitive** : Basculez facilement entre les sections `Accueil`, `Films Populaires` et `Mes Favoris` via une barre de navigation moderne.
*   **Détails Immersifs** : Accédez à des informations complètes sur chaque film (synopsis, genres, durée, acteurs principaux, note) via une modale élégante.
*   **Gestion des Favoris** : Ajoutez et retirez vos films préférés d'une liste personnalisée, persistante grâce au `Local Storage`.*   **Historique des Favoris** : Suivez chaque ajout et suppression de favoris avec un journal chronologique et sauvegardé.
*   **Notifications Toast** : Recevez un retour instantané après chaque action ou erreur grâce à des notifications toast modernes.*   **Mode Sombre Dynamique** : Profitez d'une expérience visuelle confortable avec un mode sombre commutable et persistant.
*   **Design Premium** : Une interface utilisateur entièrement modernisée avec des cartes élégantes, des effets de survol avancés, des animations fluides et un léger effet de glassmorphism.
*   **Badges Visuels** : Identifiez rapidement les films avec des badges pour les `notes élevées` (⭐), les `nouveautautés` (🆕) et les `top films` (🏆).
*   **Skeleton Loader** : Une expérience utilisateur améliorée avec des indicateurs de chargement visuels pendant les appels API.
*   **Responsive & Accessible** : Optimisée pour tous les appareils (mobile, tablette, desktop) et respectant les normes WCAG pour une accessibilité maximale.

## 🛠 Technologies Utilisées

Ce projet est une démonstration de l'utilisation des technologies web fondamentales :

| Technologie             | Description                                                                                                                               |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **HTML5**               | Structure sémantique et accessible du contenu, garantissant une base solide pour le SEO et l'accessibilité.                               |
| **CSS3**                | Stylisation avancée, mise en page responsive (mobile-first), variables CSS pour la gestion des thèmes, animations et effets de glassmorphism. |
| **JavaScript ES6+**     | Logique métier de l'application, gestion des interactions utilisateur, appels asynchrones à l'API, et manipulation du DOM sans frameworks. |
| **API The Movie Database (TMDB)** | Source de données riche et à jour pour toutes les informations cinématographiques.                                                       |
| **Local Storage**       | Mécanisme de persistance côté client pour sauvegarder les préférences utilisateur (thème, favoris, historique).                                       |

## 📋 Prérequis

*   Un navigateur web moderne (Chrome, Firefox, Safari, Edge).
*   Une clé API TMDB gratuite (obtenue sur [themoviedb.org](https://www.themoviedb.org/settings/api)).

## ⚙️ Installation Locale

Pour lancer l'application sur votre machine :

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-utilisateur/movie-explorer.git
cd movie-explorer
```

### 2. Obtenir et configurer votre clé API TMDB

1.  Rendez-vous sur [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api) pour obtenir votre clé API v3.
2.  Ouvrez le fichier `js/script.js`.
3.  Remplacez `YOUR_TMDB_API_KEY` par votre clé API réelle :

    ```javascript
    const TMDB_API_KEY = 'votre_clé_api_tmdb_ici';
    ```

### 3. Lancer l'application

Ouvrez le fichier `index.html` directement dans votre navigateur, ou utilisez un serveur local pour une meilleure expérience (recommandé) :

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
├── index.html                    # Structure HTML principale de l'application
├── css/
│   └── style.css               # Styles CSS modernisés et responsifs
├── js/
│   └── script.js               # Logique JavaScript (API, DOM, événements)
├── README.md                    # Ce fichier de documentation
├── functional_specification.md  # Spécification fonctionnelle détaillée
└── deployment_guide.md          # Instructions pour le déploiement sur GitHub Pages
```

## 🚀 Déploiement sur GitHub Pages

Ce projet est configuré pour un déploiement facile sur GitHub Pages. Suivez les instructions détaillées dans le fichier `deployment_guide.md` pour mettre votre application en ligne.

## 🧾 Fonctionnalités supplémentaires à vérifier
* Historique des favoris fonctionnel et affiché dans la section dédiée.
* Notifications toast bien visibles lors de l'ajout/suppression d'un favori et des erreurs.

## 💡 Architecture et Choix Techniques

### Structure HTML Sémantique

L'application utilise une structure HTML5 sémantique pour améliorer l'accessibilité et le référencement. Les éléments tels que `<nav>`, `<header>`, `<main>`, `<section>` et `<footer>` sont utilisés de manière appropriée pour définir les différentes parties du contenu.

### CSS Moderne et Responsive

Le CSS est conçu avec une approche **mobile-first**, utilisant Flexbox et Grid pour des mises en page fluides et adaptatives. Les variables CSS sont largement employées pour une gestion facile des thèmes (clair/sombre). Des animations subtiles et des effets de glassmorphism léger contribuent à une interface utilisateur visuellement attrayante et moderne.

### JavaScript Vanilla Modulaire

Le JavaScript est écrit en ES6+ pur, sans dépendances de frameworks. Le code est organisé de manière modulaire avec des fonctions dédiées pour la gestion des API, la manipulation du DOM, la gestion des événements et la persistance des données via `Local Storage`. Une attention particulière est portée à la gestion des erreurs et à l'affichage d'états de chargement (Skeleton Loader) pour une meilleure expérience utilisateur.

## 📊 Captures d'écran

*(Des captures d'écran de l'application seront ajoutées ici pour illustrer l'interface utilisateur, les cartes de films, la modale de détails, le mode sombre et la section des favoris.)*

## 🐛 Dépannage

*   **Clé API TMDB** : Assurez-vous que votre clé est correctement configurée dans `js/script.js` et qu'elle est valide.
*   **Problèmes d'affichage** : Vérifiez la console de votre navigateur (F12) pour d'éventuelles erreurs JavaScript ou de chargement de ressources.
*   **Persistance des données** : Vérifiez que le `Local Storage` est activé dans votre navigateur si les favoris ou le thème ne sont pas sauvegardés.

## 📚 Ressources Utiles

*   [Documentation TMDB API](https://developer.themoviedb.org/docs)
*   [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
*   [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
*   [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
*   [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 📄 Licence

Ce projet est open-source et est fourni à titre d'exemple éducatif pour un portfolio de développeur. Vous êtes libre de l'utiliser, de le modifier et de le distribuer selon les termes de la licence MIT.

## 👨‍💻 Auteur

Développé par Manus AI en tant que démonstration pour un portfolio Front-End.

---

**Explorez, découvrez et aimez le cinéma avec Movie Explorer ! 🍿**
