/*接口调用工具*/
import {message} from 'antd';

import axios from 'axios';
import Qs from 'qs'
import {ADMIN_ADDRESS} from './config';
import {createHashHistory} from 'history';
//http response 封装后台返回拦截器
axios.interceptors.response.use(
    response => {
        //当返回信息为未登录或者登录失效的时候重定向为登录页面
        // if(response.data.code == 'W_100004' || response.data.message == '用户未登录或登录超时，请登录！'){
        //     router.push({
        //         path:"/",
        //         querrory:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
        //     })
        // }
        // console.log(response,response.headers.authorization,'123455.................')
        if (response.data && !response.data.success) {
            let msg = '请求失败';
            if (response.data.message) {
                msg = response.data.message
            }
            return new Promise((resolve, reject) => {
                reject(msg);
            })
        }
        return response;
    },
    error => {
        console.log(error.response, 'eoor.................');
        let history = createHashHistory();
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误';
                    break;

                case 401:
                    error.message = '未授权，请登录';
                    history.push('/login/');
                    break;

                case 403:
                    error.message = '拒绝访问';
                    history.push('/403');
                    break;

                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`;
                    break;

                case 408:
                    error.message = '请求超时';
                    history.push('/408');
                    break;

                case 500:
                    error.message = '服务器内部错误';
                    history.push('/500');
                    break;

                case 501:
                    error.message = '服务未实现';
                    break;

                case 502:
                    error.message = '网关错误';
                    break;

                case 503:
                    error.message = '服务不可用';
                    break;

                case 504:
                    error.message = '网关超时';
                    break;

                case 505:
                    error.message = 'HTTP版本不受支持';
                    break;

                default:
            }
        }

        return new Promise((resolve, reject) => {
            reject(error);
        })
    }
);
const root = ADMIN_ADDRESS;

let messageList = new Set();

function responseFail(error) {
    console.log(JSON.stringify(error));
    if (error) {
        if (error.request && error.request.readyState === 4 && error.request.status === 0) {
            //我在这里重新请求
            let history = createHashHistory();
            error.message = '请求超时';
            // console.log(messageList)
            if (!messageList.has(error.message)) {
                messageList.add(error.message);
                message.error(error.message, 3, () => removeMessage(error.message));
            }
            history.push('/408');
        } else {
            let msg = error.message ? error.message : error;
            // console.log(messageList)
            if (!messageList.has(msg)) {
                messageList.add(msg);
                message.error(msg, 3, () => removeMessage(msg));
            }
        }
    }
    return new Promise((resolve, reject) => {
        reject(error);
    })
}

function removeMessage(msg) {
    if (messageList.has(msg)) {
        messageList.delete(msg);
    }
}

function getConfig({method, upFile = false, defineRootAddress = false}) {
    const token = localStorage.getItem('authrization')?null:null;
    const header = token != null ? token : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MzczNjEwMjYsInN1YiI6ImFkbWluIiwiZXhwIjoxNTM4MDUyMjI2fQ.tQ5m3CmhowKV_HelkO7Tnq7fvMNHtTvTbNZahBToIzo';
    const contentType = upFile ? "multipart/form-data" : 'application/x-www-form-urlencoded';
    let head = {authorization: header, 'Content-Type': contentType};
    if (method === 'del') {
        head = {authorization: header};
    }
    // console.log(header);

    return {
        headers: head,
        // timeout:10000,
        baseURL: !defineRootAddress ? root : null,
        transformRequest: ((method === 'post' || method === 'put') && upFile === false) ? (obj) => {
            if (typeof(obj) === 'string') return obj;
            obj = Qs.stringify(obj);
            return obj;
        } : null,
    };
}

// 返回调用接口
const api = {
    get: ({url, params, defineRootAddress}) => {
        return axios.get(url, Object.assign({}, getConfig({
            method: 'get',
            defineRootAddress
        }), {params: params})).catch((error) => responseFail(error));
    },
    post: ({url, params, defineRootAddress}, upFile = false) => {
        // console.log(params);
        return axios.post(url, params, getConfig({
            method: 'post',
            upFile,
            defineRootAddress
        })).catch((error) => responseFail(error));
    },
    put: ({url, params, defineRootAddress}, upFile = false) => {
        return axios.put(url, params, getConfig({
            method: 'put',
            upFile,
            defineRootAddress
        })).catch((error) => responseFail(error));
    },
    del: ({url, params, defineRootAddress}) => {
        // console.log(params)
        return axios.delete(url, Object.assign({}, getConfig({
            method: 'del',
            defineRootAddress
        }), {
            data: typeof params === 'number' ? params : null,
            params: typeof params !== 'number' ? params : null
        })).catch((error) => responseFail(error));
    },
    all: (arr) => {
        return axios.all(arr).then(axios.spread((...res) => res)).catch((error) => responseFail(error));
    }
};
export default api;
