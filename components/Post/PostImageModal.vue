<template>
  <div
    id="hs-modal-image"
    class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
  >
    <div
      class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto"
    >
      <div
        class="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h2
              class="block text-2xl font-bold text-gray-800 dark:text-gray-200"
            >
              Add Image to Post
            </h2>
          </div>

          <div class="mt-5">
            <!-- Form -->
            <form>
              <div class="grid gap-y-4">
                <!-- Form Group -->
                <div>
                  <label
                    for="file-input-medium"
                    class="block text-sm mb-2 dark:text-white"
                    >Choose image file</label
                  >
                  <div class="relative">
                    <label for="file-input-medium" class="sr-only"
                      >Choose file</label
                    >
                    <input
                      id="file-input-medium"
                      ref="imageInput"
                      type="file"
                      name="file-input-medium"
                      accept="image/*"
                      class="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                      @change="handleFileChange"
                    />
                  </div>
                </div>
                <!-- End Form Group -->
              </div>
            </form>
            <!-- End Form -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleFileChange(event) {
      const imageFile = event.target.files[0]
      this.$emit('file-selected', imageFile)
    },
  },
}
</script>
