<script setup lang="ts">
defineProps<{
  message?: string
  isError: boolean
}>()
</script>

<template>
  <p class="mt-2 text-sm" :class="{ 'text-red-600': isError }">{{ message ?? '' }}</p>
</template>
