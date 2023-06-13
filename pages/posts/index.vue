<template>
  <div>
    <div
      class="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400">
      <post-content :posts-data="postsData" />

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'main',
  middleware: ['check', 'protect'],
  data() {
    return {
      id: '',
      postsData: [],
      categoriesData: [],
      title: '',
      content: '',
      category: '',
      status: '',
    }
  },
  mounted() {
    this.getPosts()
    this.getCategories()
  },
  methods: {
    async getPosts() {
      try {
        const res = await axios.get('http://localhost:8000/api/posts')
        const posts = res.data.posts
        this.postsData = posts

        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async getCategories() {
      try {
        const res = await axios.get('http://localhost:8000/api/categories')
        this.categoriesData = res.data
      } catch (err) {
        console.error(err)
      }
    },


  },
}
</script>
