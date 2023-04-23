<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap';

onMounted(() => {
  gsap.from('.card', {
    duration: .5,
    opacity: 0,
    y: 100,
    ease: 'power1',
    stagger: .1
  })
})
</script>

<template>
  <div class="px-8 py-20">

    <div v-for="i in 20" class="card flex items-center justify-between shadow-md p-3 rounded text-sm font-sans">
      <span class="max-w-md truncate">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius excepturi ex quas
        illum repellendus? Veritatis culpa, cumque tenetur modi quia consequatur temporibus ipsum corrupti enim, iste
        repellat, corporis itaque delectus?</span>
      <span class="flex items-center font-semibold space-x-2">
        <RatingStar :class="{ 'fill-yellow-500': 1 }" /> <span>3.5</span>
      </span>
      <span class="space-x-3">
        <button class="bg-indigo-700 text-white px-6 py-2 rounded-full hover:bg-indigo-500 transition-all ease-in">
          view
        </button>
        <button class="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-500 transition-all ease-in">
          Save movie
        </button>
      </span>
    </div>
  </div>
</template>
