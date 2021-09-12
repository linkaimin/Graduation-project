import './modules.css';
import axios from 'axios'
import _ from 'lodash'
import React,{useEffect,useState} from 'react';
import { Form, Input, Button,message,Tag  } from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function CreateUser() {
  const [form] = Form.useForm();
  const onFinish = async(values) => {
   const res = await axios.post('/api/v1/createUser',{phone:values.phone,password:values.password,
    name:values.name})
   if(res){
     message.success('新增成功！')
   }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      name: '管理员',
      password: '111111',
      phone:'111111'
    });
  };
  return (
    <div className='page_height'>
<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true }]}>
      <Input />
      </Form.Item>
      <Form.Item name="phone" label="电话号码" rules={[{ required: true }]}>
      <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button className='mr10' type="primary" htmlType="submit">
          提交
        </Button>
        <Button className='mr10' htmlType="button" onClick={onReset}>
          重置
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
         快速填充
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
}

export default CreateUser;