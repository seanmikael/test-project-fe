<template>
  <main>
    <the-form @login="login" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
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
    },
  },
}
</script>
