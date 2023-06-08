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
        <div class="flex w-3/4">
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

                <div class="count ml-auto text-gray-400 text-xs font-semibold">
                  {{ count }}/300
                </div>
              </div>
              <!-- buttons -->
              <div class="buttons flex">
                <button
                  class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
                  type="submit"
                  @click="savePost"
                >
                  Draft
                </button>
                <button
                  class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
                  @click="publishPost"
                  type="submit"
                >
                  Publish
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="flex w-1/4">
          <div class="flex flex-col">
            <div v-if="imageUrl" class="mt-4">
              <h4 class="text-sm font-medium mb-2 dark:text-white">
                Image Preview
              </h4>
              <img :src="imageUrl" class="h-64 w-full" alt="Image Preview" />
            </div>

            <h4 class="text-sm font-medium mb-2 dark:text-white">
              Image Preview
            </h4>
            <div
              v-if="!imageUrl"
              class="relative order-first md:order-last h-28 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover"
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
          </div>
        </div>
      </div>
    </div>
    <post-image-modal @file-selected="handleImageFileSelected" />
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
export default {
  layout: 'main',
  middleware: ['check', 'protect'],
  data() {
    return {
      count: 0,
      title: '',
      content: '',
      status: '',
      category: '',
      categoriesData: [],
      postCreated: false,
      imageUrl: null,
      imageFile: null,
    }
  },

  computed: {
    ...mapGetters(['user']),
  },

  mounted() {
    this.getCategories()
  },

  methods: {
    publishPost() {
      this.status = 'Publish'
      console.log('Category ID:', this.category)
    },
    savePost() {
      this.status = 'Draft'
      console.log('Post saved to draft!')
    },

    handleImageFileSelected(imageFile) {
      this.imageFile = imageFile
      this.imageUrl = URL.createObjectURL(this.imageFile)
    },

    handleImageUpload(event) {
      this.imageFile = event.target.files[0]
      this.imageUrl = URL.createObjectURL(this.imageFile)
    },

    async createPost() {
      try {
        const accessToken = Cookies.get('access_token')

        const formData = new FormData()
        formData.append('image', this.imageFile)
        formData.append('title', this.title)
        formData.append('content', this.content)
        formData.append('status', this.status)
        formData.append('category_id', this.category)

        const res = await axios.post(
          'http://localhost:8000/api/posts/create',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        console.log('Post created with status:', this.status)
        this.postCreated = true

        this.$router.push({ name: 'posts' })

        if (res.status === 201) {
          if (this.status === 'Draft') console.log('Post saved to draft')
          if (this.status === 'Publish') console.log('Post published')
        } else {
          console.log('Post failed to submit')
        }
      } catch (err) {
        console.error(err)
      }
    },

    async getCategories() {
      try {
        const res = await axios.get('http://localhost:8000/api/categories')
        this.categoriesData = res.data
      } catch (err) {
        console.error(err)
      }
    },

    updateCount(event) {
      this.count = event.target.value.length
    },
  },
}
</script>
