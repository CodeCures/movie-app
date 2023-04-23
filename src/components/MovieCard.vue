<script setup>
import RatingStar from '../components/RatingStar.vue';
import { useAverageRating } from '../composables/averageRating';
import {
  openModal,
} from '../helpers';

const props = defineProps({
  movie: Object,
  showControls: {
    type: Boolean,
    default: true
  }
});

const {
  averageRating,
  similarMovies
} = useAverageRating(props.movie.imdbID, props.movie);


</script>

<template>
  <div class="flex items-center justify-between shadow-md p-3 my-1 rounded text-sm font-sans">
    <span class="w-[250px] truncate inline-block">{{ movie.Title }}</span>
    <span class="w-md truncate inline-block">{{ movie.Year }}</span>
    <span class="flex items-center font-semibold space-x-2">
      <RatingStar :class="{ 'fill-yellow-500': averageRating }" /> <span>{{ averageRating || 'N/A' }}</span>
    </span>
    <span v-if="showControls" class="space-x-3">
      <router-link :to="{ name: 'ShowMovie', params: { 'id': movie.imdbID } }"
        class="bg-indigo-700 text-white px-6 py-2 rounded-full hover:bg-indigo-500 transition-all ease-in">
        view
      </router-link>
      <button @click="openModal(movie)"
        class="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-500 transition-all ease-in">
        Save movie
      </button>
    </span>
  </div>
</template>
