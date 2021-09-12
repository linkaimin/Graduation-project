import './modules.css';
import React from 'react';
import ParticlesBg from 'particles-bg'
import axios from 'axios'
import { Form, Input,Button,message } from 'antd';

const Login = (props)=>{
  const [form] = Form.useForm();
  const onFinish = async(values) => {
    const res = await axios.post('/api/v1/login',{phone:values.phone,password:values.password})
    if(res){
      message.info(res.data.msg)
      if(res.data.msg === '登录成功'){
        props.setIsLogin(true)
      }
    }
   };
  return (
    <div className='page_height'>
    <Form  form={form}  onFinish={onFinish} style={{width:"400px",margin:'0 auto'}}>
    <h1 style={{textAlign:"center",fontWeight:"600",color:'#0096ff'}}>管理员登录界面</h1>
    <Form.Item className="input_outer" name='phone'>
    <Input style={{height:'40px'}}  bordered={false} placeholder='请输入电话号码'/>
    </Form.Item>
    <br/>
    <Form.Item className="input_outer" name='password'>
    <Input.Password style={{height:'40px'}}   bordered={false}  placeholder='请输入密码'/>
    </Form.Item>
    <Button style={{width:"400px",margin:'20px auto'}} className='mr10' type="primary" htmlType="submit">
          登录
        </Button>
    </Form>
    </div>
  );
}

export default Login;