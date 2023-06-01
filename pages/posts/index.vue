<template>
  <div>
    <p>This is the post index page</p>
    <post-content
      :posts-data="postsData"
      @deletePost="deletePost"
      @editPost="updateHandler"
    />

    <post-content-draft
      :posts-data-draft="draftsData"
      @deletePost="deletePost"
      @editPost="updateHandler"
    />

    <form @submit.prevent="updatePost">
      <textarea v-model="content" rows="4" cols="50"></textarea>
      <label for="category">Choose a category:</label>
      <select v-model="category" name="category">
        <option
          v-for="categoryOption in categoriesData"
          :key="categoryOption.id"
          :value="categoryOption.id"
        >
          {{ categoryOption.category_name }}
        </option>
      </select>
      <input v-model="status" type="radio" name="status" value="Publish" />
      Published
      <input v-model="status" type="radio" name="status" value="Draft" />
      Draft
      <button type="submit">Edit Post</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'main',
  data() {
    return {
      id: '',
      postsData: [],
      draftsData: [],
      categoriesData: [],
      content: '',
      category: '',
      status: '',
    }
  },
  mounted() {
    this.getPosts()
    this.getDraftPosts()
    this.getCategories()
  },
  methods: {
    updateHandler(data) {
      this.id = data.id
      this.content = data.content
      this.category = data.category.category_name
      this.status = data.status
    },

    async updatePost() {
      try {
        const res = await axios.put(
          `http://localhost:8000/api/posts/${this.id}`,
          {
            content: this.content,
            category_id: this.category,
            status: this.status,
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

    async getDraftPosts() {
      try {
        const res = await axios.get(
          'http://localhost:8000/api/posts?status=Draft'
        )
        const posts = res.data.posts
        this.draftsData = posts

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

    async deletePost(post) {
      try {
        const res = await axios.delete(
          `http://localhost:8000/api/posts/${post.id}`
        )
        if (res.status === 200) {
          console.log('Post deleted')
          window.location.reload()
        } else console.log('Post failed to delete')
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
