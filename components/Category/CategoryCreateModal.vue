<template>
  <div
    id="hs-modal-create"
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
              Create Category
            </h2>
          </div>

          <div class="mt-5">
            <!-- Form -->
            <form @submit.prevent="createCategory">
              <div class="grid gap-y-4">
                <!-- Form Group -->
                <div>
                  <label for="name" class="block text-sm mb-2 dark:text-white"
                    >Category name:
                  </label>
                  <div class="relative">
                    <input
                      v-model="category"
                      type="text"
                      name="name"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      required
                    />
                  </div>
                </div>
                <!-- End Form Group -->

                <button
                  type="submit"
                  class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Create Category
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
      category: '',
    }
  },
  methods: {
    async createCategory() {
      try {
        const res = await axios.post(
          'http://localhost:8000/api/categories/create',
          {
            category_name: this.category,
          }
        )
        if (res.status === 200) {
          console.log('Category Created')
          window.location.reload()
        } else {
          console.log('Category creation failed')
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
