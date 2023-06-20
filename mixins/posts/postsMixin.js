import axios from 'axios'

export default {
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
