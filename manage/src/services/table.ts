/*
 * @Author: your name
 * @Date: 2021-07-02 13:57:47
 * @LastEditTime: 2021-07-08 17:41:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wangPro\src\services\table.ts
 */
import request from '@/utils/request';

export async function queryDeployList() {
    return request('/api/deploy/queryDeployList', {
      method: 'POST',
      requestType: 'json',
      data: {},
    });
  }

export async function addDeploy(param: any) {
    return request('/api/deploy/addDeploy', {
      method: 'POST',
      requestType: 'json',
      data: param,
    });
  }

  
export async function queryBundleList(param: {
    deployKey: string | null
}) {
    return request('/api/deploy/queryBundleList', {
      method: 'POST',
      requestType: 'json',
      data: param,
    });
  }

  export async function updateBundle(param: any) {
    return request('/api/deploy/updateBundle', {
      method: 'POST',
      requestType: 'json',
      data: param,
    });
  }
  export async function deleteBundle(param: any) {
    return request('/api/deploy/deleteBundle', {
      method: 'POST',
      requestType: 'json',
      data: param,
    });
  }
  
  
