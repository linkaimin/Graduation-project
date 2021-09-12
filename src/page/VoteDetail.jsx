import './modules.css';
import React,{useEffect,useState} from 'react';
import {Alert,Radio,List, Button,message} from 'antd'
import axios from 'axios'

const VoteDetail = props =>{
  const [value,setValue] = useState({options:[]})
  const [select,setSelect] = useState(0)
  const [ip,setIp] = useState('0')
  useEffect(()=>{
    getList()
    getIp()
  },[])
  const getIp = () =>{
    let conn = new RTCPeerConnection({
      iceServers: []
    }) 
  let noop = function(){}
  conn.onicecandidate = function(ice){
    if (ice.candidate){
      //使用正则获取ip
      let ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
      let ip_addr = ip_regex.exec(ice.candidate.candidate);
      setIp(ice.candidate.address)
      conn.onicecandidate = noop
    }
  }
  //创建一个通道(channel)
  conn.createDataChannel('ip')
  //创建一个SDP协议请求
  conn.createOffer(conn.setLocalDescription.bind(conn),noop)
  }
  const submit = async()=>{
    try{
    const res = await axios.post('/api/v1/submitForm',{select,ip,pwd:props.votePassword,formId:props.id,role:props.role});
    if(res){
      message.success('投票成功！')
    }
  }catch(err){
    message.error('重复投票或网络状态不佳！')
  }
  }
  const getList = async() =>{
    const res = await axios.get('/api/v1/forms/'+props.id+'?pwd='+props.votePassword);
    setValue(res.data)
  }
  const onChange = e => {
    setSelect(e.target.value);
  };

  return (
    <>
           <Radio.Group onChange={onChange} value={select}>
           {props.role === 'normal'?
       <Alert message="大众评委您好！" description="一台设备只能为一位选手投票哦！" type="info" />:
       <Alert message="专家评委您好！" description="一台设备只能为一位选手投票哦！" type="info" />
           }
       <List
       style={{width:'300px'}}
      header={<div>标题：{value.title}</div>}
      footer={<Button type='primary' onClick={()=>submit()}>提交</Button>}
      bordered
      dataSource={value.options}
      renderItem={(item,index) => (
        <List.Item>
          <Radio value={index}>选项{index+1}：{item.value}</Radio>
        </List.Item>
      )}
    />
        </Radio.Group>
    </>
  );
}

export default VoteDetail;