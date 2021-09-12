import './modules.css';
import axios from 'axios'
import _ from 'lodash'
import React,{useEffect,useState} from 'react';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { Form, Input, Button,message,Select  } from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function CreateText() {
  const [form] = Form.useForm();
  const [text,setText] = useState({})
  const [voteList,setVoteList] = useState([])
  const getVoteList = async() =>{
    const res = await axios.get('/api/v1/forms');
    setVoteList(res.data)
  }
  useEffect(()=>{
    getVoteList()
  },[])
  const onFinish = async(values) => {
    const res = await axios.post('/api/v1/createText',{title:values.title,vote_title:values.vote_title,
     text:text.toHTML()})
    if(res){
      message.success('新增成功！')
    }
   };
  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      title: '标题内容',
      pwd: '111111',
    });
  };
  return (
    <div className='page_height'>
<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
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
      <Form.Item name="title" label="标题" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {voteList&&
      <Form.Item name="vote_title" label="关联投票" rules={[{ required: true }]}>
       <Select options={(voteList||[]).map(item=>{return({label:item.title,value:item.title})})}></Select>
      </Form.Item>
      }
      <Form.Item label="日志正文">
      <BraftEditor className='text-container' style={{margin:'0 auto'}} value={text} onChange={(e)=>{setText(e)}}/>
      </Form.Item>
    </Form>
    </div>
  );
}

export default CreateText;