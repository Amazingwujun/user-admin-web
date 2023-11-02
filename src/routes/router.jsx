import {createBrowserRouter} from "react-router-dom";
import SignIn from "../pages/SigIn.jsx";
import AuthRequired from "./AuthRequired.jsx";
import Main from "../layout/Main.jsx";
import Tenant from "../pages/Tenant.jsx";
import Resource from "../pages/Resource.jsx";

const router = createBrowserRouter([
    {
        element: <AuthRequired />,
        children: [
            {
                path: '/',
                element: <Main />,
                children: [
                    {
                        path: '/tenant',
                        element: <Tenant />
                    },
                    {
                        path: '/resource',
                        element: <Resource />
                    }
                ]
            }
        ]
    },
    {
        path: '/signIn',
        element: <SignIn />
    }
]);

export default router;
