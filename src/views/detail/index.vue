<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-09-01 15:33:41
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-06 13:50:48
-->
<template>
  <div class="detail-content">
    <div class="right">
      <div class="top">
        <WbImage class="wb_image" :src="articleObj.cover_1" />
        <div class="msg">
          <span class="font-title">{{ articleObj.title }}</span>
          <span>作者:{{ articleObj.author_name }}</span>
          <span>{{ articleObj.subtitle }}</span>
          <span>{{ fromDate(articleObj.time * 1000) }}</span>
        </div>
      </div>
      <div class="menu">
        <span>目录:{{ articleObj.column_unit }}</span>
        <el-tree
          ref="menuTree"
          :highlight-current="true"
          :default-expanded-keys="defaultTrees"
          node-key="aid"
          :data="menuList"
          :props="menuListProps"
          @node-click="clickMenuList"
        ></el-tree>
      </div>
    </div>
    <div class="left" ref="textHtml">
      <WbMarkdown v-loading="htmlLoading" ref="textHtml" :articleInfoObj="articleInfoObj" v-if="articleInfoObj.content" />
    </div>
  </div>
</template>
<script lang="ts">
import { getArticleInfo, getArticleMenuInfoList, getArticleMenuList, getArticleById } from '@/api'
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fromDate, fromBase64, mainLoading } from '@/utils'
import { ArticleEntity, IArticleEntity } from '@/utils/articleEntity'
import WbMarkdown from '@/components/WbMarkdown.vue'
import { ElMessage } from 'element-plus'
import { WindowListening } from '@/views/layout'
import { bus, Bus } from '@/utils/mitt'
export default {
  components: { WbMarkdown },
  setup() {
    const route = useRoute()
    const articleId: number = parseInt(route.query.id as string)
    const menuTree = ref<any>(null)
    const textHtml = ref<any>(null)
    let htmlLoading = ref(false)
    let menuList = reactive<Array<any>>([])
    let articleObj = reactive<any>({})
    let articleInfoObj = reactive<any>({})
    let defaultTrees = reactive<Array<number>>([])
    let windowListening: any = null
    let changeTime = ref(0)
    const menuListProps = {
      children: 'children',
      label: 'title'
    }
    onMounted(() => {
      // 获取目录
      const loading = mainLoading()
      getArticleInfo({ id: articleId })
        .then((res) => {
          articleObj = Object.assign(articleObj, res.data)
          // 获取目录
          return getArticleMenuInfoList({ id: articleId })
        })
        .then((res) => {
          menuList.push(...res.data)
          // 检查历史
          let articleStore = new ArticleEntity()
          const findArticleObj = articleStore.getArticlesById(articleObj.id) as IArticleEntity
          let nowMenuObj = null
          // 记录历史
          if (findArticleObj && findArticleObj.nowMenuId) {
            // 如果存在--打开历史
            nowMenuObj = findMenuChild(menuList, findArticleObj.nowMenuId)
            if (findArticleObj.nowPro) {
              //自动填充滚动进度
              const loading = mainLoading()
              ElMessage.warning('正在跳转到上次阅读位置...')
              windowListening.toScroll(0, findArticleObj.nowPro).then((res: any) => {
                loading.close()
              })
            }
          } else {
            //  记录事件
            articleObj.historyTime = parseInt(String(new Date().getTime() / 1000))
            articleStore.add(articleObj).catch((e) => {})
            nowMenuObj = menuList[0]['children'][0]
          }
          if (nowMenuObj.aid) {
            // 默认选择第一个
            clickMenuList(nowMenuObj)
            // 默认展开第一个
            defaultTrees.length = 0
            defaultTrees.push(nowMenuObj.aid)
          }
          loading.close()
        })
        .catch((e) => {
          console.log(e)
          loading.close()
        })
      // 滚动监听
      windowListening = new WindowListening(
        () => {},
        (): number => {
          let domHight = document.getElementsByClassName('left')[0].clientHeight - 700
          return domHight
        }
      )
      windowListening.start()
      bus.on(Bus.bus_windowListen, (value) => {
        // 记录滚动条
        savePro(value)
      })
    })
    // 记录滚动
    function savePro(value: any) {
      changeTime.value = new Date().getTime()
      // 定时器    过滤密集输入
      setTimeout(() => {
        if (new Date().getTime() - changeTime.value >= 1000) {
          // 记录历史
          let articleStore = new ArticleEntity()
          articleStore.update(articleObj.id, 0, value)
        }
      }, 1000)
    }
    // 循环获取列表中
    function findMenuChild(arr: any, menuId: number) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]['children'] && arr[i]['children'].length > 0) {
          const obj = arr[i].children.find((item: { aid: number }) => item.aid === menuId)
          if (obj) return obj
        }
      }
    }
    // 点击菜单
    function clickMenuList(e: any) {
      if (e.aid && e.aid !== articleInfoObj.aid) {
        htmlLoading.value = true
        getArticleById({ id: e.aid })
          .then((res: any) => {
            articleInfoObj = Object.assign(articleInfoObj, res)
            // 解码baset64
            //没解码前设置
            articleInfoObj.contentTo = '<h1 style="margin-top : 100px;">我找找...</h1>'
            return fromBase64(articleInfoObj.content)
          })
          .then((res) => {
            nextTick(() => {
              //获取解码
              articleInfoObj.contentTo = res
              // 重新加载动画-html进入
              menuChange()
              // 高亮
              menuTree.value.setCurrentKey(e.aid)
              htmlLoading.value = false
              // 历史存储
              // 记录历史
              let articleStore = new ArticleEntity()
              articleStore.update(articleObj.id, e.aid)
            })
          })
          .catch((e) => {
            console.log(e)
            ElMessage.error(String(e))
            htmlLoading.value = false
          })
      }
    }
    // 动画
    function menuChange() {
      textHtml.value.classList.add('html-animation')
      setTimeout(() => {
        textHtml.value.classList.remove('html-animation')
      }, 400)
    }
    onUnmounted(() => {
      windowListening.stop()
    })
    return {
      menuList,
      menuListProps,
      clickMenuList,
      articleObj,
      articleInfoObj,
      defaultTrees,
      menuTree,
      textHtml,
      htmlLoading
    }
  },
  methods: {
    fromDate(time: number) {
      return fromDate(time)
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-content {
  font-size: 14px;
  width: 100%;
  display: flex;
  // 适配手机
  @media (max-width: 750px) {
    flex-direction: column;
  }
  .left {
    width: 100%;
    min-height: 50%;
    text-align: center;
    overflow: auto;
    padding: 18px;
  }
  .html-animation {
    animation: showHtml 0.6s;
  }
  .right {
    position: absolute;
    // 适配手机
    @media (max-width: 750px) {
      position: static;
    }
    width: 20%;
    // 适配手机
    @media (max-width: 750px) {
      width: 100%;
    }
    right: 10px;
    animation: showRight 0.6s;
    .top {
      margin-bottom: 18px;
      height: 130px;
      background: $color-note-bg;
      display: flex;
      .wb_image {
        width: 40%;
      }
      .msg {
        width: 50%;
        font-size: 12px;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .menu {
      background: $color-note-bg;
      padding: 10px;
      .el-tree {
        margin-top: 10px;
        background: $color-note-bg;
        /deep/.el-tree-node__content {
          border-radius: 10px;
        }
      }
      /deep/.el-tree-node__label {
        white-space: nowrap; /*不允许换行*/
        overflow: hidden; /*超出隐藏*/
        text-overflow: ellipsis; /*文本超出三点代替*/
      }
    }
  }
}
@keyframes showRight {
  0% {
    opacity: 0;
    transform: translateY(20%);
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}
@keyframes showHtml {
  0% {
    opacity: 0;
    transform: translateX(-10%);
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}
</style>
