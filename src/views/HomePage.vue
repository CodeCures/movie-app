<script setup>
import { ref } from 'vue';
import MovieList from '../components/MovieList.vue';
import { useMovie } from '../composables/movie';
import { useCollection } from '../composables/collection';


const {
  movies,
  movieStore,
} = useMovie();

movieStore.getMovies()

const { myCollections, collection, createMovieList } = useCollection()


const isOpen = ref(false);

const openTab = ref(null);
function toggleTabs(tabNumber) {
  openTab.value = tabNumber
}

</script>

<template>
  <div class="px-4 py-3">
    <div>
      <div class="flex justify-end py-5">
        <button @click="isOpen = !isOpen"
          class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-light py-1 px-4 rounded">Create a
          collection</button>
      </div>
    </div>

    <div v-if="isOpen">
      <form @submit.prevent="createMovieList" class="mx-auto p-6 bg-white rounded-md shadow-md">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-semibold mb-1">Collection Name</label>
          <input v-model="collection.name" id="name" type="text"
            class="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="My All time Favorite">
        </div>
        <button type="submit"
          class="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Add
          Collection</button>
      </form>

      <hr class="pb-5">
    </div>

    <div class="flex flex-wrap">
      <div class="w-full">
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              v-on:click="toggleTabs(null)"
              :class="{ 'text-red-600 bg-white': openTab !== null, 'text-white bg-red-600': openTab === null }">
              All
            </a>
          </li>

          <li v-for="(list, index) in myCollections" :key="list.name"
            class="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              v-on:click="toggleTabs(index)"
              :class="{ 'text-red-600 bg-white': openTab !== index, 'text-white bg-red-600': openTab === index }">
              {{ list.name }}
            </a>
          </li>
        </ul>
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div class="px-4 py-5 flex-auto">
            <div class="tab-content tab-space">
              <div :class="{ 'hidden': openTab !== null, 'block': openTab === null }">
                <MovieList :movies="movies" title="All Movies" />
              </div>

              <div v-for="(myCollection, index) in myCollections" :key="myCollection.name"
                :class="{ 'hidden': openTab !== index, 'block': openTab === index }">
                <MovieList :movies="myCollection.movies" :title="myCollection.name" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
