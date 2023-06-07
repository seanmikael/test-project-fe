<template>
  <div>
    <div
      class="flex flex-col bg-white mb-6 border shadow-sm rounded-xl w-1/2 p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400"
    >
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
          {{ title }}
        </li>
      </ol>
      <h3 class="text-base font-bold text-gray-800 dark:text-white">
        View Post
      </h3>
    </div>
    <div class="flex flex-row">
      <div
        class="flex flex-col bg-white border w-5/6 shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]"
      >
        <div class="p-4 md:p-10">
          <div class="editor flex flex-col text-gray-800 p-4 max-w-3xl">
            <input
              v-model="title"
              :class="{
                'opacity-70 pointer-events-none title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none':
                  edit === false,
                'title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none':
                  edit === true,
              }"
              spellcheck="false"
              placeholder="Title"
              type="text"
            />
            <textarea
              v-model="content"
              maxlength="300"
              :class="{
                'opacity-70 pointer-events-none description mb-4 bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none':
                  edit === false,
                'description mb-4 bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none':
                  edit === true,
              }"
              spellcheck="false"
              placeholder="Describe everything about this post here"
              @input="updateCount"
            ></textarea>

            <select
              v-if="edit == true"
              v-model="categoryEdit"
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
              <div class="count ml-auto text-gray-400 text-xs font-semibold">
                {{ count }}/300
              </div>
            </div>
            <!-- buttons -->

            <div class="buttons flex" v-if="status == 'Draft' && edit == false">
              <button
                class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
                @click="editState"
                type="submit"
              >
                Edit
              </button>
              <button
                class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
                type="submit"
              >
                Publish
              </button>
            </div>

            <div
              class="buttons flex"
              v-if="status == 'Publish' && edit == false"
            >
              <button
                class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
                @click="editState"
                type="submit"
              >
                Edit
              </button>
            </div>

            <div class="buttons flex" v-if="edit == true">
              <button
                class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
                type="submit"
                @click="cancelState"
              >
                Cancel
              </button>
              <button
                @click="updatePost"
                class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-grow ml-8">
        <div class="flex flex-col">
          <!-- Author Block -->
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
          <!-- Posted at -->
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

          <!-- Category -->
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

          <!-- Status -->
          <div class="flex flex-col">
            <h3 class="block text-sm font-medium mb-2 dark:text-white">
              Status
            </h3>

            <span
              :class="{
                'inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-blue-100 text-blue-800':
                  status === 'Publish',
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
      status: '',
      name: '',
      created_at: null,
      categoriesData: [],
    }
  },
  created() {
    this.getPosts()
    this.getCategories()
  },
  methods: {
    async getPosts() {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/posts/${this.$route.params.id}`
        )
        const posts = res.data.post
        this.title = posts.title
        this.content = posts.content
        this.category = posts.category.category_name
        this.status = posts.status
        this.name = posts.user.name
        this.created_at = posts.created_at
        console.log(res.data)
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
        const res = await axios.put(
          `http://localhost:8000/api/posts/${this.$route.params.id}`,
          {
            title: this.title,
            content: this.content,
            category_id: this.categoryEdit,
            status: this.status,
          }
        )

        // Handle the response based on your application's logic
        if (res.status === 200) {
          // Update was successful
          console.log('User updated successfully')
          window.location.reload()
        } else {
          // Update failed
          console.log('User update failed')
        }
      } catch (error) {
        // Handle any errors that occurred during the API call
        console.error(error)
      }
    },
  },
}
</script>
