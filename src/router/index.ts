import {createRouter, createWebHashHistory} from 'vue-router';
import workRouter from '@/router/modules/work.ts'
import billRouter from '@/router/modules/bill.ts'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("@/components/HelloWorld"),
        meta: {
            title: '主页'
        }
    },
    ...workRouter,
    ...billRouter
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
