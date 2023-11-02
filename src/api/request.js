import axios from "axios";
import {message} from "antd";

const success_code = '00000000'

const httpClient = axios.create({
    baseURL: '/user-admin',
    timeout: 1000
})

/**
 * 拦截响应
 */
httpClient.interceptors.response.use(resp => {
        let payload = resp.data
        const {code, data, msg} = payload;

        if (code !== success_code) {
            message.error(msg);
            return Promise.reject(new Error(msg));
        }
        return data;
    },
    error => {
        let msg
        if (error.message.indexOf('timeout') !== -1) {
            // 请求超时
            msg = '请求超时'
        } else {
            msg = '接口请求异常'
        }

        message.error(msg);
        return Promise.reject(new Error(msg));
    });

export default httpClient;