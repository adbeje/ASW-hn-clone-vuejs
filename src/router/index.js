import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import New from '../views/New.vue';
import Ask from '../views/Ask.vue';
import Single from '../views/Single.vue';
import User from '../views/User.vue';
import UserContributions from '../views/UserContributions.vue';
import UserComments from '../views/UserComments.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/contribution/:id',
    name: 'Single',
    component: Single
  },
  {
    path: "/newest",
    name: "New",
    component: New
  },
  {
    path: "/asks",
    name: "Ask",
    component: Ask
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User
  },

  {
    path: '/contribucions/users/:id',
    name: 'UserContributions',
    component: UserContributions
  },

  {
    path: '/comments/users/:id',
    name: 'UserComments',
    component: UserComments
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
