<template>
  <div>
    <div>
      <category-content
        :categories-data="categoriesData"
        @deleteHandler="deleteCategory"
        @updateHandler="updateHandler"
      />
    </div>
    <form @submit.prevent="editCategory">
      <label for="category"> Category Name: </label>
      <input v-model="category_name" type="text" />
      <button type="submit">Edit Category</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'main',
  data() {
    return {
      categoriesData: [],
      category_name: '',
      id: '',
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      try {
        const res = await axios.get('http://localhost:8000/api/categories')
        this.categoriesData = res.data
      } catch (err) {
        console.error(err)
      }
    },

    async deleteCategory(data) {
      try {
        const res = await axios.delete(
          `http://localhost:8000/api/categories/${data.id}`
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

    updateHandler(data) {
      this.id = data.id || ''
      this.category_name = data.category_name || ''
    },

    async editCategory() {
      try {
        const res = await axios.put(
          `http://localhost:8000/api/categories/${this.id}`,
          {
            category_name: this.category_name,
          }
        )
        if (res.status === 200) {
          console.log('Category updated!')
          window.location.reload()
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
