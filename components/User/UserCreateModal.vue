<template>
  <div
    id="hs-modal-signup"
    class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
  >
    <div
      class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto"
    >
      <div
        class="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h2
              class="block text-2xl font-bold text-gray-800 dark:text-gray-200"
            >
              Create User
            </h2>
          </div>

          <div class="mt-5">
            <!-- Form -->
            <form @submit.prevent="createUser">
              <div class="grid gap-y-4">
                <!-- Form Group -->
                <div>
                  <label for="name" class="block text-sm mb-2 dark:text-white"
                    >Full name</label
                  >
                  <div class="relative">
                    <input
                      v-model="name"
                      type="text"
                      name="name"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      required
                    />
                  </div>
                </div>
                <!-- End Form Group -->

                <!-- Form Group -->
                <div>
                  <label for="email" class="block text-sm mb-2 dark:text-white"
                    >Email address</label
                  >
                  <div class="relative">
                    <input
                      v-model="email"
                      type="email"
                      name="email"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                </div>
                <!-- End Form Group -->

                <!-- Form Group -->
                <div>
                  <label
                    for="password"
                    class="block text-sm mb-2 dark:text-white"
                    >Password</label
                  >
                  <div class="relative">
                    <input
                      v-model="password"
                      type="password"
                      name="password"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      required
                      aria-describedby="password-error"
                    />
                  </div>
                </div>
                <!-- End Form Group -->

                <!-- Form Group -->
                <div>
                  <label
                    for="confirm-password"
                    class="block text-sm mb-2 dark:text-white"
                    >Confirm Password</label
                  >
                  <div class="relative">
                    <input
                      type="password"
                      id="confirm-password"
                      name="confirm-password"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      required
                      aria-describedby="confirm-password-error"
                    />
                  </div>
                </div>
                <!-- End Form Group -->

                <button
                  type="submit"
                  class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Sign up
                </button>
              </div>
            </form>
            <!-- End Form -->
          </div>
        </div>
      </div>
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
          window.location.reload()
        } else console.log('User creation failed')
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
