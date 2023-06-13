<template>
  <div
    id="hs-modal-update"
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
              Edit User
            </h2>
          </div>

          <div class="mt-5">
            <!-- Form -->
            <form @submit.prevent="updateCategory">
              <div class="grid gap-y-4">
                <!-- Form Group -->
                <div>
                  <label for="name" class="block text-sm mb-2 dark:text-white"
                    >Category Name:
                  </label>
                  <div class="relative">
                    <input
                      v-model="form.name"
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
                  Update Category
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
  props: {
    categoryData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    form() {
      return {
        id: this.categoryData.id,
        name: this.categoryData.category_name,
      }
    },
  },
  methods: {
    async updateCategory() {
      try {
        const res = await axios.put(
          `http://localhost:8000/api/categories/${this.form.id}`,
          {
            category_name: this.form.name,
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
  },
}
</script>
