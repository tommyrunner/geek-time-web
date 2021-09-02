<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-09-01 15:33:41
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-02 16:33:19
-->
<template>
  <div class="detail-content">
    <div class="left" ref="textHtml">
      <WbMarkdown v-loading="htmlLoading" ref="textHtml" class="left" :articleInfoObj="articleInfoObj" v-if="articleInfoObj.content" />
    </div>
    <div class="right">
      <div class="top">
        <WbImage class="wb_image" :src="articleObj.cover_1" />
        <div class="msg">
          <span class="font-title">{{ articleObj.title }}</span>
          <span>作者:{{ articleObj.author_name }}</span>
          <span>{{ articleObj.subtitle }}</span>
          <span>{{ fromDate(articleObj.time) }}</span>
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
  </div>
</template>
<script lang="ts">
import { getArticleInfo, getArticleMenuInfoList, getArticleById } from '@/api'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fromDate, fromBase64, mainLoading } from '@/utils'
import WbMarkdown from '@/components/WbMarkdown.vue'
import { ElMessage } from 'element-plus'
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
          // 默认选择第一个
          clickMenuList(menuList[0]['children'][0])
          // 默认展开第一个
          defaultTrees.length = 0
          defaultTrees.push(menuList[0]['children'][0].aid)
          loading.close()
        })
        .catch((e) => {
          console.log(e)
          loading.close()
        })
    })
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
  .left {
    width: 100%;
    min-height: 50%;
    text-align: center;
    padding: 18px;
  }
  .html-animation {
    animation: showHtml 0.6s;
  }
  .right {
    position: absolute;
    width: 20%;
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
