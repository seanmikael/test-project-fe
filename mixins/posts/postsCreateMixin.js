import axios from 'axios'
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      count: 0,
      title: '',
      content: '',
      status: '',
      category: '',
      categoriesData: [],
      postCreated: false,
      imageUrl: null,
      imageFile: null,
    }
  },

  computed: {
    ...mapGetters(['user']),
  },

  mounted() {
    this.getCategories()
  },

  methods: {
    publishPost() {
      this.status = 'Published'
      console.log('Category ID:', this.category)
    },
    savePost() {
      this.status = 'Draft'
      console.log('Post saved to draft!')
    },

    handleImageFileSelected(imageFile) {
      this.imageFile = imageFile
      this.imageUrl = URL.createObjectURL(this.imageFile)
    },

    handleImageUpload(event) {
      this.imageFile = event.target.files[0]
      this.imageUrl = URL.createObjectURL(this.imageFile)
    },

    async createPost() {
      try {
        const accessToken = Cookies.get('access_token')

        const formData = new FormData()
        if (this.imageFile) {
          formData.append('image', this.imageFile)
        }
        formData.append('title', this.title)
        formData.append('content', this.content)
        formData.append('status', this.status)
        formData.append('category_id', this.category)

        const res = await axios.post(
          'http://localhost:8000/api/posts/create',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        console.log('Post created with status:', this.status)
        this.postCreated = true

        this.$router.push({ name: 'posts' })

        if (res.status === 201) {
          if (this.status === 'Draft') console.log('Post saved to draft')
          if (this.status === 'Publish') console.log('Post published')
        } else {
          console.log('Post failed to submit')
        }
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

    updateCount(event) {
      this.count = event.target.value.length
    },
  },
}
