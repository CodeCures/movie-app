import { computed, reactive, watch } from 'vue';
import { useState } from './state';

export function useAverageRating(movieId, movie = null) {

  const { state: averageRatingStore } = useState('average-ratings');
  const newRating = reactive({ movie: null, rating: 0, ratingCount: '' });

  const movieReviews = computed(() => {
    const reviews = useState('reviews').state.value;
    return reviews.filter(review => review.movieId === movieId)
  });

  const averageRating = computed(() => {
    const totalRating = movieReviews.value.reduce((acc, obj) => acc + obj.rating, 0);
    const avgRating = (totalRating / movieReviews.value.length).toFixed(1);
    return isNaN(avgRating) ? 0 : avgRating;
  });

  const similarMovies = computed(() => {
    const result = [...averageRatingStore.value].filter(avg => (
      avg.rating === averageRating.value &&
      avg.ratingCount === movieReviews.value.length &&
      avg.movie.imdbID !== movieId
    )
    );

    return result.map(data => data.movie)
  });

  watch(averageRating, newAverage => {
    const ratingIndex = averageRatingStore.value.findIndex(
      rating => rating.movie.imdbID === movieId
    );

    newRating.movie = movie;
    newRating.rating = newAverage;
    newRating.ratingCount = movieReviews.value.length;

    if (ratingIndex !== -1) {
      averageRatingStore.value[ratingIndex] = { ...newRating }
    } else {
      averageRatingStore.value.push({ ...newRating });
    }
  })

  return {
    averageRating,
    newRating,
    averageRatingStore,
    similarMovies
  };
}
