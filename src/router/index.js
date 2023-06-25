import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("@/components/HelloWorld"),
        meta: {
            title: '主页'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import("@/components/HelloWorld.vue"),
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '未知页面';
    next();
})

export default router;
