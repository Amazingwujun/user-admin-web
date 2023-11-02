import {RouterProvider} from "react-router-dom";
import router from "./routes/router.jsx";
import useUserStore from "./store/store.js";
import './App.css'
import {USER_INFO_KEY} from "./hooks/common.js";

function App() {
    // 检查 local storage
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

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App
