<template>
  <div>
    <count-card />
    <div class="mx-auto w-3/5 overflow-hidden">
      <canvas data-te-chart="line" data-te-dataset-label="Traffic"
        data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
        data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]">
      </canvas>
    </div>
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
