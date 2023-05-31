<template>
  <div>
    <p>This is the post index page</p>
    <post-content :posts-data="postsData" @deletePost="deletePost" />
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
        const posts = res.data.posts
        this.postsData = posts

        console.log(res.data)
      } catch (err) {
        console.error(err)
      }
    },

    async deletePost(post) {
      try {
        this.data = {
          id: post.id || '',
        }
        const res = await axios.delete(
          `http://localhost:8000/posts/${this.data.id}`
        )
        if (res.status === 200) console.log('Post deleted')
        else console.log('Post failed to delete')
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
