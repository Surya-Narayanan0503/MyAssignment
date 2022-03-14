import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from '../pages/Home.vue';
//import Messages from '../pages/Messages.vue';
import Generic from '../pages/Generic.vue';
import Login from '../pages/login.vue';
import session from "../models/session";
import AssignedTasks from "../pages/AssignedTasks.vue";
import AllTasks from "../pages/AllTasks.vue"

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/messages', component: () => import('../pages/Wall.vue') },
  { path: '/signup', component: Generic, props: { title: 'Signup Page!' } },
  { path: '/about', component: Generic, props: { title: 'About Page!' } },
  { path: '/contact', component: Generic, props: { title: 'Contact Page!' } },
  { path: '/assignedtasks', component: AssignedTasks },
  { path: '/viewAllTasks', component: AllTasks }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
  linkActiveClass: 'is-active',
})
//
router.beforeEach((to, from) => {
    if (['/messages', '/wall', '/assignedtasks'].includes(to.path)) {
        if (!session.user) {
            return '/login';
        }
    }
})

export default router;
