<template>
  <main>
    <form @submit="login">
      <label for="email"> Email: </label>
      <input v-model="email" type="email" />
      <label for="password"> Password: </label>
      <input v-model="password" type="password" />
      <button type="submit">Login</button>
    </form>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters('auth', ['loggedIn', 'user']),
  },
  beforeEnter(to, from, next) {
    if (this.loggedIn) {
      // User is logged in, redirect to the login page
      next('/')
    } else {
      // User is not logged in, allow access to the page
      next()
    }
  },
  methods: {
    async login(event) {
      event.preventDefault()
      try {
        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })
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
