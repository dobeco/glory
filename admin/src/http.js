import axios from 'axios'

import router from './router'
import {  Message } from 'element-ui'

/* let loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.8)'
    })
}
function endLoading() {
    loading.close()
} */

const http = axios.create({
    //baseURL: 'http://localhost:9000/admin/api',
    baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    
    timeout: 5000
})

// 请求拦截
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 登录用户添加请求headers
    // startLoading()
    if (localStorage.gloryToken) {
        config.headers.Authorization = 'Bearer ' + localStorage.gloryToken
    }

    return config;
}, function (error) {
    Message.error({ message: '请求超时!' });
    return Promise.reject(error);
});

// 响应拦截
http.interceptors.response.use(res => {
    // endLoading()
    return res
}, err => {
        if (err.response.data.message) {
            Message({
                type: 'error',
                message: err.response.data.message
            })

            if (err.response.status === 401) {
                 Message.error('登录信息已失效,请重新登录')
                localStorage.removeItem('gloryToken')
                router.push('/login')
            }
        }


    // endLoading();
   /*  if (err.response.status === 504 || err.response.status == 404) {
        Message.error({ message: '服务器被吃了⊙﹏⊙∥' });
    } else if (err.response.status === 401) {
        Message.error({ message: '登录信息已过期,请重新登录' });
        localStorage.removeItem('gloryToken')
        router.push('/login')
    } else {
        Message({
            type: 'error',
            message: err.response.data.message
        })
    } */



    return Promise.reject(err)
})

export default http