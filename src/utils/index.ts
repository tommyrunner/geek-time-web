/*
 * @Descripttion:
 * @version:
 * @Author: tommy
 * @Date: 2021-08-27 14:24:31
 * @LastEditors: tommy
 * @LastEditTime: 2021-08-27 18:01:17
 */
import { ElLoading } from 'element-plus'
export const AllLoading = () =>
  ElLoading.service({
    lock: true,
    text: '飞速加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })

export function fromDate(time: number) {
  let date = new Date(time)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}`
}
