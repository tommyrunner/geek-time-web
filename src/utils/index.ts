/*
 * @Descripttion:
 * @version:
 * @Author: tommy
 * @Date: 2021-08-27 14:24:31
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-02 16:29:44
 */
import { ElLoading } from 'element-plus'
import { Base64 } from 'js-base64'
// element-plus 全局加载
export const mainLoading = () =>
  ElLoading.service({
    lock: true,
    text: '飞速加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
/**
 * 统一格式化日期
 * @param time 时间戳
 * @returns 字符串
 */
export function fromDate(time: number) {
  let date = new Date(time)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}`
}
/**
 * 格式化base64
 * @param base64 base64编码
 * @returns 返回解码字符串
 */
export function fromBase64(base64: string) {
  return new Promise((ress: any, rej: any) => {
    setTimeout(() => {
      try {
        ress(Base64.decode(base64))
      } catch (e) {
        rej(e)
      }
    }, 400)
  })
}
