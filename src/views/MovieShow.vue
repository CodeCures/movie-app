<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useMovieStore } from '../stores/movie';
import BackButton from '../components/BackButton.vue';
import RatingStar from '../components/RatingStar.vue';
import StarRating from 'vue-star-rating'
import { computed } from '@vue/reactivity';

const movieId = useRoute().params.id;

const { movie } = storeToRefs(useMovieStore());
const movieStore = useMovieStore();
movieStore.getMovie(movieId);


const reviews = reactive([
  {
    author: 'Evan You',
    rating: 3,
    comment: 'This movie has not code in it but it\'s OK'
  },
  {
    author: 'Anthony Fu',
    rating: 5,
    comment: 'He used vueUse, so i\'ll give him five'
  }
])

const review = reactive({ author: '', rating: 0, comment: '' });

const averageRating = computed(() => {
  const totalRating = reviews.reduce((acc, obj) => acc + obj.rating, 0);
  const avgRating = (totalRating / reviews.length).toFixed(1);

  return isNaN(avgRating) ? 0 : avgRating;
});


watch(averageRating, newRating => {
  movieStore.setMovieAverageRating(movieId, newRating)
  movieStore.setMovieARatingCount(movieId, reviews.value.length)
});


</script>

<template>
  <div class="p-5">
    <BackButton />
    <div class="container mx-auto px-4 py-8">
      <header class="flex justify-between items-center">
        <h1 class="text-3xl font-bold">{{ movie?.Title }}</h1>
        <div class="flex items-center">
          <RatingStar :class="{ 'fill-yellow-500': averageRating }" />
          <span class="ml-2 font-bold">{{ averageRating || 'N/A' }}</span>
        </div>
      </header>
      <section class="my-8">
        <h2 class="text-xl font-bold">Descriptions</h2>
        <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis luctus est, vel gravida
          velit. Nunc lacinia, turpis vel sagittis mattis, ex ipsum tincidunt sapien, vel ullamcorper risus ex a nulla.
          Vestibulum euismod neque vitae nisi facilisis blandit. Praesent in tellus sit amet quam pretium efficitur.</p>
      </section>

      <section class="max-w-4xl mx-auto my-8">
        <h2 class="text-3xl font-bold mb-4">Leave a Review</h2>
        <form @submit.prevent="addReview(review)" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="reviewer-name">
              Name
            </label>
            <input v-model="review.author"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reviewer-name" type="text" placeholder="Your name">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="rating">
              Rating
            </label>
            <div class="flex flex-row-reverse justify-end">
              <star-rating :increment="1" :max-rating="5" :star-size="30" v-model:rating="review.rating">
              </star-rating>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="review-text">
              Review
            </label>
            <textarea v-model="review.comment"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="review-text" placeholder="Write your review"></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Submit
            </button>
            <div class="text-gray-500 text-sm">
              <span class="mr-2">Your rating:</span>
              <span class="text-yellow-500">Not rated</span>
            </div>
          </div>
        </form>
      </section>


      <section class="my-8">
        <h2 class="text-xl font-bold">Reviews</h2>
        <div class="mt-2">
          <template v-if="reviews.length">
            <div v-for="review in reviews" :key="review.author" class="flex items-center mb-4">
              <img src="https://via.placeholder.com/64" alt="Reviewer Avatar" class="rounded-full h-12 w-12 object-cover">
              <div class="ml-4">
                <h3 class="text-lg font-bold">{{ review.author }}</h3>
                <div class="flex items-center">
                  <RatingStar class="fill-yellow-500" />
                  <span class="ml-1 font-bold">{{ review.rating }} / 5</span>
                </div>
                <p class="mt-2">{{ review.comment }}</p>
              </div>
            </div>
          </template>

          <template v-else>
            <p>No reviews found</p>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>
