<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import PostInteraction from './PostInteraction.vue'
import { type IPost } from '@/api'
import { onMounted, ref } from 'vue'
import Quill from 'quill'
import PostTag from './PostTag.vue'

const props = defineProps<{
  post: IPost
  layout: 'vertical' | 'horizontal'
}>()

// const tags = ['Ai', 'Machine Learning', 'Data Science', 'Web Development', 'DevOps']
const editor = ref<HTMLElement | string>('')

onMounted(() => {
  const quill = new Quill(editor.value, {
    readOnly: true
  })
  if (props?.post?.content) {
    quill.setContents(JSON.parse(props?.post?.content))
  }
})
</script>

<template>
  <article
    class="bg-white rounded-lg my-5"
    :class="{ 'grid grid-cols-1 sm:grid-cols-2 gap-5': layout === 'horizontal' }"
  >
    <img
      class="w-full object-cover h-72"
      :class="{ 'h-full': layout === 'horizontal' }"
      v-if="post?.media?.url"
      :src="post?.media?.url"
      alt="Jese Leos avatar"
    />
    <img
      class="w-full object-cover"
      :class="{ 'h-full': layout === 'horizontal' }"
      v-else
      src="@/assets/cover.png"
      alt="Jese Leos avatar"
    />
    <div>
      <div class="flex justify-between items-center text-gray-500">
        <span
          class="text-cyan-800 font-medium inline-flex items-center my-4"
          :class="{ 'mt-0': layout === 'horizontal' }"
        >
          {{ new Date(post?.createdAt).toDateString() }}
        </span>
      </div>
      <h2
        class="flex justify-between items-center mb-2 text-2xl font-bold tracking-tight text-gray-900"
      >
        <RouterLink :to="`/post/${post._id}`">{{ post?.title }}</RouterLink>
        <svg
          class="ml-2 w-4 h-4 -rotate-45"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </h2>

      <div id="editor" ref="editor"></div>

      <div class="flex gap-3 flex-wrap">
        <!-- tags -->

        <PostTag v-for="tag in post?.tags" :key="tag" :name="tag" />
      </div>
      <div class="border-b my-3"></div>

      <PostInteraction :post="post" />
    </div>
  </article>
</template>
