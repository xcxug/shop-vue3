import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/home/main/index.vue"), // 路由懒加载解决首屏加载慢，性能优化
    meta: { keepAlive: false },
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/pages/home/index/index.vue"),
        meta: { keepAlive: true, title: "商城" },
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("@/pages/home/cart/index.vue"),
        meta: { keepAlive: false, title: "购物车" },
      },
      {
        path: "my",
        name: "my",
        component: () => import("@/pages/user/ucenter/index.vue"),
        meta: { keepAlive: false, title: "我的" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // 解决白屏
  scrollBehavior: (to, from, position) => {
    if (position) {
      return position;
    } else {
      return { top: 0 };
    }
  },
  routes,
});

export default router;
