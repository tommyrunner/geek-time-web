<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-08-24 19:44:28
 * @LastEditors: tommy
 * @LastEditTime: 2021-08-27 17:55:00
-->
<template>
  <div class="top">
    <div class="top-card">
      <el-carousel ref="card">
        <el-carousel-item v-for="item in newDataListCard" :key="item">
          <div class="card-img">
            <span class="title">{{ item.title }}</span>
            <WbImage :src="item.cover_2" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="top-list">
      <div class="top-list-item" v-for="item in newDataListCardList" :key="item">
        <span class="font-title" @click="fff" :title="item.title">{{ item.title }}</span>
        <span class="font-note">{{ item.intro }}</span>
      </div>
    </div>
  </div>
  <div class="list" v-loading="listLoading">
    <WbItemCard v-for="item in nowDataListAll" :key="item.id" :listObj="item" />
  </div>
</template>
<script lang="ts">
import { getNewList } from '@/api/index'
import { AllLoading } from '@/utils'
import { reactive, onMounted, ref } from 'vue'
import WbImage from '@/components/WbImage.vue'
import func from 'vue-editor-bridge'
export default {
  components: { WbImage },
  setup() {
    // ref获取组件
    let card = ref<any>(null)
    const newDataListCard: Array<any> = reactive<Array<any>>([])
    const newDataListCardList: Array<any> = reactive<Array<any>>([])
    const nowDataListAll: Array<any> = reactive<Array<any>>([])
    let listLoading = ref<any>(false)
    // 计算一个随机数-每天不一样
    const randDate = parseInt(String(17 - new Date().getDate() / 2))
    const randNow = parseInt(String(Math.random() * 17)) + 1
    const pageObj = reactive({ page: 1 })
    onMounted(() => {
      const loading = AllLoading()
      //获取头部数据
      getNewList({ rand: randDate, page: 1 })
        .then((res) => {
          res.data.forEach((item: Object, index: number) => {
            if (index <= 4) newDataListCard.push(item)
            else newDataListCardList.push(item)
          })
          // 获取数据后初始化轮播图为第一页
          card.value.setActiveItem(0)
          loading.close()
        })
        .catch((e) => {
          console.log(e)
          loading.close()
        })
      // 获取列表
      getListAll()
    })
    function getListAll() {
      listLoading = true
      getNewList({ rand: randNow, page: pageObj.page })
        .then((res) => {
          nowDataListAll.length = 0
          nowDataListAll.push(...res.data)
          listLoading = false
        })
        .catch((e) => {
          listLoading = false
          console.log(e)
        })
    }
    return {
      // 轮播图数据
      newDataListCard,
      // 轮播图列表数据
      newDataListCardList,
      // 推荐列表数据
      nowDataListAll,
      // 轮播组件
      card,
      // 列表加载
      listLoading
    }
  }
}
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 300px;
  margin-bottom: 18px;
  display: flex;
  .top-card {
    width: 60%;
    height: 100%;
    .el-carousel {
      /deep/.el-carousel__button {
        background: $color-theme;
      }
    }
    .card-img {
      height: 100%;
      width: 100%;
      position: relative;
      .title {
        color: white;
        position: absolute;
        top: 5%;
        left: 50%;
        transform: translateX(-50%);
        font-weight: bold;
        z-index: 100;
      }
    }
  }
  .top-list {
    flex: 1;
    padding: 4px 18px;
    overflow: hidden;
    .top-list-item {
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      line-height: 24px;
      .font-title:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
.list {
  width: 100%;
}
</style>
