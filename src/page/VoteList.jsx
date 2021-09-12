import './modules.css';
import axios from 'axios'
import React,{useEffect,useState} from 'react';
import { Table,Tag,Space,message,Modal } from 'antd';
import QRCode  from 'qrcode.react';
import { useHistory } from 'react-router-dom'

function VoteList() {
  const history = useHistory()
  const [list,setList] = useState(null)
  const [id,setId] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisiblePro, setIsModalVisiblePro] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOkPro = () => {
    setIsModalVisiblePro(false);
  };

  const handleCancelPro = () => {
    setIsModalVisiblePro(false);
  };
  const columns = [
    {
      title: '投票ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '备选项',
      render: (text, record) => {
        return(
        record.options.map((item,index)=>
          <div key={index}>
          <Space>选项{index+1}：<Tag color='geekblue'> {item.value}</Tag></Space>
          <Space> 得分：{item.number}</Space>
          </div>
        )
        )
      }
    },
    {
      title: '投票秘钥',
      dataIndex: 'pwd',
      key: 'pwd',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <>
        <Space size="middle" style={{marginRight:'10px'}}>
          <a onClick={()=>{deleteItem(record._id)}}>删除</a>
        </Space>
        <Space size="middle">
          <a onClick={()=>{history.push({pathname:'/'+record._id+'?pwd='+record.pwd})}}>查看详情</a>
        </Space>
        <br/>
          <Space size="middle">
          <a onClick={()=>{setIsModalVisible(true);setId(record._id)}}>生成大众评委二维码</a>
        </Space>
        <br/>
          <Space size="middle">
          <a onClick={()=>{setIsModalVisiblePro(true);setId(record._id)}}>生成专家评委二维码</a>
        </Space>
        </>
      ),
    },
  ];
  useEffect(()=>{
    getList()
  },[])
  const getList = async() =>{
    const res = await axios.get('/api/v1/forms');
    setList(res.data)
  }
  const deleteItem = async(id)=>{
    const res = await axios.post('/api/v1/deleteForm',{id})
    if(res){
      setList(res.data);
      message.success('删除成功！')
    }
  }
  return (
    <div className='page_height'>
    <Table loading={!list} rowKey='_id' columns={columns} dataSource={list} />
    <Modal title="大众评委投票二维码" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    <QRCode
      value={'http://47.93.241.211:3000/#/normal/'+id}  // value参数为生成二维码的链接
      size={200}  // 二维码的宽高尺寸
      fgColor="#000000"   // 二维码的颜色
 />
    </Modal>
    <Modal title="专家评委投票二维码" visible={isModalVisiblePro} onOk={handleOkPro} onCancel={handleCancelPro}>
    <QRCode
      value={'http://47.93.241.211:3000/#/pro/'+id}  // value参数为生成二维码的链接
      size={200}  // 二维码的宽高尺寸
      fgColor="#000000"   // 二维码的颜色
 />
    </Modal>
    </div>
  );
}

export default VoteList;