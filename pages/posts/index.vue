<template>
  <div>
    <div
      class="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400"
    >
      <post-content :posts-data="postsData" />
    </div>
  </div>
</template>

<script>
import postsMixin from '~/mixins/posts/postsMixin'
export default {
  mixins: [postsMixin],
  layout: 'main',
  middleware: ['check', 'protect'],
}
</script>
