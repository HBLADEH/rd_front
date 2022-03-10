/*
 * @Descripttion:
 * @version:
 * @Author: zoucw (326359613@qq.com)
 * @Date: 2021-03-29 16:59:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-28 17:56:07
 */
import axios from 'axios'
import { Notify } from 'vant';
// 创建axios实例
// 创建请求时可以用的配置选项

const Http = axios.create({
  withCredentials: true,
  timeout: 1000,
  baseURL: ''
})
// axios的全局配置
Http.defaults.headers.post = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
Http.defaults.headers.common = {
  'Auth-Type': 'company-web',
  'X-Requested-With': 'XMLHttpRequest',
  token: 'sdfjlsdfjlsdjflsjflsfjlskd'
}

// 添加请求拦截器(post只能接受字符串类型数据)
Http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const errorHandle = (status: number, other: string) => {
  switch (status) {
    case 400:
      Notify({ type: 'danger', message: '信息校验失败' });
      break
    case 401:
      Notify({ type: 'danger', message: '认证失败' });
      break
    case 403:
      Notify({ type: 'danger', message: 'token校验失败' });
      break
    case 404:
      Notify({ type: 'danger', message: '请求的资源不存在' });
      break
    default:
      Notify({ type: 'danger', message: other });
      break
  }
}

// 添加响应拦截器
Http.interceptors.response.use(
  // 响应包含以下信息data,status,statusText,headers,config
  (res) => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  (err) => {
    Notify({ type: 'danger', message: err });
    const { response } = err
    if (response) {
      errorHandle(response.status, response.data)
      return Promise.reject(response)
    }
    Notify({ type: 'danger', message: "请求失败" });
    return true
  }
)

export default Http
