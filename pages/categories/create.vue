<template>
  <div>
    <h1>This is categories create page</h1>
    <form @submit.prevent="createCategory">
      <label for="category"> Name:</label>
      <input v-model="category" type="text" />
      <button type="submit">Create</button>
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
