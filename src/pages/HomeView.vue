<script setup lang="ts">
import FeaturedPost from '../components/FeaturedPost.vue'
import PostItem from '@/components/PostItem.vue'
import PostPagination from '@/components/PostPagination.vue'

const post = [1, 2, 3, 4, 5, 6]
</script>

<template>
  <main class="mx-4 lg:max-w-6xl lg:mx-auto my-10 lg:my-20">
    <div class="my-8">
      <h2 class="text-xl font-semibold">Recent Posts</h2>
    </div>
    <FeaturedPost />

    <section>
      <div class="my-8">
        <h2 class="text-xl font-semibold">All Posts</h2>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
        <PostItem v-for="(item, index) in post" :key="index" layout="vertical" />

        <PostPagination />
      </div>
    </section>
  </main>
</template>
