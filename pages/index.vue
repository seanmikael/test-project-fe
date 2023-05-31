<template>
  <div>
    <p v-if="loggedIn">
      {{ user.email }}
    </p>
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
