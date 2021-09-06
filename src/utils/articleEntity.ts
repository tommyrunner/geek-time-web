/*
 * @Descripttion:
 * @version:
 * @Author: tommy
 * @Date: 2021-09-03 09:08:20
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-06 14:02:07
 */
/**
 * 文章接口
 */
export const articleLocalStorage: string = 'geekTime-Article'
export interface IArticleEntity {
  author_avatar: string
  author_info: string
  author_intro: string
  author_name: string
  column_unit: string
  column_update_bgcolor: string
  column_update_catalog_pic_url: string
  column_update_frequency: string
  cover_1: string
  cover_2: string
  id: number
  intro: string
  intro_html: string
  subtitle: string
  time: number
  historyTime: number
  nowMenuId: number
  nowPro: number
  title: string
}
export class ArticleEntity {
  articles: Array<IArticleEntity> = []
  //实例
  constructor() {
    // 获取本地数据
    const articleString = localStorage.getItem(articleLocalStorage)
    // 存在
    if (articleString) {
      this.articles = JSON.parse(articleString) as Array<IArticleEntity>
    } else {
      //存入一个空数组
      localStorage.setItem(articleLocalStorage, '[]')
      this.articles = []
    }
  }
  // 查询
  getArticles(page: number, pageSize: number) {
    // 先排序-倒
    this.articles = this.articles.reverse()
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (page == -1 || pageSize == -1) return res(this.articles)
        return res(this.articles.slice(page * pageSize, page * pageSize + pageSize))
      }, 400)
    })
  }
  // 根据id查询
  getArticlesById(articleId: number) {
    return this.articles.find((item) => item.id === articleId)
  }
  // 添加
  add(article: IArticleEntity) {
    return new Promise((res, rej) => {
      let newList: Array<IArticleEntity> = []
      newList = this.articles.filter((item) => item.id !== article.id)
      newList.push({ ...article })
      // 储存
      localStorage.setItem(articleLocalStorage, JSON.stringify(newList))
      res(this.articles)
    })
  }
  // 删除
  remove(article: IArticleEntity) {
    return new Promise((res, rej) => {
      if (this.articles.some((item) => item.id !== article.id)) {
        rej('不存在!')
      } else {
        this.articles = this.articles.filter((item) => item.id !== article.id)
        // 储存
        localStorage.setItem(articleLocalStorage, JSON.stringify(this.articles))
      }
    })
  }
  // 清空
  clear() {
    return new Promise((res, rej) => {
      // 储存
      setTimeout(() => {
        localStorage.setItem(articleLocalStorage, '[]')
        res('清空成功')
      }, 400)
    })
  }
  // 更新进度
  update(articleId: number, nowMenuId?: number, nowPro?: number) {
    return new Promise((res, rej) => {
      // 储存
      setTimeout(() => {
        let articleObj = this.articles.find((item) => item.id === articleId) as IArticleEntity
        if (nowMenuId && nowMenuId != 0) articleObj.nowMenuId = nowMenuId
        if (nowPro && nowPro != 0) articleObj.nowPro = nowPro
        // 储存
        localStorage.setItem(articleLocalStorage, JSON.stringify(this.articles))
      }, 400)
    })
  }
}
