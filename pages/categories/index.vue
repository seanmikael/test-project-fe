<template>
  <div>
    <div
      class="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400"
    >
      <category-content
        :categories-data="categoriesData"
        @deleteHandler="deleteHandler"
        @updateHandler="updateHandler"
      />
    </div>

    <category-create-modal />
    <category-update-modal :category-data="categoryData" />
  </div>
</template>

<script>
import categoriesMixin from '~/mixins/categories/categoriesMixin'
export default {
  mixins: [categoriesMixin],
  layout: 'main',
  middleware: ['check', 'protect'],
}
</script>
