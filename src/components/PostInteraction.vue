<script setup lang="ts">
import router from '@/router'
import Like from './icons/IconLike.vue'
// import Liked from './icons/IconLiked.vue'
import Comment from './icons/IconMessage.vue'
import Share from './icons/IconShare.vue'
import CommentComponent from './CommentComponent.vue'
import { ref } from 'vue'
import { likePost, sharePost, type IComment, type IPost } from '@/api'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'

defineProps<{
  post: IPost
}>()

const showComment = ref(false)

const route = useRoute()
const handleCommentClick = () => {
  showComment.value = !showComment.value
}

const likeComment = () => async () => {
  try {
    await likePost(route.params.id as string)
    toast.success('liked')
  } catch (error) {
    console.log('err')
  }
}
const shareComment = () => async () => {
  try {
    await sharePost(route.params.id as string)
    toast.success('shared')
  } catch (error) {
    console.log('err')
  }
}
</script>

<template>
  <div class="flex gap-3 mb-3 p-2">
    <div class="flex items-center gap-2">{{ post?.likes.length }} likes</div>
    <div class="flex items-center gap-2">
      <!-- <Comment /> -->
      {{ post?.comments?.length }} comments
    </div>
    <div class="flex items-center gap-2">
      <!-- <Share /> -->
      {{ post?.shares }} shares
    </div>
  </div>
  <div class="flex gap-3">
    <div
      class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2"
      @click="likeComment()"
    >
      <Like />
      Like
    </div>
    <div
      class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2"
      @click="handleCommentClick"
    >
      <Comment />
      Comment
    </div>
    <div
      class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2"
      @click="shareComment()"
    >
      <Share />
      Share
    </div>
  </div>
  <!-- <CommentComponent :showComments="true" /> -->
</template>
