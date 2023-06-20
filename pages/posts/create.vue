<template>
  <div>
    <div
      class="flex flex-col bg-white mb-6 border shadow-sm rounded-xl w-1/2 p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400"
    >
      <h3 class="text-base font-bold text-gray-800 dark:text-white">
        Create Post
      </h3>
    </div>

    <div
      class="flex flex-col bg-white border w-5/6 shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]"
    >
      <div class="flex flex-row p-4 md:p-10">
        <div class="flex w-2/3">
          <form class="w-full" @submit.prevent="createPost">
            <div class="editor flex flex-col text-gray-800 p-4 max-w-3xl">
              <input
                v-model="title"
                class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                spellcheck="false"
                placeholder="Title"
                type="text"
              />
              <textarea
                v-model="content"
                maxlength="300"
                class="description mb-4 bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
                spellcheck="false"
                placeholder="Describe everything about this post here"
                @input="updateCount"
              ></textarea>
              <label
                for="hs-select-label"
                class="block text-sm font-medium mb-2 dark:text-white"
                >Category</label
              >
              <div class="flex flex-row">
                <select
                  v-model="category"
                  class="py-2 px-3 pr-9 block w-48 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  name="category"
                >
                  <option
                    v-for="categoryOption in categoriesData"
                    :key="categoryOption.id"
                    :value="categoryOption.id"
                  >
                    {{ categoryOption.category_name }}
                  </option>
                </select>

                <!-- icons -->
                <div class="icons flex text-gray-500 m-2">
                  <svg
                    class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <svg
                    class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <svg
                    class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-hs-overlay="#hs-modal-image"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </div>
                <div class="count ml-auto text-gray-400 text-xs font-semibold">
                  {{ count }}/300
                </div>
              </div>

              <!-- BUTTONS START -->
              <div v-if="categoriesData.length > 0" class="flex gap-x-2 mt-4">
                <button
                  type="submit"
                  class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                  @click="savePost"
                >
                  Draft
                </button>
                <button
                  type="submit"
                  class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  @click="publishPost"
                >
                  Publish
                </button>
              </div>

              <div v-if="categoriesData.length == 0" class="flex gap-x-2 mt-4">
                <button
                  type="button"
                  class="hs-tooltip-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-500 shadow-sm align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all cursor-not-allowed text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                  disabled
                >
                  Draft
                </button>

                <button
                  type="button"
                  class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all cursor-not-allowed text-sm"
                  disabled
                >
                  Publish
                </button>
              </div>
              <!-- BUTTONS END -->
            </div>
          </form>
        </div>
        <div class="flex w-1/3">
          <div class="flex flex-col">
            <div
              v-if="imageUrl"
              class="relative order-first md:order-last h-72 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover"
            >
              <img :src="imageUrl" class="h-80 w-full" alt="Image Preview" />
            </div>

            <div
              v-if="!imageUrl"
              class="relative order-first md:order-last h-72 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover"
            >
              <span class="text-gray-400 opacity-75">
                <svg
                  class="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="0.7"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </span>
            </div>

            <div
              v-if="categoriesData.length == 0"
              class="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4"
              role="alert"
            >
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg
                    class="h-4 w-4 text-yellow-400 mt-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                    />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-sm text-yellow-800 font-semibold">
                    Cannot create post
                  </h3>
                  <div class="mt-1 text-sm text-yellow-700">
                    No categories found in the data.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <post-image-modal @file-selected="handleImageFileSelected" />
  </div>
</template>

<script>
import postsCreateMixin from '~/mixins/posts/postsCreateMixin'
export default {
  mixins: [postsCreateMixin],
  layout: 'main',
  middleware: ['check', 'protect'],
}
</script>
