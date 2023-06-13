<template>
  <div>
    <div
      class="flex flex-col bg-white mb-6 border shadow-sm rounded-xl w-1/2 p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400"
    >
      <!-- BREADCRUMBS START-->
      <ol
        class="flex items-center whitespace-nowrap min-w-0 mb-2"
        aria-label="Breadcrumb"
      >
        <li class="text-sm">
          <nuxt-link
            :to="{ name: 'posts' }"
            class="flex items-center text-gray-500 hover:text-blue-600"
          >
            Posts
            <svg
              class="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </nuxt-link>
        </li>
        <li class="text-sm">
          <span class="flex items-center text-gray-500" href="#">
            Post
            <svg
              class="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </span>
        </li>
        <li
          class="text-sm font-semibold text-gray-800 truncate dark:text-gray-200"
          aria-current="page"
        >
          View Post
        </li>
      </ol>
      <h3 class="text-base font-bold text-gray-800 dark:text-white">
        {{ title }}
      </h3>
    </div>

    <!-- BREADCRUMBS END-->

    <!-- POST START-->
    <div v-if="!edit" class="flex flex-row">
      <div class="flex w-4/5">
        <div class="rounded-xl border p-5 shadow-md w-full bg-white">
          <div class="flex w-full items-center justify-between border-b pb-3">
            <div class="flex items-center space-x-3">
              <div
                class="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"
              ></div>
              <div class="text-lg font-bold text-slate-700">{{ name }}</div>
            </div>
            <div class="flex items-center space-x-8">
              <button
                class="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold"
              >
                {{ category }}
              </button>
              <div class="text-xs text-neutral-500">
                {{ created_at | formatDate }}
              </div>
            </div>
          </div>

          <div class="mt-4 mb-6">
            <div class="mb-3 text-xl font-bold">{{ title }}</div>
            <div class="text-sm text-neutral-600">
              {{ content }}
            </div>
          </div>

          <div v-if="image_path">
            <div class="flex items-center justify-between text-slate-500">
              <div class="flex space-x-4 md:space-x-8">
                <div class="flex flex-col mb-5">
                  <div class="w-full h-96">
                    <img
                      class="object-cover w-full h-full"
                      :src="getImageUrl(image_path)"
                      alt="Post Image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- BUTTONS -->
          <!-- IF POST IS A DRAFT PUBLISH IS PRESENT-->
          <div class="flex justify-end">
            <div v-if="status === 'Draft' && !edit" class="flex">
              <button
                class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500"
                @click="editState"
                type="submit"
              >
                Edit
              </button>
              <button
                class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
                type="submit"
                @click="publishPost"
              >
                Publish
              </button>
            </div>
            <div
              v-if="status === 'Published' && !edit"
              class="flex justify-end align-bottom items-start"
            >
              <button
                class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500"
                @click="editState"
                type="submit"
              >
                Edit
              </button>
            </div>
            <div v-if="edit" class="flex justify-end">
              <button
                class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500"
                type="submit"
                @click="cancelState"
              >
                Cancel
              </button>
              <button
                class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
                type="submit"
                @click="updatePost"
              >
                Submit
              </button>
            </div>
          </div>
          <!-- BUTTONS END-->
        </div>
      </div>
      <!-- SIDE DETAILS START-->
      <div class="flex w-1/5">
        <div class="flex flex-grow ml-8">
          <div class="flex flex-col">
            <!-- AUTHOR -->
            <div class="flex flex-col mb-5">
              <h3 class="block text-sm font-medium dark:text-white mb-2">
                Author
              </h3>
              <span
                class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ name }}
              </span>
            </div>
            <!-- DATE -->
            <div class="flex flex-col mb-5 divide-gray-400">
              <h3 class="block text-sm font-medium mb-2 dark:text-white">
                Posted at
              </h3>
              <span
                class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ created_at | formatDate }}
              </span>
            </div>

            <!-- CATEGORY -->
            <div class="flex flex-col mb-5">
              <h3 class="block text-sm font-medium mb-2 dark:text-white">
                Category
              </h3>
              <span
                class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ category }}
              </span>
            </div>

            <!-- STATUS -->
            <div class="flex flex-col">
              <h3 class="block text-sm font-medium mb-2 dark:text-white">
                Status
              </h3>

              <span
                :class="{
                  'inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-blue-100 text-blue-800':
                    status === 'Published',
                  'inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-red-100 text-red-800':
                    status === 'Draft',
                }"
              >
                {{ status }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- SIDE DETAILS END-->
    </div>
    <!-- POST END -->

    <!-- EDIT BLOCK START (IF EDIT)-->
    <div
      v-if="edit"
      class="flex flex-col bg-white border w-5/6 shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]"
    >
      <div class="flex flex-row p-4 md:p-10">
        <div class="flex w-2/3">
          <form class="w-full" @submit.prevent="updatePost">
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
                  v-model="categoryEdit"
                  class="py-2 px-3 pr-9 block w-48 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  name="category"
                >
                  <option :value="category.id" disabled selected>
                    {{ category || 'Select a category' }}
                  </option>

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

              <!-- BUTTONS -->
              <!-- IF POST IS A DRAFT PUBLISH IS PRESENT-->
              <div class="flex mt-4">
                <div v-if="status === 'Draft' && !edit" class="flex">
                  <button
                    type="submit"
                    class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    @click="editState"
                  >
                    Cancel
                  </button>

                  <button
                    class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
                    @click="publishPost"
                    type="submit"
                  >
                    Publish
                  </button>
                </div>
                <div v-if="status === 'Published' && !edit" class="self-end">
                  <button
                    type="submit"
                    class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    @click="editState"
                  >
                    Edit
                  </button>
                </div>
                <div v-if="edit" class="flex self-end gap-x-2">
                  <button
                    type="submit"
                    class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    @click="cancelState"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    @click="updatePost"
                  >
                    Submit
                  </button>
                </div>
                <!-- BUTTONS END-->
              </div>
            </div>
          </form>
        </div>
        <div class="flex w-1/3">
          <div class="flex flex-col">
            <div
              v-if="image_path && !previewUrl"
              class="relative order-first md:order-last h-96 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover"
            >
              <img
                class="object-cover w-full h-full"
                :src="getImageUrl(image_path)"
                alt="Post Image"
              />
            </div>

            <div
              v-if="previewUrl"
              class="relative order-first md:order-last h-72 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover"
            >
              <img :src="previewUrl" class="h-80 w-full" alt="Image Preview" />
            </div>

            <div
              v-if="!image_path"
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
          </div>
        </div>
      </div>
    </div>
    <post-image-modal @file-selected="handleImageFileSelected" />
    <!-- EDIT BLOCK END (IF EDIT)-->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'main',
  middleware: ['check', 'protect'],
  data() {
    return {
      count: 0,
      edit: false,
      title: '',
      content: '',
      category: '',
      categoryEdit: '',
      categoryId: null,
      status: '',
      name: '',
      created_at: null,
      categoriesData: [],
      image_path: '',
      imageUrl: null,
      imageFile: null,
      previewUrl: null,
    }
  },
  created() {
    this.getPosts()
    this.getCategories()
  },
  methods: {
    getImageUrl(imagePath) {
      const imageUrl = `http://localhost:8000/storage/${imagePath}`
      console.log(imageUrl)
      return imageUrl
    },

    handleImageFileSelected(imageFile) {
      this.imageFile = imageFile
      this.imageUrl = URL.createObjectURL(this.imageFile)
      this.previewUrl = URL.createObjectURL(this.imageFile)
    },

    handleImageUpload(event) {
      this.imageFile = event.target.files[0]
      this.imageUrl = URL.createObjectURL(this.imageFile)
    },

    async getPosts() {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/posts/${this.$route.query.id}`
        )
        const posts = res.data.post
        this.title = posts.title
        this.content = posts.content
        this.category = posts.category.category_name
        this.categoryId = posts.category_id
        this.status = posts.status
        this.name = posts.user.name
        this.created_at = posts.created_at
        this.image_path = posts.image_path
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

    editState() {
      this.edit = true
    },

    cancelState() {
      this.edit = false
    },

    async updatePost() {
      try {
        const formData = new FormData()
        if (this.imageFile) {
          formData.append('image', this.imageFile)
        }
        formData.append('title', this.title)
        formData.append('content', this.content)
        formData.append('status', this.status)
        formData.append('category_id', this.categoryEdit)

        const res = await axios.post(
          `http://localhost:8000/api/posts/${this.$route.query.id}?_method=PUT`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )

        // Handle the response based on your application's logic
        if (res.status === 200) {
          // Update was successful
          console.log('Post updated successfully')
          window.location.reload()
        } else {
          // Update failed
          console.log('Post update failed')
        }
      } catch (error) {
        // Handle any errors that occurred during the API call
        console.error(error)
      }
    },

    async publishPost() {
      try {
        const formData = new FormData()
        if (this.imageFile) {
          formData.append('image', this.imageFile)
        }
        formData.append('title', this.title)
        formData.append('content', this.content)
        formData.append('status', 'Published')
        formData.append('category_id', this.categoryId)

        const res = await axios.post(
          `http://localhost:8000/api/posts/${this.$route.query.id}?_method=PUT`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )

        // Handle the response based on your application's logic
        if (res.status === 200) {
          // Update was successful
          console.log('Post updated successfully')
          window.location.reload()
        } else {
          // Update failed
          console.log('Post update failed')
        }
      } catch (error) {
        // Handle any errors that occurred during the API call
        console.error(error)
      }
    },
  },
}
</script>
