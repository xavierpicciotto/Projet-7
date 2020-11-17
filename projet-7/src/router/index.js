import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/Register',
    name: 'Register.vue',
    component: () => import(/*webpackChunkName: "register"*/'../views/Register.vue')
  },
  {
    path: '/Profile',
    name: 'Profile.vue',
    component: () => import(/*webpackChunkName: "profile"*/'../views/Profile.vue')
  },
  {
    path: '/about',
    name: 'About',
    //Lazy-loaded.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/BoardAdmin.vue')
  },{
    path: '/mod',
    name: 'moderator',
    component: () => import('../views/BoardModerator.vue')
  },{
    path: '/user',
    name: 'user',
    component: () => import('../views/BoardUser.vue')
  },
]


const router = new VueRouter({
  routes
})

export default router
