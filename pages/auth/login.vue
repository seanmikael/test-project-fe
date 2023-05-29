<template>
  <main>
    <the-form @login="login" />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoginPage',
  computed: {
    ...mapGetters('auth', ['loggedIn', 'user']),
  },
  methods: {
    async login(credentials) {
      try {
        await this.$store.dispatch('auth/login', credentials)
        // Redirect to the home page after successful login
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        // Handle login error
      }
    },
  },
}
</script>
