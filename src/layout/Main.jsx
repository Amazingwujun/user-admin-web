import {Flex, FloatButton} from "antd";
import LeftBar from "./LeftBar.jsx";
import useUserStore from "../store/store.js";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Outlet, useLocation} from "react-router-dom";
import Header from "./Header.jsx";
import SignIn from "../pages/SigIn.jsx";


function Main() {
    const updateCollapsed = useUserStore(t => t.updateCollapsed);
    const collapsed = useUserStore(t => t.collapsed);
    const hasAuth = useUserStore(t => t.hasAuth);
    if (!hasAuth) {
        return <SignIn/>
    }

    const doc = () => {
        if (collapsed) {
            return <div>展开菜单</div>
        }
        return <div>折叠菜单</div>
    }

    return (
        <Flex className='full-container' vertical style={{background: '#f2f3f5'}}>
            <Header/>
            <Flex className='full-container'>
                <LeftBar/>
                <Flex className='full-container'
                      style={{minWidth: 0, padding: '16px 20px'}}
                      justify='center' align='center'><Outlet/></Flex>
                <FloatButton tooltip={doc()} icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                             onClick={() => updateCollapsed()}/>
            </Flex>
        </Flex>
    );
}

export default Main;