<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-08-24 19:44:28
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-06 14:59:50
-->
<template>
  <div class="history-list" v-loading="listLoading">
    <div class="return">
      <span @click="returnHome" class="font-note">⇠返回</span>
      <span @click="clearAll" class="font-note">清空历史</span>
    </div>
    <WbItemCard class="wbItemCard" @click="toDetail(item)" v-for="item in historyDataListAll" :key="item.id" :listObj="item" />
    <span v-if="isBottom" class="font-note">到底了哦开学φ(*￣0￣)</span>
  </div>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, reactive, ref, toRef } from 'vue'
import { mainLoading } from '@/utils'
import { ArticleEntity, IArticleEntity } from '@/utils/articleEntity'
import { WindowListening } from '../layout'
import { ElMessage } from 'element-plus'
export default {
  setup() {
    let pageObj = { page: 0, pageSize: 5 }
    let refPageObj = toRef(pageObj, 'page')
    let isBottom = ref(false)
    let articleStore = new ArticleEntity()
    const router = useRouter()
    let historyDataListAll = reactive<Array<IArticleEntity>>([])
    let windowListening: any = null
    // 跳转到详细界面
    function toDetail(item: any) {
      router.push({ path: '/detail', query: { id: item.id } })
    }
    onMounted(() => {
      getList().then((res) => {
        windowListening = new WindowListening(getList, (): number => {
          let domHight = document.getElementsByClassName('history-list')[0].clientHeight - 700
          return domHight
        })
        windowListening.start()
      })
    })
    function getList() {
      return new Promise((resolve, rejest) => {
        if (!isBottom.value) {
          const loading = mainLoading()
          articleStore.getArticles(refPageObj.value, pageObj.pageSize).then((res: any) => {
            historyDataListAll.push(...res)
            refPageObj.value++
            loading.close()
            if (!res.length || res.length <= 0) isBottom.value = true
            resolve(res)
          })
        }
      })
    }
    // 清空
    function clearAll() {
      const loading = mainLoading()
      articleStore.clear().then((res) => {
        historyDataListAll.length = 0
        loading.close()
        ElMessage.success('清空成功!')
      })
    }
    // 返回主页
    function returnHome() {
      router.go(-1)
    }
    onUnmounted(() => {
      windowListening.stop()
    })
    return { historyDataListAll, toDetail, isBottom, clearAll, returnHome }
  },

  mounted() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
.history-list {
  min-height: 500px;
  text-align: center;
  .return {
    display: flex;
    justify-content: space-between;
    &:hover {
      cursor: pointer;
    }
  }
  .wbItemCard {
    // 适配手机
    @media (max-width: 750px) {
      margin-top: 58px;
    }
  }
}
</style>
