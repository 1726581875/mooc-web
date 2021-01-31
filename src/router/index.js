import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home'),
    children: [
      {
        path: '/course',
        component: () => import('../views/courses/Course'),
        meta: {title: '所有课程'}
      },
      {
        path: '/detail',
        component: () => import('../views/courses/CourseDetail'),
        meta: {title: '课程详情'}
      }
      ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
