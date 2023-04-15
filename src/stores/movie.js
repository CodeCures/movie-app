import axios from "axios";
import { defineStore } from "pinia";

export const useMovieStore = defineStore('movie', {
  state() {
    return {
      movies: [],
      initialSearchParams: ['action', 'comedy', 'drama', 'fiction', 'adventure'],
      filter: { type: null, param: null }
    }
  },
  getters: {
    searchMoviesResults: state => filterMoviesByParam(
      state.movies,
      state.filter.param
    ),

    moviesSortedByTitle: state => [...state.movies].sort(
      (a, b) => a.Title.localeCompare(b.Title)
    ),

    moviesSortedByYear: state => [...state.movies].sort(
      (a, b) => b.Year - a.Year
    ),

    moviesSortedByRating: state => [...state.movies].sort(
      (a, b) => a.Rating - b.Rating
    ),

    filteredMovies: (state) => {
      if (state.filter.type == 'sort') {
        const moviesSortedBy = {
          title: state.moviesSortedByTitle,
          year: state.moviesSortedByYear,
          rating: state.moviesSortedByRating
        }

        return moviesSortedBy[state.filter.param]

      } else if (state.filter.type == 'search') {
        return state.searchMoviesResults
      }

      return state.movies;
    },
  },

  actions: {
    async getMovies() {
      const result = await Promise.all(this.initialSearchParams.map(
        param => axios.get(url(param)).then(({ data }) => data.Search))
      );

      this.movies = result.flat()
    },

    getMovie(movieId) {
      this.movie = findMovie(this.movies, movieId)
    },

    async filterByGenre(genre) {

      if (genre && genre !== 'all') {
        const { data: { Search } } = await axios.get(url(genre));
        this.movies = Search.flat();
      } else {
        this.fetchMovies();
      }
    },
  }
})


function url(param) {
  return `https://www.omdbapi.com/?apikey=91c19a5d&s=${param}&page=1`
}

function filterMoviesByParam(movies, param) {
  return [...movies].filter(movie => (
    movie.Title.toLowerCase().includes(param.toLowerCase()) ||
    movie.Year.toLowerCase().includes(param.toLowerCase())
  ))
}

function findMovie(movies, movieId, findByIndex = false) {
  if (findByIndex) {
    return [...movies].findIndex(movie => movie.imdbID == movieId)
  }
  return [...movies].find(movie => movie.imdbID == movieId)
}
