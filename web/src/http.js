import axios from 'axios'

import router from './router'
//import { Message } from 'element-ui'

const http = axios.create({
    // baseURL: 'http://localhost:9000/web/api',
    baseURL: process.env.VUE_APP_API_URL || '/web/api',
    timeout: 5000
})

// 请求拦截
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 登录用户添加请求headers
    // startLoading()
    // if (localStorage.gloryToken) {
    //     config.headers.Authorization = 'Bearer ' + localStorage.gloryToken
    // }

    return config;
}, function (error) {
   // Message.error({ message: '请求超时!' });
    return Promise.reject(error);
});

// 响应拦截
http.interceptors.response.use(res => {
    // endLoading()
    return res
}, err => {
    // if (err.response.data.message) {
    //     Message({
    //         type: 'error',
    //         message: err.response.data.message
    //     })

    //     if (err.response.status === 401) {
    //         Message.error('登录信息已失效,请重新登录')
    //         localStorage.removeItem('gloryToken')
    //         router.push('/login')
    //     }
    // }

    return Promise.reject(err)
})

export default http