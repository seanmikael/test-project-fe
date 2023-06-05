<template>
  <div>
    <div
      class="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400"
    >
      <!-- Form -->
      <form @submit.prevent="createUser">
        <div class="grid gap-y-4">
          <!-- Form Group -->
          <div>
            <label for="name" class="block text-sm mb-2">Username:</label>
            <div class="relative">
              <input
                v-model="name"
                type="text"
                name="name"
                class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                style="box-shadow: 0 0 0 2px black"
              />
            </div>
          </div>
          <!-- End Form Group -->

          <!-- Form Group -->
          <div>
            <label for="email" class="block text-sm mb-2">Email address</label>
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
          <!-- End Form Group -->

          <!-- Form Group -->
          <div>
            <label for="password" class="block text-sm mb-2">Password</label>
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
          <!-- End Form Group -->

          <!-- Form Group -->
          <div>
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
          <!-- End Form Group -->
          <button
            type="submit"
            class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
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
