<template>
  <div>
    <p v-if="user && user.email">{{ user.email }}</p>
    <p v-else>Loading user data...</p>
    <p>This is the main index page</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'main',
  // middleware: 'protect',
  async asyncData({ store }) {
    await store.dispatch('auth/fetchUser')
  },

  computed: {
    ...mapGetters('auth', ['loggedIn', 'user']),
  },
}
</script>
