<script setup lang="ts">
import PostItem from './PostItem.vue'
import FeaturedPostItem from './FeaturedPostItem.vue'
import type { IPost } from '@/api'
import { watch } from 'vue'

defineProps<{
  posts: IPost[]
}>()
</script>

<template>
  <FeaturedPostItem :post="posts[0]" />

  <section>
    <PostItem layout="horizontal" :post="posts[1]" />
    <PostItem layout="horizontal" :post="posts[2]" />
  </section>

  <section>
    <FeaturedPostItem :post="posts[3]" />
  </section>
</template>
