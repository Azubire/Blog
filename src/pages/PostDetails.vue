<script setup lang="ts">
import FeaturedPostItem from '@/components/FeaturedPostItem.vue'
import CommentComponent from '@/components/CommentComponent.vue'
import { onMounted, ref } from 'vue'
import { getPost, getPostComments, type IComment, type IPost } from '@/api'
import { useRoute } from 'vue-router'
import IconLoading from '@/components/icons/IconLoading.vue'

const post = ref<IPost>()
const postComments = ref<IComment[]>()
const loading = ref(false)
const commentsLoading = ref(false)

const route = useRoute()

onMounted(async () => {
  window.scrollTo(0, 0)
  loading.value = true

  const data = await getPost(route.params.id as string)
  post.value = data.post
  loading.value = false
})

onMounted(async () => {
  commentsLoading.value = true

  const data = await getPostComments(route.params.id as string)
  postComments.value = data.post
  commentsLoading.value = false
})
</script>

<template>
  <div class="mx-4 lg:max-w-6xl lg:mx-auto my-10 lg:my-20">
    <IconLoading v-if="loading" />
    <FeaturedPostItem v-if="post?._id" :post="post" />
    <CommentComponent :showComments="true" v-if="postComments" :comments="postComments" />
  </div>
</template>
