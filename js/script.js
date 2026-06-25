// ============================================
// CONFIGURATION API
// ============================================

const TMDB_API_KEY = 'dd7f7889f5607453222cf6d4d5df732f';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// ============================================
// UTILITAIRES
// ============================================

function getStoredJson(key, fallback) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (error) {
        console.warn(`Impossible de lire ${key} depuis localStorage`, error);
        return fallback;
    }
}

function saveJson(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Impossible de sauvegarder ${key} dans localStorage`, error);
    }
}

// ============================================
// ÉTAT DE L'APPLICATION
// ============================================

const appState = {
    favorites: getStoredJson('movieExplorerFavorites', []),
    history: getStoredJson('movieExplorerHistory', []),
    currentSection: 'home',
    theme: localStorage.getItem('theme') || 'dark',
    cache: {
        popular: null,
        genres: null,
        movies: {}
    }
};

// ============================================
// SÉLECTEURS DOM
// ============================================

const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const sections = document.querySelectorAll('.section');
const homeMoviesContainer = document.getElementById('home-movies');
const popularMoviesContainer = document.getElementById('popular-movies');
const favoritesMoviesContainer = document.getElementById('favorites-movies');
const emptyFavoritesState = document.getElementById('empty-favorites');
const favoriteSubtitle = document.getElementById('favorites-subtitle');
const historyList = document.getElementById('history-list');
const emptyHistoryState = document.getElementById('empty-history');
const movieModal = document.getElementById('movie-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const addToFavoritesButton = document.getElementById('add-to-favorites');
const skeletonTemplate = document.getElementById('skeleton-template');

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY') {
        showError('Clé API TMDB non configurée. Veuillez ajouter votre clé API dans js/script.js');
        return;
    }

    initTheme();
    initEventListeners();
    loadInitialData();
    renderHistory();
});

// ============================================
// THÈME
// ============================================

function initTheme() {
    if (appState.theme === 'light') {
        themeToggle.checked = true;
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        themeToggle.checked = false;
        document.documentElement.removeAttribute('data-theme');
    }
}

function toggleTheme() {
    appState.theme = themeToggle.checked ? 'light' : 'dark';
    localStorage.setItem('theme', appState.theme);

    if (appState.theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}

// ============================================
// ÉVÉNEMENTS
// ============================================

function initEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            await navigateToSection(section);
        });
    });

    // Thème
    themeToggle.addEventListener('change', toggleTheme);

    // Recherche
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });

    // Actions internes avec section
    document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-section]');
        if (!trigger || trigger.matches('.nav-link')) return;

        e.preventDefault();
        navigateToSection(trigger.dataset.section);
    });

    // Modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && movieModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Favoris
    addToFavoritesButton.addEventListener('click', toggleFavorite);
}

// ============================================
// NAVIGATION
// ============================================

function navigateToSection(sectionName) {
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (!targetSection) {
        console.warn(`Section inconnue : ${sectionName}`);
        return;
    }

    appState.currentSection = sectionName;

    // Mettre à jour les liens actifs
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionName);
    });

    // Afficher la section
    sections.forEach(section => section.classList.remove('active'));
    targetSection.classList.add('active');

    // Charger les données si nécessaire
    if (sectionName === 'popular' && !appState.cache.popular) {
        loadPopularMovies();
    } else if (sectionName === 'favorites') {
        displayFavorites();
    } else if (sectionName === 'history') {
        renderHistory();
    }

    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// CHARGEMENT DES DONNÉES
// ============================================

function loadInitialData() {
    loadPopularMovies();
}

async function loadPopularMovies() {
    try {
        showSkeletons(homeMoviesContainer, 12);
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=1`
        );
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        appState.cache.popular = data.results;
        
        const genres = await fetchGenres();
        displayMovies(homeMoviesContainer, data.results.slice(0, 12), genres);
        
        if (appState.currentSection === 'popular') {
            displayMovies(popularMoviesContainer, data.results, genres);
        }
    } catch (error) {
        console.error('Erreur lors du chargement des films populaires:', error);
        showError('Impossible de charger les films. Veuillez réessayer.');
    }
}

async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        showError('Veuillez entrer un titre de film');
        return;
    }

    try {
        showSkeletons(homeMoviesContainer, 12);
        const response = await fetch(
            `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}`
        );
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        
        if (data.results.length === 0) {
            homeMoviesContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 2rem;">Aucun film trouvé pour votre recherche.</p>';
            return;
        }

        const genres = await fetchGenres();
        displayMovies(homeMoviesContainer, data.results, genres);
        navigateToSection('home');
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        showError('Erreur lors de la recherche. Veuillez réessayer.');
    }
}

