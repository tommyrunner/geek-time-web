/*
 * @Descripttion:
 * @version:
 * @Author: tommy
 * @Date: 2021-09-04 17:19:01
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-04 17:24:28
 */
import mitt from 'mitt'
export enum Bus {
  bus_search = 'geek-searchBus'
}
export const bus = mitt()
