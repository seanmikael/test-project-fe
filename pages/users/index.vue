<template>
  <div>
    <div
      class="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400"
    >
      <user-content
        :users-data="usersData"
        @updateHandler="updateHandler"
        @deleteHandler="deleteHandler"
      />
    </div>

    <user-create-modal />
    <user-update-modal :user-data="userData" />
    <user-delete-modal :user-data="userData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  layout: 'main',
  middleware: ['check', 'protect'],

  data() {
    return {
      usersData: [],
      userData: {},
      id: '',
      name: '',
      email: '',
      status: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters(['user']),
  },

  mounted() {
    this.getUsers()
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

    updateHandler(user) {
      this.userData = user
      console.log(this.userData)
    },

    deleteHandler(user) {
      this.userData = user
      console.log(this.userData)
    },
  },
}
</script>
