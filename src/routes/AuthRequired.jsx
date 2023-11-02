import {Outlet, useLocation} from "react-router-dom";
import useUserStore from "../store/store.js";
import SignIn from "../pages/SigIn.jsx";

function AuthRequired() {
    const {pathname} = useLocation();
    const hasAuth = useUserStore(state => state.hasAuth)
    const uname = useUserStore(state => state.username)
    console.log(`用户[${uname}] path: ${pathname}`);
    return hasAuth ? <Outlet/> : <SignIn/>;
}

export default AuthRequired;