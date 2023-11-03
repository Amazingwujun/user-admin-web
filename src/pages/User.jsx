import {Button, Card, DatePicker, Divider, Flex, Input, Space, Table} from "antd";
import {useRef} from "react";
import useAxios from "../hooks/useAxios.js";
import httpClient from "../api/request.js";
import useUserStore from "../store/store.js";
import {PlusOutlined, ReloadOutlined, SearchOutlined} from "@ant-design/icons";

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

const grid = {
    display: 'grid',
    gridTemplateColumns: '1fr 7fr 1fr 1fr 7fr',
    gridTemplateRows: 'max-content max-content',
    gap: '20px 10px',
    alignItems: 'center',
    justifyItems: 'start'
}

function SearchView({req}) {

    return (
        <Flex className='full-container'>
            <div style={{...grid, flex: "auto"}}>
                <label style={{fontWeight: 'bold'}}>用户 ID</label>
                <Input onChange={t => ref.current.username = t.target.value}/>
                <span/>
                <label style={{fontWeight: 'bold'}}>用户名</label>
                <Input onChange={t => ref.current.username = t.target.value}/>

                <label style={{fontWeight: 'bold'}}>手机号</label>
                <Input onChange={t => ref.current.username = t.target.value}/>
                <span/>
                <label style={{fontWeight: 'bold'}}>创建时间</label>
                <DatePicker.RangePicker showTime/>
            </div>
            <Divider type='vertical' style={{height: 90}}/>
            <Flex vertical justify={"space-between"} align='center' style={{minWidth: 200}}>
                <Button style={{width: 100}} icon={<SearchOutlined/>} type='primary'>搜索</Button>
                <Button style={{width: 100}} icon={<ReloadOutlined/>} type='primary'>重置</Button>
            </Flex>
        </Flex>
    )
}

function User() {
    const ref = useRef({username: ''});
    const token = useUserStore(t => t.token);
    const {loading, setLoading, payload, setPayload} = useAxios({
        url: '/user/page',
        method: 'POST',
        data: {
            pageSize: 12
        }
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
                <SearchView req={req}/>
                <Divider/>
                <Space style={{marginBottom: 10}}>
                    <Button icon={<PlusOutlined/>} type='primary'>新增</Button>
                </Space>
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
                        position: ['bottomLeft'],
                        showTotal: t => `共 ${t} 条记录`
                    }}
                    dataSource={payload?.list}
                />
            </Flex>
        </Card>
    );
}

export default User;