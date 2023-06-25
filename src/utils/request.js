import axios from "axios";

const request = axios.create({
    // 设置默认的请求头
    method: "post",
    // 设置超时时间
    timeout: 10000,
})


// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 可在发送请求之前进行处理，例如添加请求头等
        return config;
    },
    (error) => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        // 可在接收到响应数据之前进行处理
        return response.data;
    },
    (error) => {
        // 处理响应错误
        return Promise.reject(error);
    }
);

export default request
