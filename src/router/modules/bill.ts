const billRouter = [
    {
        path: '/bill',
        name: 'bill',
        component: () => import("@/views/bill/index"),
        meta: {
            title: '个人记账系统'
        },
        children: [
            {
                path: '/bill/index',
                name: 'bill',
                component: () => import("@/views/bill/bill/index"),
                meta: {
                    title: '记账 - 记账系统'
                },
            },
            {
                path: '/bill/billType',
                name: 'billType',
                component: () => import("@/views/bill/bill/typeSetting/billTypeList"),
                meta: {
                    title: '账单类型 - 记账系统'
                },
            },
            {
                path: '/bill/price',
                name: 'price',
                component: () => import("@/views/bill/price/index"),
                meta: {
                    title: '菜价 - 记账系统'
                },
            },
            {
                path: '/bill/saveMoney',
                name: 'saveMoney',
                component: () => import("@/views/bill/saveMoney/index"),
                meta: {
                    title: '存钱计划 - 记账系统'
                },
            },
            {
                path: '/bill/statistics',
                name: 'statistics',
                component: () => import("@/views/bill/statistics/index"),
                meta: {
                    title: '统计 - 记账系统'
                },
            }
        ]
    },
];

export default billRouter;
