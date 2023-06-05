<template>
  <main>
    <the-form @login="login" />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['loggedIn', 'user']),
  },
  created() {
    // Check if the user is already logged in
    if (this.loggedIn) {
      this.$router.push('/') // Redirect to home page if already logged in
    }
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
