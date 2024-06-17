<script setup lang="ts">
import PostItem from './PostItem.vue'
import FeaturedPostItem from './FeaturedPostItem.vue'
</script>

<template>
  <FeaturedPostItem />

  <section>
    <PostItem layout="horizontal" />
    <PostItem layout="horizontal" />
  </section>

  <section>
    <FeaturedPostItem />
  </section>
</template>
