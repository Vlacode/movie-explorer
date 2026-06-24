// Clé API TMDB (remplacez par votre propre clé)
const TMDB_API_KEY = 'dd7f7889f5607453222cf6d4d5df732f'; // REMPLACEZ 'YOUR_TMDB_API_KEY' par votre clé API TMDB réelle
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Éléments du DOM
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const movieResultsContainer = document.getElementById('movie-results');
const movieModal = document.getElementById('movie-modal');
const closeModalButton = movieModal.querySelector('.close-button');
const modalTitle = document.getElementById('modal-title');
const modalPoster = document.getElementById('modal-poster');
const modalSynopsis = document.getElementById('modal-synopsis');
const modalGenres = document.getElementById('modal-genres');
const modalReleaseDate = document.getElementById('modal-release-date');
const modalRating = document.getElementById('modal-rating');
const modalRuntime = document.getElementById('modal-runtime');
const modalActors = document.getElementById('modal-actors');
const addToFavoritesButton = document.getElementById('add-to-favorites');
const themeToggle = document.getElementById('theme-toggle');

let favorites = JSON.parse(localStorage.getItem('movieExplorerFavorites')) || [];

// Fonction pour basculer le thème clair/sombre
function toggleTheme() {
    if (themeToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
}

// Initialiser le thème au chargement de la page
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        themeToggle.checked = false;
        document.documentElement.removeAttribute('data-theme');
    }
}

// Fonction utilitaire pour afficher les messages d'état
function showStatusMessage(message, type = 'info') {
    movieResultsContainer.innerHTML = `<p class="${type}-message">${message}</p>`;
}

// Fonction pour gérer les erreurs API
function handleApiError(error, context = 'API') {
    console.error(`Erreur ${context}:`, error);
    showStatusMessage(`Une erreur est survenue lors de ${context}. Veuillez réessayer.`, 'error');
}

// Fonction pour formater la date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Fonction pour récupérer les films populaires au chargement
async function fetchPopularMovies() {
    try {
        showStatusMessage('Chargement des films populaires...', 'loading');
        const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
        } else {
            showStatusMessage('Aucun film populaire trouvé.', 'info');
        }
    } catch (error) {
        handleApiError(error, 'la récupération des films populaires');
    }
}

// Fonction pour rechercher des films
async function searchMovies(query) {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
        showStatusMessage('Veuillez entrer un titre de film pour rechercher.', 'info');
        return;
    }
    showStatusMessage('Chargement des films...', 'loading');
    try {
        const response = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=fr-FR&query=${encodeURIComponent(trimmedQuery)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
        } else {
            showStatusMessage(`Aucun film trouvé pour "${trimmedQuery}".`, 'info');
        }
    } catch (error) {
        handleApiError(error, 'la recherche de films');
    }
}

// Fonction pour afficher les films
async function displayMovies(movies) {
    movieResultsContainer.innerHTML = '';
    const genres = await fetchGenres();

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.dataset.movieId = movie.id;
        movieCard.setAttribute('role', 'button');
        movieCard.setAttribute('tabindex', '0');

        const posterPath = movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';
        const movieGenres = movie.genre_ids.map(genreId => genres[genreId]).filter(Boolean).join(', ');
        const year = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

        movieCard.innerHTML = `
            <img src="${posterPath}" alt="Affiche de ${movie.title}" loading="lazy">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p><strong>Année:</strong> ${year}</p>
                <p><strong>Note:</strong> <span class="rating" aria-label="Note: ${rating} sur 10">${rating}</span>/10</p>
                <p><strong>Genre:</strong> ${movieGenres || 'N/A'}</p>
            </div>
        `;
        
        const openDetails = () => showMovieDetails(movie.id);
        movieCard.addEventListener('click', openDetails);
        movieCard.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openDetails();
            }
        });
        
        movieResultsContainer.appendChild(movieCard);
    });
}

