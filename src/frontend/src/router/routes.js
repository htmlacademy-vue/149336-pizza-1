import { auth, isLoggedIn } from "@/middlewares";

export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Index.vue"),
    meta: { layout: () => import(`@/layouts/AppLayoutMain.vue`) },
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
        meta: {
          layout: () => import(`@/layouts/AppLayoutPopup.vue`),
          middlewares: [isLoggedIn],
        },
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { layout: () => import(`@/layouts/AppLayoutMain.vue`) },
    children: [
      {
        path: "/popup",
        name: "Popup",
        component: () => import("../views/Popup.vue"),
        meta: { layout: () => import(`@/layouts/AppLayoutPopup.vue`) },
      },
    ],
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: () => import(`@/layouts/AppLayoutUser.vue`),
      middlewares: [auth],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: () => import(`@/layouts/AppLayoutUser.vue`),
      middlewares: [auth],
    },
  },
];
