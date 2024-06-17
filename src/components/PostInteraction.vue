<script setup lang="ts">
import Like from './icons/IconLike.vue'
// import Liked from './icons/IconLiked.vue'
import Comment from './icons/IconMessage.vue'
import Share from './icons/IconShare.vue'
</script>

<template>
  <div class="flex gap-3 mb-3 p-2">
    <div class="flex items-center gap-2">0 likes</div>
    <div class="flex items-center gap-2">
      <!-- <Comment /> -->
      0 comments
    </div>
    <div class="flex items-center gap-2">
      <!-- <Share /> -->
      0 shares
    </div>
  </div>
  <div class="flex gap-3">
    <div class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2">
      <Like />
      Like
    </div>
    <div class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2">
      <Comment />
      Comment
    </div>
    <div class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2">
      <Share />
      Share
    </div>
  </div>
</template>
