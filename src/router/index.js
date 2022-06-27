import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Find = () => import('@/views/Find')
const Consult = () => import('@/views/Consult')
const My = () => import('@/views/My')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      { path: 'home', component: Home },
      { path: 'find', component: Find },
      { path: 'consult', component: Consult },
      { path: 'my', component: My }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
