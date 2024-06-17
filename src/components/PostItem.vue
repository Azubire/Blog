<script setup lang="ts">
import PostInteraction from './PostInteraction.vue'
import PostTag from './PostTag.vue'

defineProps<{
  layout: 'vertical' | 'horizontal'
}>()

const tags = ['Ai', 'Machine Learning', 'Data Science', 'Web Development', 'DevOps']
</script>

<template>
  <article
    class="bg-white rounded-lg my-5"
    :class="{ 'grid grid-cols-1 sm:grid-cols-2 gap-5': layout === 'horizontal' }"
  >
    <img
      class="w-full object-cover"
      :class="{ 'h-full': layout === 'horizontal' }"
      src="@/assets/cover.png"
      alt="Jese Leos avatar"
    />
    <div>
      <div class="flex justify-between items-center text-gray-500">
        <span
          class="text-cyan-800 font-medium inline-flex items-center my-4"
          :class="{ 'mt-0': layout === 'horizontal' }"
        >
          Sun, 12 Nov 2022
        </span>
      </div>
      <h2
        class="flex justify-between items-center mb-2 text-2xl font-bold tracking-tight text-gray-900"
      >
        <a href="#">How to quickly deploy a static website</a>
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
      <p class="mb-5 font-light text-gray-500">
        Static websites are now used to bootstrap lots of websites and are becoming the basis for a
        variety of tools that even influence both web designers and developers influence both web
        designers and developers.
      </p>
      <div class="flex gap-3 flex-wrap">
        <!-- tags -->

        <PostTag v-for="tag in tags" :key="tag" :name="tag" />
      </div>
      <div class="border-b my-3"></div>

      <PostInteraction />
    </div>
  </article>
</template>
