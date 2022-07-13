import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'

const Home = () => import('@/views/Home')
const Find = () => import('@/views/Find')
const Consult = () => import('@/views/Consult')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
const Collect = () => import('@/views/Collect')
const AddRoom = () => import('@/views/AddRoom')
const Rent = () => import('@/views/Rent')
const Search = () => import('@/views/Search')
const City = () => import('@/views/City')
const Map = () => import('@/views/Map')
const Detail = () => import('@/views/Detail')
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
  },
  { path: '/login', component: Login },
  { path: '/collect', component: Collect },
  { path: '/rent', component: Rent },
  { path: '/rent/add', component: AddRoom },
  { path: '/rent/search', component: Search },
  { path: '/city', component: City },
  { path: '/map', component: Map },
  { path: 'detail', component: Detail }

]

const router = new VueRouter({
  routes
})

export default router