async function fetchGenres() {
    if (appState.cache.genres) return appState.cache.genres;

    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=fr-FR`
        );
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        const genreMap = {};
        
        data.genres.forEach(genre => {
            genreMap[genre.id] = genre.name;
        });
        
        appState.cache.genres = genreMap;
        return genreMap;
    } catch (error) {
        console.error('Erreur lors de la récupération des genres:', error);
        return {};
    }
}

// ============================================
// AFFICHAGE DES FILMS
// ============================================

function displayMovies(container, movies, genres) {
    container.innerHTML = '';

    movies.forEach(movie => {
        const card = createMovieCard(movie, genres);
        container.appendChild(card);
    });
}

function getGenreNames(movie, genresMap) {
    const names = [];

    if (Array.isArray(movie.genre_ids)) {
        movie.genre_ids.forEach(id => {
            if (genresMap && genresMap[id]) {
                names.push(genresMap[id]);
            }
        });
    }

    if (names.length === 0 && Array.isArray(movie.genres)) {
        movie.genres.forEach(genre => {
            if (genre && genre.name) {
                names.push(genre.name);
            }
        });
    }

    return names.slice(0, 2);
}

function createMovieCard(movie, genres) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    const posterUrl = movie.poster_path
        ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://via.placeholder.com/200x300?text=No+Image';

    const year = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
    const ratingValue = Number.isFinite(movie.vote_average) ? movie.vote_average : null;
    const rating = ratingValue !== null ? ratingValue.toFixed(1) : 'N/A';
    const genreNames = getGenreNames(movie, genres).join(', ');

    // Déterminer les badges
    const badges = [];
    if (ratingValue !== null && ratingValue >= 8) badges.push(`<span class="badge badge-rating">⭐ ${rating}</span>`);
    if (isNewMovie(movie.release_date)) badges.push('<span class="badge badge-new">🆕 Nouveau</span>');
    if (ratingValue !== null && ratingValue >= 8.5) badges.push('<span class="badge badge-top">🏆 Top</span>');

    card.innerHTML = `
        <div class="movie-card-image">
            <img src="${posterUrl}" alt="Affiche de ${movie.title || 'film'}" loading="lazy">
            <div class="movie-card-badges">
                ${badges.join('')}
            </div>
            <div class="movie-card-overlay">
                <button class="btn-primary" style="width: 100%; margin: 0;">Voir Détails</button>
            </div>
        </div>
        <div class="movie-card-info">
            <div>
                <h3 class="movie-card-title">${movie.title || 'Titre non disponible'}</h3>
                <div class="movie-card-meta">
                    <span class="movie-card-rating">⭐ ${rating}</span>
                    <span class="movie-card-genre">${year}</span>
                </div>
                <p class="movie-card-genre" style="font-size: 0.8rem; margin-top: 0.5rem;">${genreNames || 'N/A'}</p>
            </div>
        </div>
    `;

    const openDetails = () => showMovieDetails(movie.id);
    card.addEventListener('click', openDetails);
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openDetails();
        }
    });

    return card;
}

function isNewMovie(releaseDate) {
    if (!releaseDate) return false;
    const date = new Date(releaseDate);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays < 90;
}

// ============================================
// SKELETON LOADER
// ============================================

function showSkeletons(container, count = 12) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const skeleton = skeletonTemplate.content.cloneNode(true);
        container.appendChild(skeleton);
    }
}

// ============================================
// DÉTAILS DU FILM
// ============================================

async function showMovieDetails(movieId) {
    try {
        const [movieResponse, creditsResponse] = await Promise.all([
            fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=fr-FR`),
            fetch(`${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=fr-FR`)
        ]);

        if (!movieResponse.ok || !creditsResponse.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }

        const movieData = await movieResponse.json();
        const creditsData = await creditsResponse.json();

        displayMovieDetails(movieData, creditsData);
        openModal();
    } catch (error) {
        console.error('Erreur:', error);
        showError('Impossible de charger les détails du film.');
    }
}

