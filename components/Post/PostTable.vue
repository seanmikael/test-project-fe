<template>
  <div>
    <empty-table v-if="postsData.length == 0" />
    <table v-if="postsData.length > 0" class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th scope="col" class="py-3 px-4 pr-0">
            <div class="flex items-center h-5">
              <input id="hs-table-pagination-checkbox-all" type="checkbox"
                class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
              <label for="hs-table-pagination-checkbox-all" class="sr-only">Checkbox</label>
            </div>
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Creator
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Title
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Category
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Created
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Status
          </th>
          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
            Action
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr v-for="post in paginatedData" :key="post.id">
          <td class="py-3 pl-4">
            <div class="flex items-center h-5">
              <input id="hs-table-pagination-checkbox-1" v-model="selectedPosts" type="checkbox" :value="post.id"
                class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
              <label for="hs-table-pagination-checkbox-1" class="sr-only">Checkbox</label>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
            {{ post.user.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            <nuxt-link :to="`/posts/post?id=${post.id}`"
              class="text-sm text-blue-600 decoration-2 hover:cursor-pointer hover:underline dark:text-blue-500">
              {{ post.title }}</nuxt-link>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {{ post.category.category_name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {{ post.created_at | formatDate }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            <span :class="{
              'relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight':
                post.status === 'Published',
              'relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight':
                post.status === 'Draft',
            }">
              <span aria-hidden :class="{
                'absolute inset-0 bg-green-200 opacity-50 rounded-full':
                  post.status === 'Published',
                'absolute inset-0 bg-red-200 opacity-50 rounded-full':
                  post.status === 'Draft',
              }"></span>
              <span class="relative"> {{ post.status }}</span>
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button data-hs-overlay="#hs-danger-alert" class="text-red-500" @click="deleteHandler(post)">
              Delete
            </button>
          </td>
        </tr>
        <!-- Rest of the table rows -->
      </tbody>
    </table>
    <post-delete-modal :selected-posts="selectedPosts" :selected-post="selectedPost" />
    <div class="border-t border-gray-200 dark:border-gray-700 py-1 px-4">
      <nav class="flex items-center space-x-2">
        <a class="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md" href="#">
          <span aria-hidden="true">«</span>
          <span class="sr-only">Previous</span>
        </a>
        <template v-for="pageNumber in totalPages">
          <nuxt-link :key="pageNumber" :class="{
            'w-10 h-10 bg-blue-500 text-white p-4 inline-flex items-center text-sm font-medium rounded-full':
              pageNumber === currentPage,
            'w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full':
              pageNumber !== currentPage,
          }" :to="{ query: { page: pageNumber } }" aria-current="page">
            {{ pageNumber }}
          </nuxt-link>
        </template>
        <a class="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md" href="#">
          <span class="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </a>
      </nav>
    </div>
  </div>
</template>

<script>
import EmptyTable from '@/components/Shared/EmptyTable'
export default {
  components: {
    EmptyTable,
  },
  props: {
    postsData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedPosts: [],
      selectedPost: 0,
      perPage: 10,
    }
  },
  computed: {
    currentPage() {
      return +this.$route.query.page || 1
    },
    totalPages() {
      return Math.ceil(this.postsData.length / this.perPage);
    },

    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.postsData.slice(startIndex, endIndex);

    }
  },
  methods: {
    deleteHandler(post) {
      this.selectedPost = post.id
    },


  },
}
</script>
