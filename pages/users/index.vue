<input type="radio" name="active" value="Active" />
Active
<template>
  <div>
    <div
      class="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400"
    >
      <user-content
        :users-data="usersData"
        @updateHandler="updateHandler"
        @deleteHandler="deleteUser"
      />
    </div>

    <user-create-modal />

    <div
      id="hs-medium-modal"
      class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
    >
      <div
        class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto"
      >
        <div
          class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]"
        >
          <div
            class="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700"
          >
            <h3 class="font-bold text-gray-800 dark:text-white">Edit Users</h3>
            <button
              type="button"
              class="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
              data-hs-overlay="#hs-medium-modal"
            >
              <span class="sr-only">Close</span>
              <svg
                class="w-3.5 h-3.5"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <div class="p-4 overflow-y-auto">
            <form @submit.prevent="updateUser">
              <div>
                <label for="name" class="block text-sm mb-2">Username:</label>
                <div class="relative mb-4">
                  <input
                    v-model="name"
                    type="text"
                    name="name"
                    class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                    style="box-shadow: 0 0 0 2px black"
                  />
                </div>
              </div>

              <div class="mb-4">
                <label for="email" class="block text-sm mb-2"
                  >Email address</label
                >
                <div class="relative">
                  <input
                    v-model="email"
                    type="email"
                    name="email"
                    class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                    style="box-shadow: 0 0 0 2px black"
                  />
                </div>
              </div>

              <div class="mb-4">
                <label for="password" class="block text-sm mb-2"
                  >Password</label
                >
                <div class="relative">
                  <input
                    v-model="password"
                    type="password"
                    name="password"
                    class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                    style="box-shadow: 0 0 0 2px black"
                  />
                </div>
              </div>

              <div class="mb-4">
                <div class="grid space-y-3">
                  <div class="relative flex items-start">
                    <div class="flex items-center h-5 mt-1">
                      <input
                        v-model="status"
                        value="Active"
                        name="hs-radio-with-description"
                        type="radio"
                        class="border-gray-200 rounded-full text-blue-600 focus:ring-blue-500"
                        aria-describedby="hs-radio-delete-description"
                      />
                    </div>
                    <label for="hs-radio-delete" class="ml-3">
                      <span class="block text-sm font-semibold text-gray-800"
                        >Active</span
                      >
                      <span
                        id="hs-radio-delete-description"
                        class="block text-sm text-gray-600"
                        >Active users can login.</span
                      >
                    </label>
                  </div>

                  <div class="relative flex items-start">
                    <div class="flex items-center h-5 mt-1">
                      <input
                        v-model="status"
                        value="Inactive"
                        name="hs-radio-with-description"
                        type="radio"
                        class="border-gray-200 rounded-full text-blue-600 focus:ring-blue-500"
                        aria-describedby="hs-radio-archive-description"
                      />
                    </div>
                    <label for="hs-radio-archive" class="ml-3">
                      <span class="block text-sm font-semibold text-gray-800"
                        >Inactive</span
                      >
                      <span
                        id="hs-radio-archive-description"
                        class="block text-sm text-gray-600"
                        >Inactive users are unable to login.</span
                      >
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
              >
                Update User
              </button>
            </form>
          </div>

          <div
            class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700"
          >
            <button
              type="button"
              class="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              data-hs-overlay="#hs-medium-modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
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
      id: '',
      name: '',
      email: '',
      status: '',
      password: '',
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

    updateHandler(user) {
      this.id = user.id
      this.name = user.name
      this.email = user.email
      this.status = user.status
      this.password = user.password
      console.log(user)
    },

    async updateUser() {
      try {
        const res = await axios.put(
          `http://localhost:8000/api/user/${this.id}`,
          {
            name: this.name,
            email: this.email,
            password: this.password,
            status: this.status,
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

    async deleteUser() {
      try {
        const res = await axios.delete(
          `http://localhost:8000/api/user/${this.id}`
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
