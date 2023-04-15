import { computed, reactive } from 'vue';
import { filterReviewsByMovieId, useStateValue } from '../helpers';

export function useReview(movieId) {
  let reviewStore = useStateValue('reviews')
  const newReview = reactive({ movieId, author: '', rating: 0, comment: '' });


  const movieReviews = computed(() => {
    return [...filterReviewsByMovieId(reviewStore, movieId)].reverse()
  });


  function addReview() {
    reviewStore.push({ ...newReview });
    newReview.author = '';
    newReview.rating = 0;
    newReview.comment = '';
  }

  return {
    movieReviews,
    newReview,
    addReview
  };
}
