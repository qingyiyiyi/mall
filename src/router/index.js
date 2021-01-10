import vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('../views/home/Home.vue')
const Sort = () => import('../views/sort/Sort.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Mine = () => import('../views/mine/Mine.vue')

//1、安装插件
vue.use(VueRouter)

//2、创建router
 const routes = [
  {
    path: "",
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/sort',
    component: Sort
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/mine',
    component: Mine
  }
 ]

const router = new VueRouter({
  routes,
  mode: 'history'
})


//3、导出router
export default router
