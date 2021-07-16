/*
 * @Author: your name
 * @Date: 2021-07-02 10:40:49
 * @LastEditTime: 2021-07-02 14:55:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wangPro\src\pages\User\login\index.tsx
 */
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { Dispatch } from 'umi';
import type { LoginParamsType } from '@/services/login';
import { fakeAccountLogin } from '@/services/login';
import { message } from 'antd';
import { history } from 'umi';
import styles from './index.less';


export type LoginProps = {
  dispatch: Dispatch;
  submitting?: boolean;
  location: any;
};


const Login: React.FC<LoginProps> = (props) => {
  const { submitting } = props;
  useEffect(() => {
    sessionStorage.removeItem('antd-pro-authority');
    sessionStorage.removeItem('luma-auth-token');
  }, []);

  const handleSubmit = (values: any) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    fakeAccountLogin(payload).then((res: any)=>{
      console.log(res)
      if (res && res.code === '200') {
        message.success('登录成功');
        history.push('/list');
      }
    })
  };
  return (
    <div className={styles.main}>
      <ProForm
        submitter={{
          searchConfig: {
            submitText: '登录',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            size: 'large',
            style: {
              width: '100%',
            },
            loading: submitting,
          },
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >
        <ProFormText
          name="email"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder="用户名"
          rules={[
            {
              required: true,
              whitespace: true,
              message: '用户名是必填项！',
            },
            // { validator: validUserCode },
          ]}
          validateFirst
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          placeholder="密码"
          rules={[
            {
              required: true,
              whitespace: true,
              message: '密码是必填项！',
            },
            // { validator: validatePass },
          ]}
          validateFirst
        />
      </ProForm>
    </div>
  );
};

export default Login

