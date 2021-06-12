import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dahsboard',
    component: () => import('@/views/Dashboard/Dashboard.vue'),
  },
  {
    path: '/elections',
    name: 'elections',
    component: () => import('@/views/Elections/Elections.vue'),
  },
  {
    path: '/elections/:election/cast-vote',
    name: 'cast-vote',
    component: () => import('@/views/Election/CastVote.vue'),
  },
  {
    path: '/elections/:election',
    name: 'election',
    component: () => import('@/views/Election/Election.vue'),
  },
  {
    path: '/elections/:election/results',
    name: 'results',
    component: () => import('@/views/Election/Results.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue'),
  },
  {
    path: '*',
    name: 'not-found',
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  routes,
});

export default router;
