<template>
  <div>
    <div
      class="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400">
      <category-content :categories-data="categoriesData" @deleteHandler="deleteHandler" @updateHandler="updateHandler" />
    </div>

    <category-create-modal />
    <category-update-modal :category-data="categoryData" />

  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'main',
  middleware: ['check', 'protect'],
  data() {
    return {
      categoriesData: [],
      category_name: '',
      id: '',
      categoryData: {},
      deleteData: '',
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

    deleteHandler(data) {
      this.deleteData = data.id
    },

    updateHandler(data) {
      this.categoryData = data
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
