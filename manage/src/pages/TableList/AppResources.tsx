/*
 * @Author: your name
 * @Date: 2021-07-02 10:40:49
 * @LastEditTime: 2021-07-08 17:45:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wangPro\src\pages\TableList\index.tsx
 */
import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Radio, message, Upload, Progress } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { queryBundleList, updateBundle, deleteBundle } from '@/services/table';
import AV from 'leancloud-storage';
import { UploadOutlined } from '@ant-design/icons';
import styles from './index.less';



function TableList() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [fileList, setFileList] =  useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(-1);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [form] = Form.useForm();
  const deployKey = sessionStorage.getItem('deployKey');
  const columns = [
    {
      title: '创建时间',
      dataIndex: 'createdTime',
    },
    {
      title: '关联部署对象',
      dataIndex: 'deployKey',
    },
    {
      title: '下载地址',
      dataIndex: 'downloadUrl',
    },
    {
      title: '是否可用',
      dataIndex: 'isAvailable',
      render: (text: any) => (text === 1 ? '是' : '否'),
    },
    {
      title: '原生APP版本',
      dataIndex: 'updateAppVersion',
    },
    {
      title: '备注',
      dataIndex: 'label',
    },
    {
      title: '是否强制',
      dataIndex: 'isMandatory',
      render: (text: any) => (text === 1 ? '是' : '否'),
    },
    {
      title: '操作',
      render: (record: any) => <Button type="link" onClick={()=>{
        deleteBundle({id:record.id}).then((res)=>{
          const { code } = res;
          if (code === '200') {
            message.success('删除成功！');
            getList();
          }else{
            message.success('删除失败！');
          }
        })
      }} >删除</Button>,
    }
  ];
  const uploadProps = {
    headers: {
      authorization: 'authorization-text',
    },
    // eslint-disable-next-line @typescript-eslint/no-shadow
    beforeUpload(file: any, fileList: any){
      const fileInfo = new AV.File(file.name, file);
      setProgress(-1);
      setDownloadUrl(null);
      setShowProgress(true);
      fileInfo.save({
        onprogress: (info: any) => {
          if (info) {
            setProgress(info.percent)
          }
        }
      }).then((res: any)=>{
        if (res) {
          const { url } = res.attributes;
          if (url) {
            setDownloadUrl(url);
            message.success('上传成功');
          }else{
            message.error('上传失败');
          }
        }
      },(error) => {
        console.log(error);
        message.error('上传失败');
      })
      setFileList(fileList);
      return false;
    },
    onRemove() {
      setFileList([]);
      setProgress(-1);
      setShowProgress(false);
      setDownloadUrl(null);
    },
    fileList,
  };
  useEffect(() => {
    AV.init({
      appId: "BivEqB72Y97EdAwFoyeXJIkk-MdYXbMMI",
      appKey: "T51l79ejiC9jEOW5hP6YFxHz"
    });
    getList();
  }, []);

  function create() {
    form.validateFields().then((values: any) => {
      // eslint-disable-next-line no-param-reassign
      delete values.file; 
      if (!downloadUrl){
        message.error('请上传文件！')
        return;
      }
      // eslint-disable-next-line no-param-reassign
      values.packageSize = fileList[0].size;
      values.deployKey = deployKey;
      // eslint-disable-next-line no-param-reassign
      values.downloadUrl = downloadUrl;
      updateBundle(values).then((res) => {
        const { code } = res;
        if (code && code === '200') {
          message.success('创建成功');
          setVisible(false);
          getList();
        } else {
          message.error('创建失败');
        }
      });
    });
  }
  function getList() {
    setLoading(true);
    queryBundleList({ deployKey }).then((res: any) => {
      setLoading(false);
      const { data, code } = res;
      if (code === '200') {
        setList(data);
      }
    });
  }
  function validatePass () {
    if (!downloadUrl) {
      // eslint-disable-next-line prefer-promise-reject-errors
      console.log(downloadUrl)
      return Promise.reject('请上传文件');
    }
    return Promise.resolve();
  };
  const normFile = (e: any) => {
    e.downloadUrl = downloadUrl;
    return e;
  };
  return (
    <PageContainer
      extraContent={
        <Button
          className={styles.btn}
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          新建
        </Button>
      }
    >
      {
        visible && <Modal
        title="新建"
        width="650px"
        visible={true}
        onOk={create}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form form={form} name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            label="原生app的版本"
            name="targetBinaryRange"
            rules={[{ required: true, message: '请输入原生app的版本' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="是否可用"
            name="isAvailable"
            rules={[{ required: true, message: '请选择是否可用' }]}
          >
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="更新的bundleHash"
            name="packageHash"
            rules={[{ required: true, message: '请输入更新的bundleHash' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="显示备注"
            name="label"
            rules={[{ required: true, message: '请输入显示备注' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="更新app的版本"
            name="updateAppVersion"
            rules={[{ required: true, message: '请输入更新app的版本' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="是否强制"
            name="isMandatory"
            rules={[{ required: true, message: '请选择是否强制' }]}
          >
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="上传文件"
            name="file"
            rules={[{ 
              // required: true, 
              // message: 'fdsfdsf',
              // validator: validatePass
          }]}
          >
            <Upload {...uploadProps}>
              <Button type="primary" icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
            {
              showProgress && <Progress percent={progress} />
            }
          </Form.Item>
          {
              downloadUrl &&
              <Form.Item
            label="downloadUrl"
            name="downloadUrl"
            rules={[{ required: false, message: '请选择是否强制' }]}
          >
            <span className={styles.url}>{downloadUrl}</span>
          </Form.Item>
          }
        </Form>
      </Modal>
      }
      <Table loading={loading} columns={columns} dataSource={list} rowKey="id" />
    </PageContainer>
  );
}
export default TableList;
