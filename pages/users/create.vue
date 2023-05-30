<template>
  <div>
    <h1 class="mb-4">This is the create users page</h1>
    <form @submit.prevent="createUser">
      <label for="name"> Name:</label>
      <input v-model="name" type="text" />
      <label for="email"> Email:</label>
      <input v-model="email" type="email" />
      <label for="password"> Password:</label>
      <input v-model="password" type="password" />
      <input v-model="status" type="radio" name="status" value="Active" />
      Active
      <input v-model="status" type="radio" name="status" value="Inactive" />
      Inactive
      <button type="submit">Create User</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  layout: 'main',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      status: '',
    }
  },
  methods: {
    async createUser() {
      try {
        const res = await axios.post(
          'http://localhost:8000/api/auth/register',
          {
            name: this.name,
            email: this.email,
            password: this.password,
            status: this.status,
          }
        )
        if (res.status === 200) {
          console.log('User created successfully')
          this.$router.push('../users')
        } else console.log('User creation failed')
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
