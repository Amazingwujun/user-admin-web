import {Button, Card, Divider, Flex, Input, Space, Table} from "antd";
import {useRef} from "react";
import useAxios from "../hooks/useAxios.js";
import httpClient from "../api/request.js";
import useUserStore from "../store/store.js";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        ellipsis: true,
    },
    {
        title: '租户 ID',
        dataIndex: 'tenantId',
        key: 'tenantId',
        ellipsis: true,
    },
    {
        title: '部门 ID',
        dataIndex: 'deptId',
        key: 'deptId',
        ellipsis: true,
    },
    {
        title: '账号(名称)',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
    },
    {
        title: '部门名称',
        dataIndex: 'deptName',
        key: 'deptName'
    },
    {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile'
    },
    {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt'
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
            return <Button danger size='small' onClick={() => console.log(text, record, index)}>删除</Button>
        }
    }
]


function User() {
    const ref = useRef({username: ''});
    const token = useUserStore(t => t.token);
    const {loading, setLoading, payload, setPayload} = useAxios({
        url: '/user/page',
        method: 'POST',
        data: {}
    });

    let req = () => httpClient({
        url: '/user/page',
        method: 'POST',
        data: {
            username: ref.current.username
        },
        headers: {
            'x-token': token
        }
    }).then(
        data => {
            setPayload(data)
        }
    );


    return (
        <Card title='用户管理' className='full-container'>
            <Flex vertical>
                <Space>
                    <Input placeholder='用户名' onChange={t => ref.current.username = t.target.value}/>
                    <Button type={"primary"} onClick={req}>提交</Button>
                </Space>
                <Divider/>
                <Table
                    size='small'
                    loading={loading}
                    columns={columns}
                    bordered
                    pagination={{
                        pageSize: payload?.pageSize,
                        total: payload?.total,
                        current: payload?.pageNum,
                        size: 'small',
                        showTotal: t => `共 ${t} 条记录`
                    }}
                    dataSource={payload?.list}
                />
            </Flex>
        </Card>
    );
}

export default User;