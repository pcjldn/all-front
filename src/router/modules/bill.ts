const billRouter = [
    {
        path: '/bill',
        name: 'bill',
        component: () => import("@/views/work/todo/ToDoList.vue"),
        meta: {
            title: '个人记账系统'
        }
    },
];

export default billRouter;
