import { ref } from 'vue';
import { useState } from '../composables/state';

export const collectedMovie = ref(null);
export const isOpen = ref(false);

export function closeModal() {
  isOpen.value = false;
}

export function openModal(movie) {
  isOpen.value = true;
  collectedMovie.value = movie;
}

export function addToList(listId, movie, callback) {

  if (typeof callback === 'function') {
    callback(listId, movie)
  }

  closeModal();
}


export function useStateValue(key) {
  const { state } = useState(key);
  return state.value;
}


export function filterReviewsByMovieId(reviews, movieId) {
  return reviews.filter(review => review.movieId === movieId);
}
