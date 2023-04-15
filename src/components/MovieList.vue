<script setup>
defineProps({
  movies: Array
})

</script>

<template>
  <div class="px-4 py-5 sm:px-6">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>

          <th width="380" scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
            Title
            <span class="ml-1 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 13l-5-5h10l-5 5z" />
              </svg>
            </span> <small>(click to sort)</small>
          </th>
          <th scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
            Release Year
            <span class="ml-1 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 13l-5-5h10l-5 5z" />
              </svg>
            </span>
            <small>(click to sort)</small>
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex  justify-between ">
                <router-link :to="`movies/${movie.imdbID}`"
                  class="w-[70px] bg-blue-500 hover:bg-blue-700 text-white text-sm font-light py-1 px-4 rounded">
                  view
                </router-link>

                <AddToCollectionButton v-if="showColBtn" :movie="movie" />
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
</template>
