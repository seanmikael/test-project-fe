<template>
  <!-- parent (all)-->
  <div class="flex flex-row m-0 w-full h-screen">
    <!-- child (sidebar)-->
    <the-side-bar />
    <!-- second parent -->
    <div class="flex flex-grow flex-wrap">
      <!-- child (header)-->
      <div class="h-20 w-full">
        <the-header />
      </div>
      <!-- child (content)-->
      <div class="flex h-full mx-auto pt-4">
        <nuxt />
      </div>
    </div>
  </div>
</template>
