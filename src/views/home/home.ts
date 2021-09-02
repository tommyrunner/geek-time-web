/*
 * @Descripttion:
 * @version:
 * @Author: tommy
 * @Date: 2021-09-01 15:15:52
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-01 15:15:53
 */
// 计算一个随机数-每天不一样
export const randDate = parseInt(String(17 - new Date().getDate() / 2))
export const randNow = parseInt(String(Math.random() * 17)) + 1
