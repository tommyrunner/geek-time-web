/*
 * @Descripttion:
 * @version:
 * @Author: tommy
 * @Date: 2021-08-24 17:39:44
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-02 15:55:20
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@/styles/element-plus/theme/index.css'
// 全局scss
import '@/styles/style.scss'
import App from './App.vue'
import router from './router'
import store from './store'
// 富文本代码高亮插件
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' //样式
const app = createApp(App)
// 自定义一个命令
app.directive('highlight', function(el: any) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block: any) => {
    hljs.highlightBlock(block)
  })
})
//自动化注册全局组件
const requireComponent = require.context('./components', true, /\.vue$/)
requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 剥去文件名开头的 `./` 和`.vue`结尾的扩展名
  const componentName = fileName.replace(/^\.\//, '').replace(/\.vue$/, '')
  // 全局注册组件
  app.component(componentName.replace(/\//, '-'), componentConfig.default || componentConfig)
})

app
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
