import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import AboutView from '@/pages/AboutView.vue'
import PostDetails from '@/pages/PostDetails.vue'
import Dashboard from '@/pages/dashboard/DashboardView.vue'
import Posts from '@/pages/dashboard/PostsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostDetails
    },
    {
      path: '/about',
      name: 'about',

      component: AboutView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({ name: 'home' })
    }
  }
  next()
})

export default router
