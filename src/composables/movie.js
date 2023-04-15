import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useMovieStore } from '../stores/movie';



export function useMovie() {
  const movieId = useRoute().params.id;
  const movieStore = useMovieStore();

  const movies = computed(() => {
    return movieStore.filteredMovies;
  });

  const movie = computed(() => movieStore.movie);

  return {
    movieId,
    movie,
    movies,
    movieStore
  };
}
