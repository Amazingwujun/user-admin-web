import {Button, Checkbox, Flex, Form, Image, Input, message, Select, Space} from "antd";
import httpClient from "../api/request.js";
import {useEffect, useState} from "react";
import useUserStore from "../store/store.js";
import {useNavigate} from "react-router-dom";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {USER_INFO_KEY} from "../const/common.js";
import repository from "../utils/repository.js";
import Main from "../layout/Main.jsx";

const IMG_PLACE_HOLDER = "data:image/png;base64,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";


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
    // hooks
    const updateAuthState = useUserStore(state => state.updateAuthState)
    const updateUsername = useUserStore(state => state.updateUsername);
    const updateToken = useUserStore(state => state.updateToken);
    const updateRememberMe = useUserStore(t => t.updateRememberMe);
    const rememberMe = useUserStore(t => t.rememberMe);
    const navigate = useNavigate();

    // 存储类型
    const repositoryType = rememberMe ? repository.LOCAL_STORAGE : repository.SESSION_STORAGE;

    console.log('remember me', repositoryType)

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

            // 清理之前的用户信息
            // 防止 session storage 与 local storage 混淆
            repository.remove(USER_INFO_KEY);
            // 保存用户信息
            repository.put(
                USER_INFO_KEY,
                JSON.stringify(makeUserInfo(true, data.token, data.username)),
                repositoryType
            )
            updateUsername(data.username);
            updateToken(data.token)
            updateAuthState(true);
            setLoading(false);

            // 跳转
            navigate("/")
        }, () => {
            // 移除用户信息
            repository.remove(USER_INFO_KEY);

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
                    width: 350,
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
                    <Flex justify='space-between' style={{minWidth: 0}}>
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
                        <Image src={captchaInfo.img && 'data:image/png;base64,' + captchaInfo.img} style={{height: 40, width: 100}}
                               preview={false}
                               fallback={IMG_PLACE_HOLDER}
                               onClick={onCaptchaImgClicked}/>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Flex justify='space-between' align='center'>
                        <Checkbox style={{flex: 4}} onChange={(e) => updateRememberMe(e.target.checked)}>
                            记住我
                        </Checkbox>
                        <Button type="primary" loading={loading} style={{height: 40, flex: 6}} htmlType="submit">
                            登入
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </>
    )
}


function SignIn() {
    const hasAuth = useUserStore(t => t.hasAuth);
    if (hasAuth) {
        return <Main />
    }

    return (
        <Flex className="full-container" vertical justify={"center"} align={"center"} style={{background: '#f0f2f5'}}>
            <div style={{display: "flex", flexDirection: 'column', justifyContent: 'center' ,alignItems: 'center', marginBottom: 100}}>
                <span style={{marginBottom: 20, fontSize: 50, fontWeight: 'bold'}}>User Admin</span>
                <ByPasswd/>
            </div>
        </Flex>
    );
}

export default SignIn;