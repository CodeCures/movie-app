<template>
  <a @click.prevent="$router.back()"
    class="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow hover:bg-gray-100 transition-all duration-300 ease-in-out">
    <div class="w-6 h-6 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </div>
  </a>
</template>
