<script setup>
import { useMovie } from '../composables/movie';
import { useMovieFilter } from '../composables/movieFilter';
import MovieCard from '../components/MovieCard.vue';


const props = defineProps({
  movies: Array,
  title: String,
  showControls: {
    type: Boolean,
    default: true
  }
})


const { searchQuery, orderBy, filterBy } = useMovieFilter();
const { movieStore } = useMovie()

</script>

<template>
  <h4 class="text-xl">{{ title }}</h4>
  <div class="px-4 py-5 sm:px-6">
    <div v-if="showControls" class="flex justify-between mt-8 px-4 py-5">
      <form @submit.prevent="filterBy(searchQuery)">
        <input ref="input" v-model="searchQuery.param" class="outline-none border rounded-l-md px-4 py-2" type="text"
          placeholder="Search...">
        <button class="bg-blue-700 border border-blue-700 text-white px-5 py-2 rounded-r-md">Search</button>
      </form>
      <div>
        <label class="block font-medium text-sm text-gray-700" for="sort-by">
          Filter by
        </label>
        <select class="border rounded-md px-4 py-2 w-full" @change="movieStore.filterByGenre($event.target.value)">
          <option value="all">All Movies</option>
          <option value="action">Action Movies</option>
          <option value="comedy">Comedy Movies</option>
          <option value="drama">Drama Movies</option>
        </select>
      </div>
    </div>

    <div class="bg-gray-50 w-full flex" :class="showControls ? 'space-x-8' : 'justify-between'">
      <div @click="orderBy('title')"
        class="w-[250px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
        Title
        <span class="ml-1 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 13l-5-5h10l-5 5z" />
          </svg>
        </span> <small>(click to sort)</small>
      </div>
      <div @click="orderBy('year')"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
        Year
        <span class="ml-1 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 13l-5-5h10l-5 5z" />
          </svg>
        </span>
        <small>(click to sort)</small>
      </div>
      <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Rating
      </div>

      <template v-if="showControls">
        <div class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          style="margin-left: 100px">
          Action
        </div>
      </template>

    </div>
    <template v-if="movies.length">
      <MovieCard v-for="movie in movies" :key="movie.imdbID" :movie="movie" class="card z-50"
        :show-controls="showControls" />
    </template>

    <div v-else class="p-3">No movies found!</div>
  </div>
</template>
