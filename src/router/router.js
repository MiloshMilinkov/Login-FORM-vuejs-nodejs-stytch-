import { createRouter, createWebHistory } from "vue-router";
 const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            requiresAuth: true
        }

    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),

    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue'),

    }
 ]
 const router = createRouter({
    history: createWebHistory(),
    routes
 })

 router.beforeEach(async (to,from, next) => {
    //if to page is guarded
    if(to.matched.some(record => record.meta.requiresAuth)){

        const token = localStorage.getItem('token')

        //if token exists, we check if the token is valid and return to next
        if (token){
            return next()
        }

        //if we do now have a token go back to logi
        return next('/login')
    }
    //if to page is not guarded go to next
    next()
 })
 export default router;