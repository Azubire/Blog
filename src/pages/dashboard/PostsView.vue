<script setup lang="ts">
import { getUSerPosts, type IPost } from '@/api'
import PostPagination from '@/components/PostPagination.vue'
import CreatePost from '@/components/dashboard/CreatePost.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import { onMounted, ref } from 'vue'

const showCreatePost = ref(false)

const posts = ref<IPost[]>([])
const loading = ref(false)

onMounted(async () => {
  window.scrollTo(0, 0)
  loading.value = true
  const data = await getUSerPosts()
  posts.value = data.posts
  loading.value = false
})
</script>

<template>
  <CreatePost @setshowCreatePost="showCreatePost = false" :showCreatePost="showCreatePost" />
  <section class="bg-gray-50 p-3 sm:p-5">
    <div class="bg-white relative sm:rounded-lg overflow-hidden">
      <div
        class="flex flex-col md:flex-row items-center justify-end space-y-3 md:space-y-0 md:space-x-4 p-4"
      >
        <div
          class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
        >
          <button
            type="button"
            class="flex items-center justify-center text-white bg-cyan-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
            @click="showCreatePost = true"
          >
            <svg
              class="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            Add product
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 mx-5">
            <tr>
              <th scope="col" class="px-4 py-3">Title</th>
              <th scope="col" class="px-4 py-3">Category</th>
              <th scope="col" class="px-4 py-3">Author</th>
              <th scope="col" class="px-4 py-3">Created At</th>
              <th scope="col" class="px-4 py-3">Status</th>
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b" v-for="item in posts" :key="item._id">
              <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                {{ item.title }}
              </th>
              <td class="px-4 py-3">{{ item?.category?.name }}</td>
              <td class="px-4 py-3">{{ item?.author?.userName }}</td>
              <td class="px-4 py-3">{{ new Date(item.createdAt).toLocaleDateString() }}</td>
              <td class="px-4 py-3">Published</td>
              <td class="px-4 py-3 flex items-center justify-end gap-2">
                <span
                  id="badge-dismiss-default"
                  class="inline-flex items-center text-sm font-medium text-blue-800 bg-blue-100 rounded"
                >
                  <button
                    type="button"
                    class="inline-flex items-center p-1 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900"
                    data-dismiss-target="#badge-dismiss-default"
                    aria-label="Remove"
                  >
                    <IconEdit />

                    <span class="sr-only">Edit post</span>
                  </button>
                </span>
                <span
                  id="badge-dismiss-default"
                  class="inline-flex items-center text-sm font-medium text-red-800 bg-red-100 rounded"
                >
                  <button
                    type="button"
                    class="inline-flex items-center p-1 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900"
                    data-dismiss-target="#badge-dismiss-default"
                    aria-label="Remove"
                  >
                    <IconDelete />

                    <span class="sr-only">Edit post</span>
                  </button>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PostPagination />
    </div>
  </section>
</template>
