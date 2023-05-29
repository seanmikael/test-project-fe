<template>
  <!-- parent (all)-->
  <div class="flex flex-row m-0 w-screen">
    <!-- child (sidebar)-->
    <the-side-bar />
    <!-- second parent -->
    <div class="flex flex-grow flex-wrap">
      <!-- child (header)-->
      <div class="h-20 w-full flex"></div>
      <!-- child (content)-->
      <div class="flex h-full mx-auto">
        <nuxt />
      </div>
    </div>
  </div>
</template>
