import {Avatar, Button, Dropdown, Flex, Image, Space} from "antd";
import useUserStore from "../store/store.js";
import {UserOutlined} from "@ant-design/icons";
import {USER_INFO_KEY} from "../hooks/common.js";
import logo from "../assets/vite.svg"

const items = [
    {
        label: "退出登入",
        key: '0',
    },
];

function Header() {
    const updateAuth = useUserStore(t => t.updateAuthState);

    const onClick = ({key}) => {
        if (key === '0') {
            // 退出登入
            updateAuth(false);
            // 清理 localstorage
            localStorage.removeItem(USER_INFO_KEY);
        }
    }

    return (
        <Flex justify='space-between' align='center'
              style={{height: 59, background: '#fff', marginBottom: 2, paddingLeft: 20, paddingRight: 20}}>
            <Space>
                <Image
                    width={40}
                    preview={false}
                    src={logo}
                />
                <span style={{fontSize: 25}}>User Admin</span>
            </Space>
            <Space>
                <Dropdown
                    menu={{items, onClick}}
                    trigger={["click"]}

                >
                    <Avatar shape="circle" style={{cursor: "pointer"}} icon={<UserOutlined/>}/>
                </Dropdown>
            </Space>
        </Flex>
    )
}

export default Header;