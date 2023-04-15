<script setup>
import { storeToRefs } from 'pinia';
import { useMovieStore } from '../stores/movie.js';
import MovieList from '../components/MovieList.vue';

const { filteredMovies } = storeToRefs(useMovieStore());
const movieStore = useMovieStore();

movieStore.getMovies();


</script>

<template>
  <MovieList :movies="filteredMovies" />
</template>
