<template>
  <div>
    <count-card />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CountCard from '@/components/Index/CountCard'
export default {
  components: {
    CountCard,
  },
  layout: 'main',
  middleware: ['check', 'protect'],
  async asyncData({ store }) {
    await store.dispatch('fetchUser')
  },

  computed: {
    ...mapGetters(['loggedIn', 'user']),
  },
}
</script>
