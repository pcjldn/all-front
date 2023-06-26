const workRouter = [
    {
        path: '/work/todo',
        name: 'workToDo',
        component: () => import("@/views/work/todo/ToDoList.vue"),
        meta: {
            title: '工作同步事项'
        }
    },
];

export default workRouter;
