import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import todolist from '../components/todolist.vue'
import chart from '@/views/chart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path:'/todolist',
    name:'todolist',
    component:todolist
  },
  {
    path:'/chart',
    name:'chart',
    component:chart
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
