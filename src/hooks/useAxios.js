import useUserStore from "../store/store.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {message} from "antd";
import repository from "../utils/repository.js";
import {USER_INFO_KEY} from "../const/common.js";

let client = axios.create({
    baseURL: '/user-admin',
    timeout: 3000
})

/**
 *
 * @param {Object} request
 * @param {string} request.url
 * @param {string} request.method
 * @returns {{payload: Object, loading: boolean, setLoading: function, setPayload: function}}
 */
function useAxios(request) {
    const hasAuth = useUserStore(t => t.hasAuth);
    const updateHasAuth = useUserStore(t => t.updateAuthState);
    const token = useUserStore(t => t.token);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState();

    useEffect(() => {
        // 检查是否认证
        if (!hasAuth) {
            navigate('/')
            return
        }
        setLoading(true);
        client({
            headers: {
                'x-token': token
            },
            ...request
        }).then(
            resp => {
                // 收到响应，告别加载状态
                setLoading(false);

                //
                const {code, data, msg} = resp.data;
                if ('00000000' === code) {
                    setPayload(data);
                    return Promise.resolve();
                }

                // 通知用户
                message.error(msg);

                // 不成功的处理，主要是令牌相关异常
                switch (code) {
                    case '80000009':
                    case '80000010':
                    case '80000011': {
                        updateHasAuth(false);
                        repository.remove(USER_INFO_KEY);
                        navigate('/signIn');
                        break
                    }
                }
                return Promise.reject(new Error(msg));
            },
            err => {
                setLoading(false);
                message.error(err.message);
                return Promise.reject(err);
            }
        );
    }, []);

    return {loading, setLoading, payload, setPayload}
}


export default useAxios;