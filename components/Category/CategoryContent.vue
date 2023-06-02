<template>
  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="border rounded-lg divide-y divide-gray-200">
          <div class="overflow-hidden">
            <!-- Table for ALL Users-->
            <category-table
              :categories-data="categoriesData"
              id="pills-on-gray-color-1"
              role="tabpanel"
              aria-labelledby="pills-on-gray-color-item-1"
              @updateCategory="$emit('updateHandler', $event)"
              @deleteCategory="$emit('deleteHandler', $event)"
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
    categoriesData: {
      type: Array,
      required: true,
    },
  },
}
</script>
