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
              class="opacity-70 pointer-events-none title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
              spellcheck="false"
              placeholder="Title"
              type="text"
            />
            <textarea
              v-model="content"
              maxlength="300"
              class="opacity-70 pointer-events-none description mb-4 bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
              spellcheck="false"
              placeholder="Describe everything about this post here"
              @input="updateCount"
            ></textarea>

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
            <div v-if="status === 'Draft'" class="buttons flex">
              <button
                class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500"
                type="submit"
              >
                Publish
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
  data() {
    return {
      count: 0,
      title: '',
      content: '',
      category: '',
      status: '',
      name: '',
      created_at: null,
    }
  },
  created() {
    this.getPosts()
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

    updateCount(event) {
      this.count = event.target.value.length
    },
  },
}
</script>
