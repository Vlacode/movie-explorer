# Guide de Déploiement - Movie Explorer sur GitHub Pages

Ce guide vous explique comment déployer l'application Movie Explorer sur GitHub Pages pour la rendre accessible en ligne.

## 📋 Prérequis

*   Un compte GitHub (créez-en un gratuitement sur [github.com](https://github.com) si nécessaire).
*   Git installé sur votre ordinateur ([git-scm.com](https://git-scm.com)).
*   Les fichiers du projet Movie Explorer.

## 🚀 Étapes de Déploiement

### Étape 1: Créer un dépôt GitHub

1.  Connectez-vous à votre compte GitHub.
2.  Cliquez sur le bouton **+** en haut à droite et sélectionnez **New repository**.
3.  Nommez le dépôt `movie-explorer`.
4.  Choisissez **Public** pour que le projet soit accessible.
5.  Cliquez sur **Create repository**.

### Étape 2: Initialiser Git localement

Ouvrez un terminal dans le dossier `movie-explorer` et exécutez les commandes suivantes:

```bash
# Initialiser le dépôt Git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit: Movie Explorer application"

# Renommer la branche en 'main' (si nécessaire)
git branch -M main

# Ajouter le dépôt distant
git remote add origin https://github.com/VOTRE_UTILISATEUR/movie-explorer.git

# Pousser le code vers GitHub
git push -u origin main
```

Remplacez `VOTRE_UTILISATEUR` par votre nom d'utilisateur GitHub.

### Étape 3: Activer GitHub Pages

1.  Allez sur la page de votre dépôt GitHub.
2.  Cliquez sur **Settings** (Paramètres).
3.  Dans la barre latérale, sélectionnez **Pages**.
4.  Sous **Source**, sélectionnez **Deploy from a branch**.
5.  Choisissez la branche **main** et le dossier **/ (root)**.
6.  Cliquez sur **Save**.

GitHub Pages va maintenant construire et déployer votre site. Cela peut prendre quelques minutes.

### Étape 4: Accéder à votre application

Une fois le déploiement terminé, votre application sera disponible à:

```
https://VOTRE_UTILISATEUR.github.io/movie-explorer/
```

Vous verrez une notification verte confirmant que le site a été publié.

## 🔄 Mises à Jour Futures

Pour mettre à jour votre application après le déploiement initial:

1.  Modifiez les fichiers localement.
2.  Validez vos changements:

    ```bash
    git add .
    git commit -m "Description de vos changements"
    git push origin main
    ```

3.  GitHub Pages se mettra à jour automatiquement (généralement en quelques secondes).

## ⚙️ Configuration Avancée

### Domaine personnalisé

Si vous souhaitez utiliser un domaine personnalisé:

1.  Allez dans **Settings** > **Pages**.
2.  Sous **Custom domain**, entrez votre domaine.
3.  Suivez les instructions pour configurer les enregistrements DNS.

### HTTPS

GitHub Pages active automatiquement HTTPS pour tous les sites. Assurez-vous que le certificat SSL est activé dans les paramètres Pages.

## 🐛 Dépannage

### Le site n'apparaît pas

*   Attendez 5-10 minutes après le premier push.
*   Vérifiez que vous avez activé GitHub Pages dans les paramètres.
*   Vérifiez que le fichier `index.html` est à la racine du dépôt.

### Les fichiers CSS ou JavaScript ne se chargent pas

*   Vérifiez que les chemins des fichiers sont corrects (chemins relatifs).
*   Assurez-vous que les fichiers `css/style.css` et `js/script.js` existent.
*   Videz le cache de votre navigateur (Ctrl+Shift+Delete).

### L'API TMDB ne fonctionne pas

*   Vérifiez que votre clé API TMDB est correctement configurée dans `js/script.js`.
*   Assurez-vous que votre clé API n'a pas expiré.
*   Vérifiez les erreurs dans la console du navigateur (F12).

## 📊 Vérifier le Déploiement

Pour vérifier que votre site est correctement déployé:

1.  Ouvrez votre URL GitHub Pages dans un navigateur.
2.  Ouvrez la console de développement (F12).
3.  Vérifiez qu'il n'y a pas d'erreurs critiques.
4.  Testez les fonctionnalités principales:
    *   Recherche de films.
    *   Affichage des détails d'un film.
    *   Basculement du thème.
    *   Ajout et suppression d'un favori.
    *   Consultation de la section Historique.
    *   Notifications toast lors des actions.

## 📝 Bonnes Pratiques

*   **Commits réguliers** — Faites des commits fréquents avec des messages descriptifs.
*   **Branches** — Utilisez des branches pour développer de nouvelles fonctionnalités.
*   **Documentation** — Maintenez le README.md à jour.
*   **Tests** — Testez votre site sur différents navigateurs et appareils avant de pousser.

## 🔗 Ressources Utiles

*   [Documentation GitHub Pages](https://docs.github.com/en/pages)
*   [Git Documentation](https://git-scm.com/doc)
*   [GitHub Desktop](https://desktop.github.com/) — Interface graphique pour Git

## ✅ Checklist de Déploiement

Avant de déployer, assurez-vous que:

- [ ] Votre clé API TMDB est configurée dans `js/script.js`.
- [ ] Tous les fichiers sont présents (index.html, css/style.css, js/script.js).
- [ ] Le projet fonctionne correctement en local.
- [ ] Vous avez créé un dépôt GitHub public.
- [ ] Vous avez poussé le code vers GitHub.
- [ ] GitHub Pages est activé dans les paramètres.
- [ ] Vous avez testé l'URL GitHub Pages.

---

**Félicitations! Votre application Movie Explorer est maintenant en ligne! 🎉**
