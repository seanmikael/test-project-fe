<template>
  <table
    class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
    id="pills-on-gray-color-3"
    role="tabpanel"
    aria-labelledby="pills-on-gray-color-item-3"
  >
    <thead class="bg-gray-50 dark:bg-gray-700">
      <tr>
        <th scope="col" class="py-3 px-4 pr-0">
          <div class="flex items-center h-5">
            <input
              id="hs-table-pagination-checkbox-all"
              type="checkbox"
              class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            />
            <label for="hs-table-pagination-checkbox-all" class="sr-only"
              >Checkbox</label
            >
          </div>
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
        >
          Category Name
        </th>

        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
        >
          Created
        </th>

        <th
          scope="col"
          class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
        >
          Action
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
      <tr v-for="category in categoriesData" :key="category.id">
        <td class="py-3 pl-4">
          <div class="flex items-center h-5">
            <input
              id="hs-table-pagination-checkbox-1"
              type="checkbox"
              class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            />
            <label for="hs-table-pagination-checkbox-1" class="sr-only"
              >Checkbox</label
            >
          </div>
        </td>
        <td
          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
        >
          {{ category.category_name }}
        </td>

        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
          {{ category.created_at | formatDate }}
        </td>

        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            class="text-blue-500 mr-4"
            data-hs-overlay="#hs-modal-update"
            @click="$emit('updateCategory', category)"
          >
            Edit
          </button>
          <button
            class="text-red-500"
            @click="$emit('deleteCategory', category)"
          >
            Delete
          </button>
        </td>
      </tr>
      <!-- Rest of the table rows -->
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    categoriesData: {
      type: Array,
      required: true,
    },
  },
}
</script>
