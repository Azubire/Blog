<script setup lang="ts">
defineProps<{
  label: string
  for: string
  isError: boolean
}>()
</script>

<template>
  <label for="for" class="block mb-2 text-sm font-medium" :class="{ isError: 'text-red-700 ' }">{{
    label
  }}</label>
</template>
