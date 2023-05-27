<template>
  <div>
    <template v-if="loggedIn && user">
      {{ user.email }}
      <button @click="logout">Sign Out</button>
      <the-header />
      <the-side-bar />
      <main class="p-10">
        <the-content />
      </main>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'indexPage',
  computed: {
    ...mapGetters('auth', ['loggedIn', 'user']),
  },
  beforeEnter(to, from, next) {
    if (!this.loggedIn) {
      // User is logged in, redirect to the login page
      next('/login')
    } else {
      // User is not logged in, allow access to the page
      next()
    }
  },

  methods: {
    ...mapActions('auth', ['logout']),
  },
}
</script>

<style>
body {
  color: #fff;
  @apply bg-gray-900;
}
</style>
