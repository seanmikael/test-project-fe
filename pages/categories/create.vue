<template>
  <div>
    <form @submit.prevent="createCategory">
      <div class="grid gap-y-4">
        <!-- Form Group -->
        <div>
          <label for="category" class="block text-sm mb-2">Email address</label>
          <div class="relative">
            <input
              v-model="category"
              type="text"
              name="category"
              class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <!-- End Form Group -->

        <button
          type="submit"
          class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
        >
          Create Category
        </button>
      </div>
    </form>
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
          this.$router.push('../categories')
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
