import {Button, Flex, Input, Space, Table} from "antd";
import {useEffect, useRef, useState} from "react";
import httpClient from "../api/request.js";
import useUserStore from "../store/store.js";
import useAxios from "../hooks/useAxios.js";

const columns = [
    {
        title: '租户 id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
            return <Button danger onClick={() => console.log(text, record, index)}>删除</Button>
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
                <Input placeholder='请输入租户 id' onChange={t => setTenantId(t)} />
                <Button type={"primary"} onClick={() => {request.data = {id: tenantId}}}>提交</Button>
            </Space>
            <Flex flex={"auto"}>
                <Table className='full-container' columns={columns} size='small' dataSource={payload?.list}/>
            </Flex>
        </Flex>
    )
}


export default Tenant;