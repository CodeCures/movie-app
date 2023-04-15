<script setup>
import { useMovie } from '../composables/movie';
import { useMovieFilter } from '../composables/movieFilter';
import { useCollection } from '../composables/collection';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import {
  collectedMovie,
  isOpen,
  openModal,
  closeModal,
  addToList
} from '../helpers';


defineProps({
  movies: Array,
  title: String,
  showControls: {
    type: Boolean,
    default: true
  }
})


const { searchQuery, orderBy } = useMovieFilter();

const { myCollections, addToMyCollection } = useCollection()

const { movieStore } = useMovie()

</script>

<template>
  <h4 class="text-xl">{{ title }}</h4>
  <div class="px-4 py-5 sm:px-6">
    <div v-if="showControls" class="flex justify-between mt-8 px-4 py-5">
      <div>
        <input ref="input" v-model="searchQuery.param" class="border rounded-md px-4 py-2 w-full" type="text"
          placeholder="Search...">
      </div>
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
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>

          <th width="380" scope="col" @click="orderBy('title')"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
            Title
            <span class="ml-1 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 13l-5-5h10l-5 5z" />
              </svg>
            </span> <small>(click to sort)</small>
          </th>
          <th scope="col" @click="orderBy('year')"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
            Release Year
            <span class="ml-1 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 13l-5-5h10l-5 5z" />
              </svg>
            </span>
            <small>(click to sort)</small>
          </th>
          <th v-if="showControls" scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">

        <template v-if="movies.length">
          <tr v-for="movie in movies" :key="movie.imdbID">
            <td class="px-6 py-4">
              {{ movie.Title }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ movie.Year }}
            </td>
            <td v-if="showControls">
              <div class="space-x-2">
                <router-link :to="{ name: 'ShowMovie', params: { id: movie.imdbID } }"
                  class="w-[70px] bg-blue-500 hover:bg-blue-700 text-white text-sm font-light py-1 px-4 rounded">
                  view
                </router-link>

                <button @click="openModal(movie)"
                  class="w-[102px] bg-blue-500 hover:bg-blue-700 text-white text-sm font-light py-1 px-4 rounded">
                  Add to List
                </button>

              </div>
            </td>
          </tr>
        </template>

        <tr v-else>
          <td colspan="3" class="px-6 py-4 whitespace-nowrap"> No Movie Found!</td>
        </tr>
      </tbody>
    </table>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
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
