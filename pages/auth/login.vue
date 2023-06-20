<template>
  <main>
    <the-form :error-message="errorMessage" @login="login" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      errorMessage: '',
    }
  },
  methods: {
    login({ email, password }) {
      this.$store
        .dispatch('login', {
          isLogin: this.isLogin,
          email,
          password,
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          this.errorMessage = error.response.data.error
        })
    },
  },
}
</script>
