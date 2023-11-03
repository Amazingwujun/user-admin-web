import useAxios from "../hooks/useAxios.js";
import {Button, Skeleton, Space, Table} from "antd";

const columns = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 200
    },
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        ellipsis: true,
        width: 200
    },
    {
        title: '资源类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
        render: (text) => {
            if (0 === text) {
                return "后端资源";
            } else if (1 === text) {
                return "前端资源"
            } else {
                return <>非法资源类型: {text}</>
            }
        }
    },
    {
        title: '所属服务',
        dataIndex: 'service',
        key: 'service',
        width: 200
    },
    {
        title: '资源定位符',
        dataIndex: 'uri',
        key: 'uri',
        width: 200
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true
    },
    {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt',
        width: 200
    },
    {
        title: '操作',
        key: 'action',
        width: 200,
        fixed: 'right',
        render: (text, record, index) => {
            return <Space>
                <Button size={'small'} >修改</Button>
                <Button size={'small'} danger onClick={() => console.log(text, record, index)}>删除</Button>
            </Space>
        }
    }
]

const pageConfig = {
    position: ['none']
}


const request = {
    url: '/resource/selfTree',
    data: {},
    method: 'GET'
}

function recursiveRemoveEmptyChildren(arr = []) {
    for (let i = 0; i < arr?.length; i++) {
        let el = arr[i];
        if (el.children?.length > 0) {
            recursiveRemoveEmptyChildren(el.children);
        } else {
            el.children = null;
        }
    }
}

function Resource() {
    const {loading, payload} = useAxios(request);
    recursiveRemoveEmptyChildren(payload);

    return (
        <Table className='full-container'
               bordered={true}
               rowKey='id'
               pagination={pageConfig}
               scroll={{y: 820}}
               size='small'
               columns={columns} dataSource={payload}/>

    );
}


export default Resource;