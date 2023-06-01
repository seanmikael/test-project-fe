<template>
  <div>
    <p v-if="user && loggedIn">
      {{ user.email }}
    </p>
    <p v-else>Loading user data...</p>
    <p>This is the main index page</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'main',

  computed: {
    ...mapGetters('auth', ['loggedIn', 'user']),
  },
}
</script>
