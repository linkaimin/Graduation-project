import './modules.css';
import axios from 'axios'
import React,{useEffect,useState} from 'react';
import { Table,Space,message,Modal } from 'antd';


function TextList() {
  const [list,setList] = useState(null)
  const [modalText,setModalText] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: '日志ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '关联投票',
      dataIndex: 'vote_title',
      key: 'vote_title',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <>
        <Space size="middle" style={{marginRight:'10px'}}>
          <a onClick={()=>{deleteItem(record._id)}}>删除</a>
        </Space>
        <br/>
          <Space size="middle">
          <a onClick={()=>{setIsModalVisible(true);setModalText(record.text)}}>查看正文</a>
        </Space>
        </>
      ),
    },
  ];
  useEffect(()=>{
    getList()
  },[])
  const getList = async() =>{
    const res = await axios.get('/api/v1/getText');
    setList(res.data)
  }
  const deleteItem = async(id)=>{
    const res = await axios.post('/api/v1/deleteText',{id})
    if(res){
      setList(res.data);
      message.success('删除成功！')
    }
  }
  return (
    <div className='page_height'>
    <Table loading={!list} rowKey='_id' columns={columns} dataSource={list} />
    <Modal style={{overflow:'hidden'}} title="日志正文" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    <div style={{overflow:'hidden',margin:'10px'}}  dangerouslySetInnerHTML = {{__html:modalText}} ></div>
    </Modal>
    </div>
  );
}

export default TextList;