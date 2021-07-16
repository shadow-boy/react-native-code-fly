/*
 * @Author: your name
 * @Date: 2021-07-02 10:40:49
 * @LastEditTime: 2021-07-07 11:26:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wangPro\src\pages\TableList\index.tsx
 */
import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Radio, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import { queryDeployList, addDeploy } from '@/services/table';
import styles from './index.less';

const columns = [
  {
    title: 'APP名称',
    dataIndex: 'appName',
  },
  {
    title: '部署KEY',
    dataIndex: 'deployKey',
  },
  {
    title: '部署环境',
    dataIndex: 'isProduct',
    render: (text: any) => text ? '生产环境' : '无',
  },
  {
    title: '操作',
    render: (record: any) => <Button type="link" onClick={()=>{
      history.push('/list/resources');
      sessionStorage.setItem('deployKey',record.deployKey);
    }} >查看资源列表</Button>,
  }
];
function TableList() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getList();
  }, [])

  function getList () {
    setLoading(true);
    queryDeployList().then((res: any) => {
      setLoading(false);
      const { data, code } = res;
      if (code === '200') {
        setList(data);
      }
    })
  }
  function create () {
    form.validateFields().then((values)=>{
      addDeploy(values).then((res)=>{
        const { code } = res;
        if ( code && code === '200') {
          message.success('创建成功');
          setVisible(false);
        }else{
          message.error('创建失败');
        }
      })
    })
  }
  return (
    <PageContainer extraContent={
      <Button className={styles.btn} type="primary" onClick={() => {
        setVisible(true)
      }}>
        新建
      </Button>
    }>
      <Modal title="新建" visible={visible} onOk={create} onCancel={()=>{
        setVisible(false);
      }}>
        <Form
        form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="APP名称"
            name="appName"
            rules={[{ required: true, message: '请填写APP名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="是否是生产环境"
            name="isProduct"
            rules={[{ required: true, message: '请选择环境' }]}
          >
            <Radio.Group >
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        loading={loading}
        columns={columns}
        dataSource={list}
        rowKey="createdTime"
      />
    </PageContainer>
  )
}
export default TableList;