function displayMovieDetails(movie, credits) {
    const posterUrl = movie.poster_path 
        ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://via.placeholder.com/200x300?text=No+Image';

    const releaseDate = movie.release_date 
        ? new Date(movie.release_date).toLocaleDateString('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        : 'N/A';

    const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
    const genres = movie.genres.map(g => g.name).join(', ') || 'N/A';
    const actors = credits.cast
        .slice(0, 5)
        .map(actor => actor.name)
        .join(', ') || 'N/A';

    const rating = movie.vote_average.toFixed(1);

    document.getElementById('modal-poster').src = posterUrl;
    document.getElementById('modal-poster').alt = `Affiche de ${movie.title}`;
    document.getElementById('modal-title').textContent = movie.title;
    document.getElementById('modal-rating-value').textContent = rating;
    document.getElementById('modal-release-date').textContent = `📅 ${releaseDate}`;
    document.getElementById('modal-runtime').textContent = `⏱️ ${runtime}`;
    document.getElementById('modal-genres').textContent = `🎭 ${genres}`;
    document.getElementById('modal-synopsis').textContent = movie.overview || 'Synopsis non disponible.';
    document.getElementById('modal-actors').textContent = actors;

    addToFavoritesButton.dataset.movieId = movie.id;
    updateFavoriteButton(movie.id);
}

function updateFavoriteButton(movieId) {
    const isFavorite = appState.favorites.includes(movieId);
    
    if (isFavorite) {
        addToFavoritesButton.innerHTML = '<span class="btn-icon">❤️</span><span class="btn-text">Retirer des Favoris</span>';
        addToFavoritesButton.setAttribute('aria-pressed', 'true');
    } else {
        addToFavoritesButton.innerHTML = '<span class="btn-icon">🤍</span><span class="btn-text">Ajouter aux Favoris</span>';
        addToFavoritesButton.setAttribute('aria-pressed', 'false');
    }
}

function addHistoryEntry(action, movieId, title) {
    const entry = {
        id: `${movieId}-${Date.now()}`,
        movieId,
        title,
        action,
        timestamp: new Date().toISOString()
    };

    appState.history.unshift(entry);
    appState.history = appState.history.slice(0, 50);
    saveJson('movieExplorerHistory', appState.history);
    renderHistory();
}

function renderHistory() {
    if (!historyList) return;

    if (appState.history.length === 0) {
        historyList.innerHTML = '';
        emptyHistoryState.style.display = 'block';
        return;
    }

    emptyHistoryState.style.display = 'none';
    historyList.innerHTML = appState.history.map(entry => {
        const date = new Date(entry.timestamp).toLocaleString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });

        return `
            <li class="history-item">
                <div class="history-icon">${entry.action === 'ajout' ? '➕' : '➖'}</div>
                <div>
                    <p class="history-action">${entry.action === 'ajout' ? 'Ajouté aux favoris' : 'Retiré des favoris'}</p>
                    <p class="history-title">${entry.title}</p>
                </div>
                <span class="history-date">${date}</span>
            </li>
        `;
    }).join('');
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) {
        console.warn('Toast container absent');
        return;
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('visible');
    });

    setTimeout(() => {
        toast.classList.remove('visible');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 3500);
}

function animateFavoriteButton() {
    if (!addToFavoritesButton) return;
    addToFavoritesButton.classList.add('pulse');
    setTimeout(() => addToFavoritesButton.classList.remove('pulse'), 500);
}

function toggleFavorite() {
    const movieId = Number(addToFavoritesButton.dataset.movieId);
    if (!movieId) return;

    const movieTitle = document.getElementById('modal-title')?.textContent || 'Film';
    const isAlreadyFavorite = appState.favorites.includes(movieId);

    if (isAlreadyFavorite) {
        appState.favorites = appState.favorites.filter(id => id !== movieId);
        addHistoryEntry('suppression', movieId, movieTitle);
        showToast(`« ${movieTitle} » retiré des favoris.`, 'warning');
    } else {
        appState.favorites.push(movieId);
        addHistoryEntry('ajout', movieId, movieTitle);
        showToast(`« ${movieTitle} » ajouté aux favoris.`, 'success');
        animateFavoriteButton();
    }

    saveJson('movieExplorerFavorites', appState.favorites);
    updateFavoriteButton(movieId);

    if (appState.currentSection === 'favorites') {
        displayFavorites();
    }
}

// ============================================
// FAVORIS
// ============================================

async function displayFavorites() {
    if (appState.favorites.length === 0) {
        favoritesMoviesContainer.innerHTML = '';
        emptyFavoritesState.style.display = 'block';
        favoriteSubtitle.textContent = 'Vous n\'avez pas encore ajouté de favoris';
        return;
    }

    emptyFavoritesState.style.display = 'none';
    favoriteSubtitle.textContent = `${appState.favorites.length} film${appState.favorites.length > 1 ? 's' : ''} dans vos favoris`;

    try {
        showSkeletons(favoritesMoviesContainer, appState.favorites.length);
        const genres = await fetchGenres();

        const favoriteMoviesPromises = appState.favorites.map(async (movieId) => {
            if (appState.cache.movies[movieId]) {
                return appState.cache.movies[movieId];
            }

            try {
                const response = await fetch(
                    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=fr-FR`
                );
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const movie = await response.json();
                appState.cache.movies[movieId] = movie;
                return movie;
            } catch (error) {
                console.error(`Erreur lors du chargement du film ${movieId}:`, error);
                return null;
            }
        });

        const favoriteMovies = (await Promise.all(favoriteMoviesPromises)).filter(Boolean);
        displayMovies(favoritesMoviesContainer, favoriteMovies, genres);
    } catch (error) {
        console.error('Erreur lors de l\'affichage des favoris:', error);
        showError('Erreur lors du chargement des favoris.');
    }
}

// ============================================
// MODAL
// ============================================

function openModal() {
    movieModal.classList.add('active');
    movieModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    movieModal.classList.remove('active');
    movieModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

// ============================================
// UTILITAIRES
// ============================================

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b, #e50914);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        box-shadow: 0 4px 12px rgba(229, 9, 20, 0.3);
        animation: slideUp 0.3s ease;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
    }, 4000);
}
