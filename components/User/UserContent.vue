<template>
  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="border rounded-lg divide-y divide-gray-200">
          <!--HEADER START-->
          <div
            class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
            <!-- TABS TO OPEN DIFFERENT TABLES -->
            <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
              <button type="button"
                class="hs-tab-active:bg-gray-200 hs-tab-active:text-gray-800 hs-tab-active:hover:text-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm font-medium text-center text-gray-500 rounded-lg hover:text-blue-600 active"
                id="pills-on-gray-color-item-1" data-hs-tab="#pills-on-gray-color-1" aria-controls="pills-on-gray-color-1"
                role="tab">
                All
              </button>
              <button type="button"
                class="hs-tab-active:bg-gray-200 hs-tab-active:text-gray-800 hs-tab-active:hover:text-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm font-medium text-center text-gray-500 rounded-lg hover:text-blue-600"
                id="pills-on-gray-color-item-2" data-hs-tab="#pills-on-gray-color-2" aria-controls="pills-on-gray-color-2"
                role="tab">
                Active
              </button>
              <button type="button"
                class="hs-tab-active:bg-gray-200 hs-tab-active:text-gray-800 hs-tab-active:hover:text-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm font-medium text-center text-gray-500 rounded-lg hover:text-blue-600 dark:hover:text-gray-400 dark:hover:text-gray-300"
                id="pills-on-gray-color-item-2" data-hs-tab="#pills-on-gray-color-3" aria-controls="pills-on-gray-color-3"
                role="tab">
                Inactive
              </button>
            </nav>

            <div class="inline-flex gap-x-2">
              <a class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-modal-signup">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                  fill="none">
                  <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" />
                </svg>
                <!-- OPENS MODAL IN INDEX-->
                Add user
              </a>
            </div>
          </div>
          <!-- HEADER END-->
          <div class="overflow-hidden">
            <!-- TABLE FOR ALL USERS-->
            <user-table :users-data="usersData" id="pills-on-gray-color-1" role="tabpanel"
              aria-labelledby="pills-on-gray-color-item-1" @updateUser="$emit('updateHandler', $event)"
              @deleteUser="$emit('deleteHandler', $event)" />

            <!-- TABLE FOR ACTIVE USERS-->
            <user-table :users-data="active" class="hidden" id="pills-on-gray-color-2" role="tabpanel"
              aria-labelledby="pills-on-gray-color-item-2" @updateUser="$emit('updateHandler', $event)"
              @deleteUser="$emit('deleteHandler', $event)" />
            <!-- TABLE FOR INACTIVE USERS-->
            <user-table :users-data="inactive" class="hidden" id="pills-on-gray-color-3" role="tabpanel"
              aria-labelledby="pills-on-gray-color-item-3" @updateUser="$emit('updateHandler', $event)"
              @deleteUser="$emit('deleteHandler', $event)" />
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
