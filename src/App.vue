<script setup>
import { ref } from 'vue';
import axios from 'axios'
import MovieList from './components/MovieList.vue';

const movies = ref([]);

async function getMovies() {
  const response = (await axios.get('https://www.omdbapi.com/?apikey=91c19a5d&s=adventure&page=1')).data
  movies.value = response.Search
}


getMovies()

</script>

<template>
  <div class="flex flex-col bg-blue-100 h-screen overflow-y-auto">
    <div class="w-[1100px] mx-auto my-2">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div class="bg-white divide-y divide-gray-200">
            <MovieList :movies="movies" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
