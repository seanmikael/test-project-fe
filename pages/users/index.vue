<template>
  <div>
    <div
      class="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400"
    >
      <user-content
        :users-data="usersData"
        @updateHandler="updateHandler"
        @deleteHandler="deleteHandler"
      />
    </div>

    <user-create-modal />
    <user-update-modal :user-data="userData" />
  </div>
</template>

<script>
import usersMixin from '~/mixins/users/usersMixin'

export default {
  mixins: [usersMixin],
  layout: 'main',
  middleware: ['check', 'protect'],
}
</script>