// Fonction pour récupérer la liste des genres
async function fetchGenres() {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=fr-FR`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const genreMap = {};
        if (data.genres) {
            data.genres.forEach(genre => {
                genreMap[genre.id] = genre.name;
            });
        }
        return genreMap;
    } catch (error) {
        console.error('Erreur lors de la récupération des genres:', error);
        return {};
    }
}

// Fonction pour afficher les détails du film dans une modale
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

        modalTitle.textContent = movieData.title || 'Titre inconnu';
        modalPoster.src = movieData.poster_path ? `${TMDB_IMAGE_BASE_URL}${movieData.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';
        modalPoster.alt = `Affiche de ${movieData.title}`;
        modalSynopsis.textContent = movieData.overview || 'Synopsis non disponible.';
        modalGenres.textContent = movieData.genres && movieData.genres.length > 0 ? movieData.genres.map(genre => genre.name).join(', ') : 'N/A';
        modalReleaseDate.textContent = formatDate(movieData.release_date);
        modalRating.textContent = movieData.vote_average ? `${movieData.vote_average.toFixed(1)}/10` : 'N/A';
        modalRuntime.textContent = movieData.runtime ? `${movieData.runtime} minutes` : 'N/A';

        const actors = creditsData.cast && creditsData.cast.length > 0 ? creditsData.cast.slice(0, 5).map(actor => actor.name).join(', ') : 'N/A';
        modalActors.textContent = actors;

        addToFavoritesButton.dataset.movieId = movieId;
        updateFavoriteButton(movieId);

        movieModal.style.display = 'flex';
        movieModal.setAttribute('aria-hidden', 'false');
    } catch (error) {
        handleApiError(error, 'la récupération des détails du film');
    }
}

// Fonction pour mettre à jour le bouton favoris
function updateFavoriteButton(movieId) {
    const movieIdNum = parseInt(movieId);
    const isFavorite = favorites.includes(movieIdNum);
    
    if (isFavorite) {
        addToFavoritesButton.textContent = '❤️ Retirer des favoris';
        addToFavoritesButton.classList.add('remove-favorite');
        addToFavoritesButton.setAttribute('aria-pressed', 'true');
    } else {
        addToFavoritesButton.textContent = '🤍 Ajouter aux favoris';
        addToFavoritesButton.classList.remove('remove-favorite');
        addToFavoritesButton.setAttribute('aria-pressed', 'false');
    }
}

// Fonction pour ajouter/retirer des favoris
function toggleFavorite(movieId) {
    const movieIdNum = parseInt(movieId);
    if (favorites.includes(movieIdNum)) {
        favorites = favorites.filter(id => id !== movieIdNum);
    } else {
        favorites.push(movieIdNum);
    }
    localStorage.setItem('movieExplorerFavorites', JSON.stringify(favorites));
    updateFavoriteButton(movieIdNum);
}

// Fonction pour fermer la modale
function closeModal() {
    movieModal.style.display = 'none';
    movieModal.setAttribute('aria-hidden', 'true');
}

// Écouteurs d'événements
searchButton.addEventListener('click', () => searchMovies(searchInput.value));
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchMovies(searchInput.value);
    }
});

closeModalButton.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === movieModal) {
        closeModal();
    }
});

// Fermer la modale avec la touche Échap
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && movieModal.style.display === 'flex') {
        closeModal();
    }
});

addToFavoritesButton.addEventListener('click', (event) => {
    const movieId = event.target.dataset.movieId;
    if (movieId) {
        toggleFavorite(movieId);
    }
});

themeToggle.addEventListener('change', toggleTheme);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier que la clé API est configurée
    if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY') {
        showStatusMessage('⚠️ Erreur: Clé API TMDB non configurée. Veuillez ajouter votre clé API dans js/script.js', 'error');
        console.error('TMDB API key not configured. Please update TMDB_API_KEY in script.js');
        return;
    }
    
    initTheme();
    fetchPopularMovies();
});

// Gestion des erreurs globales
window.addEventListener('error', (event) => {
    console.error('Erreur globale:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rejection non gérée:', event.reason);
});
