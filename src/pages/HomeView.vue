<script setup lang="ts">
import { getPosts, type IPost } from '@/api'
import FeaturedPost from '../components/FeaturedPost.vue'
import PostItem from '@/components/PostItem.vue'
import PostPagination from '@/components/PostPagination.vue'
import { onMounted, ref } from 'vue'
import IconLoading from '@/components/icons/IconLoading.vue'

const posts = ref<IPost[]>([])
const loading = ref(false)

onMounted(async () => {
  window.scrollTo(0, 0)
  loading.value = true
  const data = await getPosts()
  posts.value = data.posts
  loading.value = false
})
</script>

<template>
  <main class="mx-4 lg:max-w-6xl lg:mx-auto my-10 lg:my-20">
    <div class="my-8">
      <h2 class="text-xl font-semibold">Recent Posts</h2>
    </div>
    <IconLoading v-if="loading" />
    <FeaturedPost v-if="posts?.length > 0" :posts="posts?.slice(0, 4)" />

    <section>
      <div class="my-8">
        <h2 class="text-xl font-semibold">All Posts</h2>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
        <PostItem v-for="item in posts" :post="item" :key="item._id" layout="vertical" />

        <PostPagination />
      </div>
    </section>
  </main>
</template>
