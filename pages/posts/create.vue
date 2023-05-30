<template>
  <div>
    <h1 class="mb-4">This is the create posts page</h1>
    <form @submit.prevent="createPost">
      <textarea v-model="content" rows="4" cols="50"></textarea>
      <button @click="publishPost" type="submit">Publish</button>
      <button @click="savePost" type="submit">Draft</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
export default {
  layout: 'main',
  data() {
    return {
      content: '',
      status: '', // Track the status of the post
    }
  },
  methods: {
    publishPost() {
      this.status = 'Publish'
      console.log(this.accessToken)
    },
    savePost() {
      this.status = 'Draft'
      console.log('Post saved to draft!')
    },
    async createPost() {
      try {
        const accessToken = Cookies.get('access_token')
        const res = await axios.post(
          'http://localhost:8000/api/posts/create',
          {
            content: this.content,
            status: this.status,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        console.log('Post created with status:', this.status)

        this.$router.push('../posts')

        if (res.status === 200) {
          if (this.status === 'Draft') console.log('Post saved to draft')
          if (this.status === 'Publish') console.log('Post published')
        } else {
          console.log('Post failed to submit')
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
