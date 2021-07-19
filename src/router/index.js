import Vue from 'vue';
import VueRouter from 'vue-router';
import { isAuthenticated } from "@/helpers/auth";
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dahsboard',
    component: () => import('@/views/Dashboard/Dashboard.vue'),
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: '/elections',
    name: 'elections',
    component: () => import('@/views/Elections/Elections.vue'),
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: '/elections/:election/cast-vote',
    name: 'cast-vote',
    component: () => import('@/views/Election/CastVote.vue'),
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: '/elections/:election',
    name: 'election',
    component: () => import('@/views/Election/Election.vue'),
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: '/elections/:election/results',
    name: 'results',
    component: () => import('@/views/Election/Results.vue'),
    meta: {
      page: true,
    },
  },
  {
    path: '/consensus-group',
    name: 'group',
    component: () => import('@/views/Groups/Groups.vue'),
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue'),
  },
  {
    path: '/explorer',
    name: 'explorer',
    component: () => import('@/views/Explorer/Explorer'),
    meta: {
      page: true,
    },
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


router.beforeEach((to, from, next) => {
  const currentUser = isAuthenticated();
  const requiresLogin = to.matched.some((record) => record.meta.requiresLogin);
  const page = to.matched.some((record) => record.meta.page);

  if (page) return next();
  if (requiresLogin && !currentUser) return next('login');
  if (!requiresLogin && currentUser) return next({ path: '/dashboard/identity' });

  return next();
});

export default router;
