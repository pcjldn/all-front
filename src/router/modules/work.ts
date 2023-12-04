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
    {
        path: '/work/viewOrder',
        name: 'viewOrder',
        component: () => import("@/views/work/viewOrder/ViewOrder.vue"),
        meta: {
            title: '单据快捷跳转'
        }
    },
    {
        path: '/work/login',
        name: 'viewOrder',
        component: () => import("@/views/work/CwNoPwdLogin.vue"),
        meta: {
            title: '免密登录'
        }
    },
];

export default workRouter;
