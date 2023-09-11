const workRouter = [
    {
        path: '/work/todo',
        name: 'workToDo',
        component: () => import("@/views/work/todo/ToDoList.vue"),
        meta: {
            title: '工作同步事项'
        }
    },
    {
        path: '/work/file',
        name: 'workToDo',
        component: () => import("@/views/work/file/FileUpdate.vue"),
        meta: {
            title: '文件上传'
        }
    },
];

export default workRouter;
