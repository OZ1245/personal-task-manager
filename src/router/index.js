import { createRouter, createWebHistory } from 'vue-router'
// import { useUser } from '@/libs/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      auth: true,
      layout: 'Empty'
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/AuthView.vue'),
    meta: {
      auth: false
    }
  },
  {
    path: '/projects/create',
    name: 'CreateProject',
    component: () => import('@/components/projects/CreateProject.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/projects/edit/:projectId',
    name: 'EditProject',
    component: () => import('@/components/projects/EditProject.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/projects/:projectId',
    name: 'ProjectWorkspace',
    component: () => import('@/components/projects/ProjectWorkspace.vue'),
    meta: {
      auth: true,
      layout: 'Workspace'
    },
    children: [
      {
        path: 'tasks/create',
        name: 'CreateTask',
        component: () => import('@/components/tasks/CreateTask.vue'),

        // tasks/edit
        // tasks/:date
        // tasks/:date/:id
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')

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
