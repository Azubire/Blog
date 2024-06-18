import type { IPost } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<IPost[]>([])

  function setPosts(newPosts: IPost[]) {
    console.log('set', newPosts)
    posts.value = newPosts
  }

  return { posts, setPosts }
})
