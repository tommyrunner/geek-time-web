/*
 * @Descripttion:
 * @version:
 * @Author: tommy
 * @Date: 2021-09-04 17:19:01
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-06 11:42:39
 */
import mitt from 'mitt'
export enum Bus {
  bus_search = 'geek-searchBus',
  bus_windowListen = 'geek-windowListen'
}
export const bus = mitt()
