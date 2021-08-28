/*
 * @Descripttion:
 * @version:
 * @Author: tommy
 * @Date: 2021-08-27 12:47:08
 * @LastEditors: tommy
 * @LastEditTime: 2021-08-27 14:21:48
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'

const headPath = 'http://mrack.cn:777/geektime/'

axios.defaults.timeout = 600000
axios.defaults.baseURL = headPath
const errorMsg = '服务器错误,获取失败!'
// 拦截器
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log('axios.interceptors.request:', error)
  }
)
// 拦截器
axios.interceptors.response.use(
  (config) => {
    if (config.data) return config.data
    else {
      ElMessage.error(errorMsg)
      return Promise.reject({ msg: errorMsg })
    }
  },
  (error) => {
    ElMessage.error(errorMsg)
    return Promise.reject({ msg: errorMsg })
  }
)
export default axios
