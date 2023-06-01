<input type="radio" name="active" value="Active" />
Active
<template>
  <div>
    <user-content
      :users-data="usersData"
      @editUser="updateHandler"
      @deleteUser="deleteUser"
    />
    <p v-if="user && loggedIn">
      {{ user.email }}
    </p>
    <p v-else>Loading user data...</p>
    <p>This is the Users Index Page</p>

    <form @submit.prevent="updateUser">
      <input
        v-model="data.name"
        type="text"
        name="name"
        placeholder="Enter your name"
      />
      <input
        v-model="data.email"
        type="email"
        name="email"
        placeholder="Enter your email"
      />
      <input
        v-model="data.password"
        type="password"
        name="password"
        placeholder="Enter your password"
      />
      <input v-model="data.status" type="radio" name="status" value="Active" />
      Active
      <input
        v-model="data.status"
        type="radio"
        name="status"
        value="Inactive"
      />
      Inactive
      <button type="submit">Update User</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  layout: 'main',
  data() {
    return {
      usersData: [],
      data: {
        id: '',
        name: '',
        email: '',
        status: '',
        password: '',
      },
    }
  },
  computed: {
    ...mapGetters('auth', ['loggedIn', 'user']),
  },

  mounted() {
    if (this.loggedIn) this.getUsers()
  },

  methods: {
    async getUsers() {
      try {
        const res = await axios.get('http://localhost:8000/api/user')
        this.usersData = res.data
      } catch (error) {
        console.error(error)
      }
    },

    updateHandler(data) {
      this.data = {
        id: data.id || '',
        name: data.name || '',
        email: data.email || '',
        status: data.status || '',
        password: data.password || '',
      }
      console.log(data.id)
    },

    async updateUser() {
      try {
        const res = await axios.put(
          `http://localhost:8000/api/user/${this.data.id}`,
          {
            name: this.data.name,
            email: this.data.email,
            password: this.data.password,
            status: this.data.status,
          }
        )

        // Handle the response based on your application's logic
        if (res.status === 200) {
          // Update was successful
          console.log('User updated successfully')
          window.location.reload()
        } else {
          // Update failed
          console.log('User update failed')
        }
      } catch (error) {
        // Handle any errors that occurred during the API call
        console.error(error)
      }
    },

    async deleteUser(data) {
      try {
        this.data = {
          id: data.id || '',
        }
        const res = await axios.delete(
          `http://localhost:8000/api/user/${this.data.id}`
        )

        if (res.status === 200) {
          console.log('User deleted')
          window.location.reload()
        } else {
          console.log('User deletion failed')
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
