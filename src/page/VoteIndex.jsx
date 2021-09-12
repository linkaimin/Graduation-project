import './modules.css';
import React,{useEffect,useState} from 'react';
import {message,Card,Input,Button} from 'antd'
import axios from 'axios'
import ParticlesBg from 'particles-bg'
import VoteDetail from './VoteDetail';

const VoteIndex = props =>{
  const [value,setValue] = useState([{_id:''}])
  const [canVote,setCanVote]=useState(false)
  const [pwd,setPwd] = useState('')
  useEffect(()=>{
    getList()
  },[])
  const getList = async() =>{
    const res = await axios.get('/api/v1/forms/');
    const data = res.data.filter(item=>{ 
        return item._id === props.match.params.id})
    setValue(data)
  }

  return (
    <>
      <ParticlesBg type="circle" bg={true}/>
    <div style={{background:'white'}} className='vote_phone'>
    {canVote?<VoteDetail votePassword={pwd} role={props.match.params.role} id={props.match.params.id}/>:
    <Card title="确认投票秘钥"  style={{ width: 300 }}>
    <div className="mr20">Password： <Input value={pwd} onChange={(e)=>{setPwd(e.target.value)}}  style={{width:'50%'}}/></div> 
     <Button type="primary" style={{float:'right'}} onClick={()=>{
        if(pwd === value[0].pwd){
            message.success('密码验证通过！')
            setCanVote(true)
        }else{
            message.error('密码错误！')
        }
     }}>提交</Button>
    </Card>
    }
    </div>
    </>
  );
}

export default VoteIndex;