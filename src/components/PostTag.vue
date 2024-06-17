<script setup lang="ts">
defineProps<{
  name: string
}>()

const colors = ['cyan', 'purple', 'fuchsia', 'pink', 'rose']

const randomColor = () => colors[Math.floor(Math.random() * colors.length)]
const color = randomColor()
</script>

<template>
  <span
    class="inline-flex items-center capitalize py-[4px] px-3 text-sm font-medium text-center rounded-lg hover:bg-sky-300 focus:ring-4 focus:outline-none focus:ring-blue-300"
    :class="`bg-${color}-200 text-${color}-500`"
  >
    {{ name }}
  </span>
</template>
