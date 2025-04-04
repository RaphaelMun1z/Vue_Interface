import { createRouter, createWebHistory } from 'vue-router'

// Pages
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SearchByTermView from '@/components/OperadorasComponents/Tables/SearchByTermView/SearchByTermView.vue'
import SearchByAnsRegisterView from '@/components/OperadorasComponents/Tables/SearchByAnsRegisterView/SearchByAnsRegisterView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            redirect: '/search-by-term',
            children: [
                {
                    path: 'search-by-term',
                    component: SearchByTermView,
                },
                {
                    path: 'search-by-register-ans',
                    component: SearchByAnsRegisterView,
                }
            ]
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView
        },
    ],
})

export default router
