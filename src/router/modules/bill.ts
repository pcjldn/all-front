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
                path: 'index',
                name: 'bill',
                component: () => import("@/views/bill/bill/index"),
                meta: {
                    title: '记账 - 记账系统'
                },
            },
            {
                path: 'billType',
                name: 'billType',
                component: () => import("@/views/bill/bill/typeSetting/billTypeList"),
                meta: {
                    title: '账单类型 - 记账系统'
                },
            },
            {
                path: 'price',
                name: 'price',
                component: () => import("@/views/bill/price/index"),
                meta: {
                    title: '菜价 - 记账系统'
                },
            },
            {
                path: 'saveMoney',
                name: 'saveMoney',
                component: () => import("@/views/bill/sysDic/index"),
                meta: {
                    title: '存钱计划 - 记账系统'
                },
            },
            {
                path: 'statistics',
                name: 'statistics',
                component: () => import("@/views/bill/statistics/index"),
                meta: {
                    title: '类型设置 - 记账系统'
                },
                // children:[
                //     {
                //         path: '/bill/statistics/week',
                //         name: 'week',
                //         component: () => import("@/views/bill/statistics/components/week.vue"),
                //         meta: {
                //             title: '统计-周'
                //         },
                //     },
                //     {
                //         path: '/bill/statistics/day',
                //         name: 'week',
                //         component: () => import("@/views/bill/statistics/components/day"),
                //         meta: {
                //             title: '统计-日'
                //         },
                //     },
                //     {
                //         path: '/bill/statistics/month',
                //         name: 'week',
                //         component: () => import("@/views/bill/statistics/components/month"),
                //         meta: {
                //             title: '统计-月'
                //         },
                //     },
                //     {
                //         path: '/bill/statistics/year',
                //         name: 'week',
                //         component: () => import("@/views/bill/statistics/components/year"),
                //         meta: {
                //             title: '统计-年'
                //         },
                //     },
                // ]
            }
        ]
    },
];

export default billRouter;
