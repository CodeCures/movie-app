<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MovieList from '../components/MovieList.vue';
import BackButton from '../components/BackButton.vue';
import { useCollection } from '../composables/collection';
import { useGsap } from '../composables/gsap';

const { collection, getMovieCollection } = useCollection()
getMovieCollection(useRoute().params.id)

onMounted(() => {
  collection.value.movies.length && useGsap('.card')
})


</script>

<template>
  <div class="px-4 py-3">
    <BackButton />
    <div class="flex flex-wrap">
      <div class="w-full">
        <div class="relative flex flex-col w-full mb-6 rounded">
          <div class="px-4 py-5 flex-auto">
            <MovieList :movies="collection.movies" :title="collection.name" :show-controls="false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
