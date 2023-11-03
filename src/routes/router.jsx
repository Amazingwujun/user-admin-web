import SignIn from "../pages/SigIn.jsx";
import Main from "../layout/Main.jsx";
import Tenant from "../pages/Tenant.jsx";
import Resource from "../pages/Resource.jsx";
import NotFounded from "../pages/NotFounded.jsx";
import Test from "../pages/Test.jsx";

const router = [
    {
        path: '/',
        element: <Main/>,
        errorElement: <NotFounded/>,
        children: [
            {
                index: true,
                element: <Tenant/>
            },
            {
                path: '/tenant',
                element: <Tenant/>
            },
            {
                path: '/resource',
                element: <Resource/>
            },
            {
                path: '/test',
                element: <Test/>
            }
        ]
    },
    {
        path: '/signIn',
        element: <SignIn/>
    }
];


export default router;
