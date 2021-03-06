/*
 * @Descripttion:
 * @version:
 * @Author: tommy
 * @Date: 2021-08-27 12:56:57
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-01 18:11:16
 */
import http from './http'

// 搜索
interface IApiSearchByName {
  kw: string
}
export const getSearchByName = (params: IApiSearchByName) => http.get('search', { params })
// 所有分类
export const getTypes = () => http('types')
// 分页查找
interface IApiGetTypesSize {
  type: number
  page: number
}
export const getTypesSize = (params: IApiGetTypesSize) => http('type', { params })
// 课程简介
interface IApiGetArticleInfo {
  id: number
}
export const getArticleInfo = (params: IApiGetArticleInfo) => http('info', { params })
// 课程文章列表
interface IApiGetArticleMenuList {
  id: number
}
export const getArticleMenuList = (params: IApiGetArticleMenuList) => http('article/list', { params })
export const getArticleMenuInfoList = (params: IApiGetArticleMenuList) => http('article/list1', { params })
// 文章ID查数据
interface IApiGetArticleById {
  id: number
}
export const getArticleById = (params: IApiGetArticleById) => http('article/data', { params })
// 文章分章节
interface IApiGetChapters {
  id: number
}
export const getChapters = (params: IApiGetChapters) => http('chapters', { params })
// 获取最新列表
interface IApigetNewList {
  rand: number
  page: number
}
export const getNewList = (params: IApigetNewList) => http('recommend', { params })
