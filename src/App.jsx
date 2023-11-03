import {createBrowserRouter, RouterProvider} from "react-router-dom";
import router from "./routes/router.jsx";
import useUserStore from "./store/store.js";
import './App.css'
import {USER_INFO_KEY} from "./hooks/common.js";

function App() {
    // 初始化用户登入状态
    let userInfoStr = localStorage.getItem(USER_INFO_KEY);
    if (userInfoStr) {
        let {hasAuth, username, token} = JSON.parse(userInfoStr);
        const updateAuth = useUserStore(t => t.updateAuthState);
        const updateToken = useUserStore(t => t.updateToken);
        const updateUsername = useUserStore(t => t.updateUsername);

        updateAuth(hasAuth);
        updateToken(token);
        updateUsername(username);
    }

    // 创建路由
    const browserRouter = createBrowserRouter(router);

    return (
        <RouterProvider router={browserRouter}/>
    );
}

export default App
