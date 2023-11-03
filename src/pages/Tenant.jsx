import {Button, Flex, Input, Space, Table, Tag} from "antd";
import {useState} from "react";
import useAxios from "../hooks/useAxios.js";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        ellipsis: true
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: t => {
            if (t === 0) {
                return <Tag color="success">激活</Tag>
            }
            return <Tag color='error'>冻结</Tag>
        }
    },
    {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
    },
    {
        title: '过期时间',
        dataIndex: 'expireAt',
        key: 'expireAt'
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

const request = {
    url: '/tenant/page',
    data: {},
    method: 'POST'
}

function Tenant() {
    const {payload} = useAxios(request);
    const [tenantId, setTenantId] = useState();

    return (
        <Flex className='full-container' style={{padding: 5}} vertical>
            <Space style={{marginBottom: 10}}>
                <Input placeholder='请输入租户 id' onChange={t => setTenantId(t)}/>
                <Button type={"primary"} onClick={() => {
                    request.data = {id: tenantId}
                }}>提交</Button>
            </Space>
            <Flex flex={"auto"}>
                <Table className='full-container' columns={columns} size='small' dataSource={payload?.list}/>
            </Flex>
        </Flex>
    )
}


export default Tenant;