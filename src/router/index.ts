/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import Module from "@/pages/Module.vue";

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
// import { setupLayouts } from 'virtual:generated-layouts'
// import { routes } from 'vue-router/auto-routes'

const routes = [
  {
    path: "/main",
    meta: {
      requiresAuth: true
    },
    redirect: "/main",
    component: () => import("@/layouts/FullLayout.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/pages/dashboard/Index.vue")
      },
      {
        path: "/password",
        component: Module,
        children: [
          {
            path: "",
            name: "password",
            component: () => import("@/pages/password/Index.vue")
          }
        ]
      },
    ]
  },
  {
    path: "/auth",
    meta: {
      requiresAuth: true
    },
    redirect: "/auth",
    component: () => import("@/layouts/about/AboutLayout.vue"),
    children: [
      {
        path: "/auth/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/pages/auth/Index.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes //setupLayouts(routes),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
// router.onError((err, to) => {
//   if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
//     if (!localStorage.getItem('vuetify:dynamic-reload')) {
//       console.log('Reloading page to fix dynamic import error')
//       localStorage.setItem('vuetify:dynamic-reload', 'true')
//       location.assign(to.fullPath)
//     } else {
//       console.error('Dynamic import error, reloading page did not fix it', err)
//     }
//   } else {
//     console.error(err)
//   }
// })

// router.isReady().then(() => {
//   localStorage.removeItem('vuetify:dynamic-reload')
// })

export default router
