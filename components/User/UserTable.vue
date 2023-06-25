<template>
  <div>
    <empty-table v-if="usersData.length == 0" />
    <table
      v-if="usersData.length > 0"
      class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
    >
      <thead class="bg-gray-50 dark:bg-slate-800">
        <tr>
          <th scope="col" class="pl-6 py-3 text-left">
            <div class="flex items-center h-5">
              <input
                id="hs-table-pagination-checkbox-all"
                type="checkbox"
                class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
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
            Username
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Email
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Created
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            Status
          </th>

          <th
            scope="col"
            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="user in paginatedData" :key="user.id">
          <td class="py-3 pl-4">
            <div class="flex items-center h-5">
              <input
                id="hs-table-pagination-checkbox-1"
                v-model="selectedUsers"
                type="checkbox"
                :value="user.id"
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
            {{ user.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {{ user.email }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            {{ user.created_at | formatDate }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
            <span
              :class="{
                'relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight':
                  user.status === 'Active',
                'relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight':
                  user.status === 'Inactive',
              }"
            >
              <span
                aria-hidden
                :class="{
                  'absolute inset-0 bg-green-200 opacity-50 rounded-full':
                    user.status === 'Active',
                  'absolute inset-0 bg-red-200 opacity-50 rounded-full':
                    user.status === 'Inactive',
                }"
              ></span>
              <span class="relative"> {{ user.status }}</span>
            </span>
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
          >
            <button
              class="text-blue-500 mr-4"
              data-hs-overlay="#hs-modal-update"
              @click="$emit('updateUser', user)"
            >
              Edit
            </button>
            <button
              class="text-red-500"
              data-hs-overlay="#hs-danger-alert"
              @click="deleteHandler(user)"
            >
              Delete
            </button>
          </td>
        </tr>
        <!-- Rest of the table rows -->
      </tbody>
    </table>

    <user-delete-modal
      :selected-users="selectedUsers"
      :selected-user="selectedUser"
    />
    <div class="border-t border-gray-200 dark:border-gray-700 py-1 px-4">
      <nav class="flex items-center space-x-2">
        <nuxt-link
          v-if="currentPage > 1"
          class="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
          :to="{ query: { page: previousPage } }"
        >
          <span aria-hidden="true">«</span>
          <span class="sr-only">Previous</span>
        </nuxt-link>
        <template v-for="pageNumber in totalPages">
          <nuxt-link
            v-if="totalPages > 1"
            :key="pageNumber"
            :class="{
              'w-10 h-10 bg-blue-500 text-white p-4 inline-flex items-center text-sm font-medium rounded-full':
                pageNumber === currentPage,
              'w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full':
                pageNumber !== currentPage,
            }"
            :to="{ query: { page: pageNumber } }"
            aria-current="page"
          >
            {{ pageNumber }}
          </nuxt-link>
        </template>
        <nuxt-link
          v-if="currentPage < totalPages"
          class="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
          :to="{ query: { page: nextPage } }"
        >
          <span class="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script>
import EmptyTable from '@/components/shared/EmptyTable'
export default {
  components: {
    EmptyTable,
  },
  props: {
    usersData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedUsers: [],
      selectedUser: 0,
      perPage: 10,
    }
  },
  computed: {
    currentPage() {
      return +this.$route.query.page || 1
    },
    totalPages() {
      return Math.ceil(this.usersData.length / this.perPage)
    },

    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.perPage
      const endIndex = startIndex + this.perPage
      return this.usersData.slice(startIndex, endIndex)
    },

    previousPage() {
      return +this.$route.query.page - 1
    },

    nextPage() {
      return +this.$route.query.page + 1
    },
  },
  methods: {
    deleteHandler(user) {
      this.selectedUser = user.id
    },
  },
}
</script>
