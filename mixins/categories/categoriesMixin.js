import axios from 'axios'

export default {
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
