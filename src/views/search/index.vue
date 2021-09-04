<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-08-24 19:44:28
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-04 17:44:23
-->
<template>
  <div class="seartch-list" v-loading="listLoading">
    <div class="return">
      <span @click="returnHome" class="font-note">⇠返回</span>
    </div>
    <WbItemCard @click="toDetail(item)" v-for="item in historyDataListAll" :key="item.id" :listObj="item" />
    <span class="font-note">到底了哦开学φ(*￣0￣)</span>
  </div>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { mainLoading } from '@/utils'
import { IArticleEntity } from '@/utils/articleEntity'
import { bus, Bus } from '@/utils/mitt'
import { getSearchByName } from '@/api'
export default {
  setup() {
    const router = useRouter()
    let historyDataListAll = reactive<Array<IArticleEntity>>([])
    // 跳转到详细界面
    function toDetail(item: any) {
      router.push({ path: '/detail', query: { id: item.id } })
    }
    onMounted(() => {
      // mitt全局事件-搜索
      bus.on(Bus.bus_search, (value: any) => {
        getListByName(value)
      })
    })
    function getListByName(value: string) {
      const loading = mainLoading()
      getSearchByName({ kw: value })
        .then((res) => {
          historyDataListAll.length = 0
          historyDataListAll.push(...res.data)
          loading.close()
        })
        .catch((e) => {
          console.log(e)
          loading.close()
        })
    }
    function returnHome() {
      router.go(-1)
    }
    return { historyDataListAll, toDetail, returnHome }
  },

  mounted() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
.seartch-list {
  min-height: 500px;
  text-align: center;
  .return {
    text-align: left;
    .font-note {
      cursor: pointer;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
