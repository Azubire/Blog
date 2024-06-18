import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { boolean } from 'zod'

export interface IUser {
  userName: string
  email: string
  role: 'admin' | 'user'
  _id: string
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<IUser | null>(null)
    const isAuth = ref(false)

    function setUser(newUser: IUser | null) {
      user.value = newUser
      isAuth.value = true
    }

    function getUser(): Ref<IUser | null> {
      return user
    }

    function clearUser() {
      user.value = null
      isAuth.value = false
    }

    return { user, setUser, getUser, clearUser, isAuth }
  },
  {
    persist: true
  }
)
