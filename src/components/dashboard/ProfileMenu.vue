<script setup lang="ts">
import { logout } from '@/api'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const showMenu = ref(false)

const store = useAuthStore()

const { user } = storeToRefs(store)

const handleLogout = async () => {
  await logout()
  store.clearUser()
  showMenu.value = false
}
</script>

<template>
  <button
    type="button"
    class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 relative"
    id="user-menu-button"
    aria-expanded="false"
    @click="showMenu = !showMenu"
  >
    <span class="sr-only">Open user menu</span>
    <img
      class="w-8 h-8 rounded-full"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
      alt="user photo"
    />
  </button>
  <!-- Dropdown menu -->
  <div
    class="z-50 my-4 w-56 absolute top-full right-0 text-base list-none bg-white rounded divide-y divide-gray-100 shadow"
    :class="{ hidden: !showMenu }"
    id="dropdown"
  >
    <div class="py-3 px-4">
      <span class="block text-sm font-semibold text-gray-900">{{ user?.userName }}</span>
      <span class="block text-sm text-gray-500 truncate">{{ user?.email }}</span>
    </div>
    <ul class="py-1 text-gray-500" aria-labelledby="dropdown">
      <li>
        <RouterLink to="/posts" class="block py-2 px-4 text-sm hover:bg-gray-100"
          >My Posts</RouterLink
        >
      </li>
      <li>
        <a href="#" @click.prevent="handleLogout" class="block py-2 px-4 text-sm hover:bg-gray-100"
          >My profile</a
        >
      </li>
    </ul>

    <ul class="py-1 text-gray-500" aria-labelledby="dropdown">
      <li>
        <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-100">Sign out</a>
      </li>
    </ul>
  </div>
</template>
