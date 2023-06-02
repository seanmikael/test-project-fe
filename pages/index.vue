<template>
  <div>
    <p v-if="user && user.email">{{ user.email }}</p>
    <p v-else>Loading user data...</p>
    <p>This is the main index page</p>
    <try-content />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'main',

  async asyncData({ store }) {
    await store.dispatch('auth/fetchUser')
  },

  computed: {
    ...mapGetters('auth', ['loggedIn', 'user']),
  },
}
</script>
