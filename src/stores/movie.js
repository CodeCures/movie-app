import { defineStore } from "pinia";

export const useMovieStore = defineStore('movie', {
  state() {
    return {
      movies: [],
      initialSearchParams: ['action', 'comedy', 'drama', 'fiction', 'adventure']
    }
  },
  getters: {},

  actions: {}
})
