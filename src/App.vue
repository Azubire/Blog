<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/header/NavBar.vue'
import Footer from './components/footer/FooterComponent.vue'
</script>

<template>
  <NavBar />

  <RouterView />

  <Footer />
</template>
