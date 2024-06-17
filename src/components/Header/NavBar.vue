<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import IconOpen from '../icons/IconOpen.vue'
import IconClose from '../icons/IconClose.vue'

// nav items
const navItems = [
  {
    name: 'Home',
    path: '/'
  },

  {
    name: 'Contact',
    path: '/contact'
  },
  {
    name: 'Newsletter',
    path: '/newsletter'
  },
  {
    name: 'Login',
    path: '/login'
  }
]

// toggle mobile nav
const showMobileNav = ref(false)
</script>
<template>
  <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-3 relative shadow-sm border-b">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="" class="flex items-center">
          <img src="@/assets/logo_new.svg" class="mr-3 h-6 sm:h-9" alt="WriteTech Logo" />
        </a>
        <div class="flex items-center lg:order-2">
          <div
            class="bg-white justify-between items-center w-full lg:flex lg:w-auto"
            :class="{
              'absolute   top-full border shadow-sm left-0': showMobileNav,
              hidden: !showMobileNav
            }"
          >
            <ul
              v-for="item in navItems"
              :key="item.name"
              class="flex flex-col mt-4 text-base font-medium lg:flex-row lg:space-x-8 lg:mt-0"
            >
              <li v-if="item.path == '/newsletter'">
                <RouterLink
                  to="#"
                  @click.prevent
                  class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  aria-current="page"
                  >{{ item.name }}</RouterLink
                >
              </li>
              <li v-else>
                <RouterLink
                  :to="item.path"
                  class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  aria-current="page"
                  >{{ item.name }}</RouterLink
                >
              </li>
            </ul>
          </div>

          <RouterLink
            to="#"
            class="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >Create an account</RouterLink
          >
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
            @click="showMobileNav = !showMobileNav"
          >
            <span class="sr-only">Open main menu</span>
            <IconOpen v-if="!showMobileNav" />
            <IconClose v-else />
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
