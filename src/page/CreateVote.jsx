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

function CreateVote() {
  const [form] = Form.useForm();
    const [options,setOptions] = useState([{value:'',fe_id:_.uniqueId()},{value:'',fe_id:_.uniqueId()},{value:'',fe_id:_.uniqueId()}])
  const onFinish = async(values) => {
   const res = await axios.post('/api/v1/createForm',{title:values.title,pwd:values.pwd,
    options:options.map(item=>{return({value:item.value})})})
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
      <Form.Item name="title" label="标题" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="pwd" label="投票秘钥" rules={[{ required: true }]}>
      <Input />
      </Form.Item>
      <Form.Item label="选项" rules={[{ required: true }]}>
      {options.map((item,index)=>{
        return(
          <div key={index}>
          <Tag color='geekblue'>选项{index+1}</Tag>
                <Input value={item.value} onChange={(e)=>{
                                const arr = _.cloneDeep(options)
                                arr.splice(index,1,{value:e.target.value,fe_id:_.uniqueId()})
                                setOptions(arr)
                }} style={{width:'70%'}}/>
                <Button className='mr10' type="primary" onClick={()=>{
                  const arr = _.cloneDeep(options)
                  arr.push({value:'',fe_id:_.uniqueId()})
                  setOptions(arr)
                }}>
        增加
        </Button>
        <Button className='mr10' type="primary" onClick={()=>{
          if(options.length !== 1){
                  const arr = _.cloneDeep(options)
                  arr.splice(index,1)
                  setOptions(arr)
          }else{
          message.info('最后一项不能删除')
          }
        }}>
        删除
        </Button>
          </div>
        )
      })}
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

export default CreateVote;