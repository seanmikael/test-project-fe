import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      usersData: [],
      userData: {},
      id: '',
      name: '',
      email: '',
      status: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters(['user']),
  },

  mounted() {
    this.getUsers()
  },

  methods: {
    async getUsers() {
      try {
        const res = await axios.get('http://localhost:8000/api/user')
        this.usersData = res.data
      } catch (error) {
        console.error(error)
      }
    },

    updateHandler(user) {
      this.userData = user
      console.log(this.userData)
    },

    deleteHandler(user) {
      this.userData = user
      console.log(this.userData)
    },
  },
}
