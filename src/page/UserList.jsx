import './modules.css';
import axios from 'axios'
import React,{useEffect,useState} from 'react';
import { Table,Space,message,Modal } from 'antd';

function UserList() {
  const [list,setList] = useState(null)
  const columns = [
    {
      title: '管理员ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <>
        <Space size="middle" style={{marginRight:'10px'}}>
          <a onClick={()=>{deleteItem(record._id)}}>删除</a>
        </Space>
        </>
      ),
    },
  ];
  useEffect(()=>{
    getList()
  },[])
  const getList = async() =>{
    const res = await axios.get('/api/v1/getUser');
    setList(res.data)
  }
  const deleteItem = async(id)=>{
    const res = await axios.post('/api/v1/deleteUser',{id})
    if(res){
      setList(res.data);
      message.success('删除成功！')
    }
  }
  return (
    <div className='page_height'>
    <Table loading={!list} rowKey='_id' columns={columns} dataSource={list} />
    </div>
  );
}

export default UserList;