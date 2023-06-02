<template>
  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="border rounded-lg divide-y divide-gray-200">
          <div class="py-3 px-4">
            <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
              <button
                type="button"
                class="hs-tab-active:bg-gray-200 hs-tab-active:text-gray-800 hs-tab-active:hover:text-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm font-medium text-center text-gray-500 rounded-lg hover:text-blue-600 active"
                id="pills-on-gray-color-item-1"
                data-hs-tab="#pills-on-gray-color-1"
                aria-controls="pills-on-gray-color-1"
                role="tab"
              >
                All
              </button>
              <button
                type="button"
                class="hs-tab-active:bg-gray-200 hs-tab-active:text-gray-800 hs-tab-active:hover:text-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm font-medium text-center text-gray-500 rounded-lg hover:text-blue-600"
                id="pills-on-gray-color-item-2"
                data-hs-tab="#pills-on-gray-color-2"
                aria-controls="pills-on-gray-color-2"
                role="tab"
              >
                Active
              </button>
              <button
                type="button"
                class="hs-tab-active:bg-gray-200 hs-tab-active:text-gray-800 hs-tab-active:hover:text-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm font-medium text-center text-gray-500 rounded-lg hover:text-blue-600 dark:hover:text-gray-400 dark:hover:text-gray-300"
                id="pills-on-gray-color-item-2"
                data-hs-tab="#pills-on-gray-color-3"
                aria-controls="pills-on-gray-color-3"
                role="tab"
              >
                Inactive
              </button>
            </nav>
          </div>
          <div class="overflow-hidden">
            <!-- Table for ALL Users-->
            <user-table
              :users-data="usersData"
              id="pills-on-gray-color-1"
              role="tabpanel"
              aria-labelledby="pills-on-gray-color-item-1"
              @updateUser="$emit('updateHandler', $event)"
              @deleteUser="$emit('deleteHandler', $event)"
            />

            <!-- Table for Active Users-->
            <user-table
              :users-data="active"
              class="hidden"
              id="pills-on-gray-color-2"
              role="tabpanel"
              aria-labelledby="pills-on-gray-color-item-2"
              @updateUser="$emit('updateHandler', $event)"
              @deleteUser="$emit('deleteHandler', $event)"
            />
            <!-- Table for Inactive Usrs-->
            <user-table
              :users-data="inactive"
              class="hidden"
              id="pills-on-gray-color-3"
              role="tabpanel"
              aria-labelledby="pills-on-gray-color-item-3"
              @updateUser="$emit('updateHandler', $event)"
              @deleteUser="$emit('deleteHandler', $event)"
            />
          </div>
          <div class="py-1 px-4">
            <nav class="flex items-center space-x-2">
              <a
                class="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                href="#"
              >
                <span aria-hidden="true">«</span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="w-10 h-10 bg-blue-500 text-white p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
                aria-current="page"
                >1</a
              >
              <a
                class="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
                >2</a
              >
              <a
                class="w-10 h-10 text-gray-400 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                href="#"
                >3</a
              >
              <a
                class="text-gray-400 hover:text-blue-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                href="#"
              >
                <span class="sr-only">Next</span>
                <span aria-hidden="true">»</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheContent',
  props: {
    usersData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    active() {
      return this.usersData.filter((user) => user.status === 'Active')
    },
    inactive() {
      return this.usersData.filter((user) => user.status === 'Inactive')
    },
  },
}
</script>
