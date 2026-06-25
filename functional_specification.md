# Spécification Fonctionnelle - Movie Explorer

## 1. Introduction

Ce document a pour objectif de détailler les fonctionnalités de l'application web "Movie Explorer". Conçue pour être intégrée à un portfolio de développeur, cette application permettra aux utilisateurs de rechercher, d'explorer et de consulter des informations complètes sur des films en s'appuyant sur une API publique, de préférence The Movie Database (TMDB).

## 2. Objectifs du Projet

Le développement de "Movie Explorer" vise plusieurs objectifs clés. Premièrement, il s'agit de créer une application web moderne, entièrement responsive et accessible, garantissant une expérience utilisateur optimale sur divers appareils. Deuxièmement, le projet s'engage à utiliser exclusivement les technologies web fondamentales : HTML5 pour la structure sémantique, CSS3 pour le style et la mise en page, et JavaScript ES6+ pour la logique interactive, sans recourir à des frameworks JavaScript. Enfin, l'application sera développée en respectant les meilleures pratiques de développement Front-End et sera prête pour un déploiement aisé sur GitHub Pages.

## 3. Fonctionnalités Détaillées

### 3.1. Recherche de Films

Les utilisateurs pourront rechercher des films par titre grâce à une barre de recherche dédiée. Cette fonctionnalité permettra de saisir un titre de film dans un champ de texte (`<input type="text">`) et de lancer la recherche soit en cliquant sur un bouton "Rechercher", soit en appuyant sur la touche `Entrée`. Les résultats de la recherche seront affichés dynamiquement sous forme de cartes de films. L'intégration de cette fonctionnalité s'appuiera sur l'endpoint `/search/movie` de l'API TMDB.

### 3.2. Affichage des Films (Cartes)

Chaque film trouvé sera présenté sous la forme d'une carte visuellement attrayante. Chaque carte inclura l'affiche du film, son titre, l'année de sortie, sa note moyenne (sur 10) et son genre principal. Un clic sur l'une de ces cartes ouvrira une fenêtre modale affichant les détails complets du film.

### 3.3. Détails du Film (Modale)

Lorsqu'un utilisateur cliquera sur une carte de film, une fenêtre modale s'affichera pour présenter des informations exhaustives. Cette modale contiendra le titre du film, son affiche, un synopsis détaillé, la liste des genres associés, la date de sortie, la note moyenne, la durée du film, ainsi que les noms des acteurs principaux, si ces données sont disponibles via l'API. La modale pourra être fermée en cliquant sur un bouton de fermeture (`X`) ou en cliquant en dehors de sa zone. Les données pour cette section seront récupérées via les endpoints `/movie/{movie_id}` et `/movie/{movie_id}/credits` de l'API TMDB.

### 3.4. Gestion des Favoris

L'application offrira la possibilité d'ajouter ou de retirer des films d'une liste de favoris personnelle. Un bouton dédié à cette action sera intégré dans la modale des détails du film. L'état des favoris sera sauvegardé de manière persistante dans le `Local Storage` du navigateur, permettant aux utilisateurs de retrouver leur liste après un rechargement de la page.

### 3.5. Historique des Favoris

Chaque action d'ajout ou de suppression d'un film des favoris sera enregistrée dans un journal d'historique. L'historique affichera les actions dans l'ordre chronologique inverse (les plus récentes en premier), avec la date et l'heure de chaque action. Les entrées d'historique seront sauvegardées dans le `Local Storage` et limitées aux 50 dernières actions.

### 3.6. Mode Sombre

Une fonctionnalité de bascule entre un thème clair et un thème sombre sera implémentée. Un interrupteur (toggle switch) situé dans la barre de navigation permettra de changer l'apparence de l'application. Le thème sélectionné par l'utilisateur sera enregistré dans le `Local Storage` et appliqué automatiquement lors des visites ultérieures.

## 4. Interface Utilisateur (UI/UX)

Le design de l'application sera moderne, s'inspirant des interfaces des plateformes de streaming et des applications SaaS. L'interface utilisateur intégrera une barre de navigation élégante, une section "Héros" attractive avec un titre accrocheur et la barre de recherche, ainsi que des cartes de films dotées d'effets de survol subtils. Des animations et transitions fluides seront utilisées pour améliorer l'expérience utilisateur, et une excellente hiérarchie visuelle sera mise en place pour faciliter la navigation et la compréhension du contenu.

## 5. Responsive Design

L'application adoptera une approche "mobile-first" pour son design, garantissant une optimisation complète pour une variété d'écrans, incluant les téléphones mobiles, les tablettes et les ordinateurs de bureau.

## 6. Accessibilité

Le développement respectera les bonnes pratiques des Web Content Accessibility Guidelines (WCAG) pour assurer une application inclusive. Cela se traduira par l'utilisation de HTML sémantique (`<header>`, `<nav>`, `<main>`, `<section>`, etc.), des labels explicites pour tous les éléments de formulaire, des attributs ARIA pertinents pour les composants interactifs (modales, boutons), une navigation au clavier fonctionnelle et des contrastes de couleurs suffisants pour une lisibilité optimale.

## 7. Performance et Gestion des Erreurs

L'application sera conçue pour une performance optimale, notamment par une gestion efficace des appels à l'API TMDB. Un état de chargement (`loading state`) sera affiché pendant les requêtes API pour informer l'utilisateur. La gestion des erreurs inclura l'affichage de messages clairs en cas d'échec des appels API et un message spécifique lorsque aucune correspondance n'est trouvée pour une recherche.

La persistance `Local Storage` sera utilisée pour les favoris, l'historique et le thème. Le système d'historique devra restaurer les données au rechargement de la page et limiter l'historique aux 50 dernières actions. Des notifications toast seront utilisées pour informer l'utilisateur des actions réussies et des erreurs.

## 8. Livrables

Les livrables du projet comprendront :

*   Le code source complet de l'application (fichiers HTML, CSS, JavaScript).
*   Une structure de fichiers claire et organisée.
*   Un fichier `README.md` professionnel détaillant le projet.
*   Le présent document de spécification fonctionnelle.
*   Des instructions détaillées pour le déploiement sur GitHub Pages.

## 9. Technologies Utilisées

Le tableau suivant récapitule les technologies employées dans le cadre de ce projet :

| Technologie             | Description                                                               |
| :---------------------- | :------------------------------------------------------------------------ |
| **HTML5**               | Structure sémantique et accessibilité du contenu.                         |
| **CSS3**                | Stylisation, mise en page responsive et gestion des thèmes (clair/sombre).|
| **JavaScript ES6+**     | Logique métier de l'application, interactions utilisateur et appels API.  |
| **API The Movie Database (TMDB)** | Source de données pour les informations sur les films.                    |
| **Local Storage**       | Mécanisme de persistance pour les favoris et les préférences de thème.    |

## 10. Auteur

Ce document a été rédigé par Manus AI.
