import { useRoute } from 'vue-router';
import { computed, reactive } from 'vue';
import { useMovieStore } from '../stores/movie';
import { useState } from './state';
import { v4 as uuidv4 } from 'uuid';


export function useMovie() {
  const movieId = useRoute().params.id;
  const movieStore = useMovieStore();

  const { state: reviewStore } = useState('reviews');
  const newReview = reactive({ movieId, author: '', rating: 0, comment: '' });

  const { state: myCollections } = useState('my-collections');
  const collection = reactive({ id: null, name: '', movies: [] });

  const movies = computed(() => {
    return movieStore.filteredMovies;
  });

  const movie = computed(() => {
    return movieStore.movie;
  });

  const movieReviews = computed(() => {
    return reviewStore.value.filter(review => review.movieId === movieId)
  });

  const averageRating = computed(() => {
    const totalRating = movieReviews.value.reduce((acc, obj) => acc + obj.rating, 0);
    const avgRating = (totalRating / movieReviews.value.length).toFixed(1);
    return isNaN(avgRating) ? 0 : avgRating;
  });

  function addReview() {
    reviewStore.value.push({ ...newReview });
    newReview.author = '';
    newReview.rating = 0;
    newReview.comment = '';
  }

  function createMovieList() {
    collection.id = uuidv4();
    myCollections.value.push({ ...collection })
  }

  return {
    movieId,
    movie,
    movies,
    movieReviews,
    averageRating,
    newReview,
    myCollections,
    collection,
    movieStore,
    addReview,
    createMovieList
  };
}
