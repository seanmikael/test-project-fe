<template>
  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="border rounded-lg divide-y divide-gray-200">
          <div class="py-3 px-4">
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
                Published
              </button>
              <button type="button"
                class="hs-tab-active:bg-gray-200 hs-tab-active:text-gray-800 hs-tab-active:hover:text-gray-800 py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm font-medium text-center text-gray-500 rounded-lg hover:text-blue-600 dark:hover:text-gray-400 dark:hover:text-gray-300"
                id="pills-on-gray-color-item-3" data-hs-tab="#pills-on-gray-color-3" aria-controls="pills-on-gray-color-3"
                role="tab">
                Drafts
              </button>
            </nav>
          </div>
          <div class="overflow-hidden">
            <!-- Table for ALL Posts-->
            <post-table :posts-data="postsData" id="pills-on-gray-color-1" role="tabpanel"
              aria-labelledby="pills-on-gray-color-item-1" @updatePost="$emit('updateHandler', $event)"
              @deletePost="$emit('deleteHandler', $event)" />
            <!-- Table for Published Posts-->
            <post-table :posts-data="published" class="hidden" id="pills-on-gray-color-2" role="tabpanel"
              aria-labelledby="pills-on-gray-color-item-2" @updatePost="$emit('updateHandler', $event)"
              @deletePost="$emit('deleteHandler', $event)" />
            <!-- Table for Drafts-->
            <post-table :posts-data="drafts" id="pills-on-gray-color-3" class="hidden" role="tabpanel"
              aria-labelledby="pills-on-gray-color-item-3" @updatePost="$emit('updateHandler', $event)"
              @deletePost="$emit('deleteHandler', $event)" />
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
    postsData: {
      type: Array,
      required: true,
    },
  },

  computed: {
    drafts() {
      return this.postsData.filter((post) => post.status === 'Draft')
    },
    published() {
      return this.postsData.filter((post) => post.status === 'Published')
    },
  },
}
</script>
