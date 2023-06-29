import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from './router/index.ts'
// element-plus（element-ui）
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
// 图标工具
import * as echarts from 'echarts';
// 请求工具类
import request from "./utils/request.ts";
// jquery
import $ from 'jquery'
//引入图标库
import "@/assets/iconfont/iconfont.css"
// 修改系统滚动条
import "@/assets/css/scroll.css"




const app = createApp(App);
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$http = request;
app.config.globalProperties.$ = $;
app.config.productionTip = false
app.config.silent = true;
app.config.devtools = true;

app.use(router)
    .use(ElementPlus)
    .mount('#app')



