<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/Header/NavBar.vue'
import Footer from './components/Footer/FooterComponent.vue'
</script>

<template>
  <NavBar />

  <RouterView />

  <Footer />
</template>
