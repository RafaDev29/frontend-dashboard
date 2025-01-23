import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            meta: {
                title: "Home",
                requiresAuth: true
            },
            path: "/",
            name: "home",
            component: () => import("@/layouts/MasterLayout.vue"),
            children: [
                {
                    name: "dashboard",
                    path: "dashboard",
                    component: () => import("@/views/DashboardView.vue"),
                },

                {
                    name: "quality",
                    path: "quality",
                    component: () => import("@/views/QualityView.vue"),
                },


            ]
        },
        {
            meta: {
                title: "Login"
            },
            path: "/login",
            name: "login",
            component: () => import("@/views/LoginView.vue")
        },
    ]
})
// Navigation Guard
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !store.state.isAuthenticated) {
        // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir a la página de inicio de sesión
        next({ name: 'login' });
    } else if (to.name === 'login' && store.state.isAuthenticated) {
        next({ name: 'dashboard' });
    } else if (to.path === '/' && store.state.isAuthenticated) {
        next({ name: 'dashboard' });
    } else {
        next();
    }

});
export default router;


