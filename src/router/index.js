import { createRouter, createWebHistory } from 'vue-router'
// import { useUser } from '@/libs/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthView.vue'),
    meta: {
      auth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  console.log('--- beforeEach ---')

  // $user = useUser()
  const token = localStorage.getItem('token')

  console.log('to:', to)
  console.log('from:', from)
  console.log('token:', token)

  if (to.meta.auth && to.name !== 'Auth') {
    if (!token) {
      return {
        name: 'Auth'
      }
    } else {
      return true
    }
  } 
    
  if (to.name === 'Auth' && token) {
    return {
      name: from.name
    }
  } else {
    return true
  }
})

export default router
