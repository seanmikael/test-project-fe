<template>
  <div>
    <p>This is the post index page</p>
    <post-content :posts-data="postsData" />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'main',
  data() {
    return {
      postsData: [],
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      try {
        const res = await axios.get('http://localhost:8000/api/posts')
        this.postsData = res.data
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
