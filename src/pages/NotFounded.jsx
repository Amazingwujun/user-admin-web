import {Button, Result} from "antd";
import {useNavigate, useRouteError} from "react-router-dom";

function NotFounded() {
    const navigate = useNavigate();
    const error = useRouteError();

    console.info(error)
    return (
        <Result
            title={error.statusText}
            status={error.status}
            subTitle={error.data}
            extra={<Button type='primary' onClick={() => navigate('/')}>回到主页</Button>}
        />
    )
}


export default NotFounded;