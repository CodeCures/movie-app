<script setup>
import MovieList from '../components/MovieList.vue';

const {
  movies,
  movieStore
} = useMovie();

movieStore.getMovies()

</script>

<template>
  <MovieList :movies="movies" />
</template>
