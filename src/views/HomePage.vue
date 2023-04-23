<script setup>
import { ref, onMounted } from 'vue';
import MovieList from '../components/MovieList.vue';
import { useMovie } from '../composables/movie';
import { useCollection } from '../composables/collection';
import { useGsap } from '../composables/gsap';

onMounted(() => useGsap('.card'))

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import {
  collectedMovie,
  isOpen as isModalOpen,
  closeModal,
  addToList
} from '../helpers';

const {
  movies,
  movieStore,
} = useMovie();

movieStore.getMovies();

const {
  myCollections,
  collection,
  createMovieList, addToMyCollection } = useCollection()

const isOpen = ref(false); // used to toggle movie-list form

</script>

<template>
  <ul class="flex justify-end mb-0 list-none bg-gray-200">
    <li v-for="col in myCollections" :key="col.id" class="p-1">
      <router-link :to="`/my-collections/${col.id}`"
        class="text-xs font-bold uppercase px-5 py-3 inline-block underline underline-offset-4 decoration-wavy">
        {{ col.name }}
      </router-link>
    </li>
  </ul>
  <div class="px-4 py-3">
    <div>
      <div class="flex justify-end py-5">
        <button @click="isOpen = !isOpen" class="bg-blue-700 text-white text-sm font-light py-1 px-4 rounded">Create a
          collection</button>
      </div>
    </div>
    <!-- create a movie collection -->
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
    </div><!--/ end -->
    
    <div class="flex flex-wrap">
      <div class="w-full">
        <div class="relative flex flex-col w-full mb-6 rounded">
          <div class="px-4 py-5 flex-auto">
            <MovieList :movies="movies" title="All Movies" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <TransitionRoot appear :show="isModalOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                My Collections
              </DialogTitle>
              <div class="mt-2">
                <ul class="divide-y divide-gray-200">

                  <template v-if="myCollections.length">
                    <li v-for="collection in myCollections" :key="collection.name"
                      @click="addToList(collection.id, collectedMovie, addToMyCollection)"
                      class="flex items-center py-4 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer">
                      <svg class="w-8 h-8 text-purple-600 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" fill="currentColor"></path>
                        <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
                          fill="currentColor"></path>
                      </svg>
                      <div class="flex-1">
                        <h3 class="text-lg font-medium text-gray-900">{{ collection.name }}</h3>
                        <p class="text-gray-600">({{ collection.movies.length }}) movies collected so far!</p>
                      </div>
                    </li>
                  </template>

                  <li v-else class="flex items-center py-4">
                    <svg class="w-8 h-8 text-red-600 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" fill="currentColor"></path>
                      <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
                        fill="currentColor"></path>
                    </svg>
                    <div class="flex-1">
                      <h3 class="text-lg font-medium text-red-900">No collection Found!</h3>
                      <p class="text-red-600">It appears you've not created any movie collection</p>
                    </div>
                  </li>
                </ul>

              </div>

              <div class="mt-4">
                <button type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  @click="closeModal">
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
