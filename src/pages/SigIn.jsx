import {Button, Flex, Form, Image, Input, message, Select, Space} from "antd";
import httpClient from "../api/request.js";
import {useEffect, useState} from "react";
import useUserStore from "../store/store.js";
import {useNavigate} from "react-router-dom";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {USER_INFO_KEY} from "../hooks/common.js";


function makeUserInfo(hasAuth = false, token = '', username = '') {
    return {hasAuth, username, token}
}

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const requireTenantNames = (form, setTenants) => {
    httpClient({
        url: '/tenant/names',
        method: 'GET'
    }).then(data => {
        form.setFieldsValue({
            tenant: data
        });
        setTenants(data.map(t => {
            return {
                value: t,
                lable: t.toUpperCase()
            };
        }))
    })
}


function ByPasswd() {
    const updateAuthState = useUserStore(state => state.updateAuthState)
    const updateUsername = useUserStore(state => state.updateUsername);
    const updateToken = useUserStore(state => state.updateToken);
    const navigate = useNavigate();


    const [form] = Form.useForm();
    const [tenants, setTenants] = useState([]);
    const [captchaInfo, setCaptchaInfo] = useState({})
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        requireTenantNames(form, setTenants)
    }, []);
    useEffect(() => {
        onCaptchaImgClicked()
    }, []);

    function onFinish(values) {
        setLoading(true);
        const {username, password, captchaStr, tenant} = values;

        httpClient({
            url: '/user/signIn',
            method: 'POST',
            data: {
                tenantName: tenant[0],
                username,
                password,
                captchaStr,
                captchaId: captchaInfo.id,
                signInType: 1
            }
        }).then(data => {
            message.success({
                type: "success",
                content: '登入成功'
            })

            // 将令牌存到 local storage 中
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(makeUserInfo(true, data.token, data.username)))
            updateUsername(data.username);
            updateToken(data.token)
            updateAuthState(true);
            setLoading(false);

            // 跳转
            navigate("/")
        }, () => {
            // 移除用户信息
            localStorage.removeItem(USER_INFO_KEY);

            // 加载按钮状态变更
            setLoading(false)

            // 变更认证状态
            updateAuthState(false);

            // 更新验证码图片
            onCaptchaImgClicked();
        })
    }

    function onCaptchaImgClicked() {
        httpClient({
            url: '/user/captcha',
            method: 'GET'
        }).then(data => {
            setCaptchaInfo({
                ...data
            })
        })
    }

    return (
        <>
            <Form
                name="basic"
                form={form}
                style={{
                    maxWidth: 300,
                    marginBottom: 100
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="tenant"
                    rules={[
                        {
                            required: true,
                            message: '请选择租户',
                        },
                    ]}
                >
                    <Select style={{height: 40}}
                            onChange={t => {
                                form.setFieldValue('tenant', t)
                            }}
                            allowClear
                            options={tenants}
                    />
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined/>} style={{height: 40}} placeholder={'请输入用户名'}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined/>} style={{height: 40}} placeholder={'请输入密码'}/>
                </Form.Item>

                <Form.Item>
                    <Space align={"top"}>
                        <Form.Item
                            name="captchaStr"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码!',
                                },
                            ]}
                        >
                            <Input placeholder={'请输入验证码'} style={{height: 40}}/>
                        </Form.Item>
                        <Image src={captchaInfo.img && 'data:image/png;base64,' + captchaInfo.img} style={{height: 40}}
                               preview={false}
                               onClick={onCaptchaImgClicked}/>
                    </Space>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" block loading={loading} style={{height: 40}} htmlType="submit">
                        登入
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}


function SignIn() {
    return (
        <Flex className="full-container" justify={"center"} align={"center"} style={{background: '#f0f2f5'}}>
            <ByPasswd/>
        </Flex>
    )
}

export default SignIn;