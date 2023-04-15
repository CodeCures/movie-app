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
  getters: {},

  actions: {
    async getMovies() {
      const result = await Promise.all(this.initialSearchParams.map(
        param => axios.get(url(param)).then(({ data }) => data.Search))
      );

      this.movies = result.flat()
    }
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
