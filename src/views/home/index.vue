<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-08-24 19:44:28
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-05 13:50:59
-->
<template>
  <div class="top">
    <div class="top-card">
      <el-carousel @click="toDetail" ref="card" @change="cardChange($event, item)">
        <el-carousel-item v-for="item in newDataListCard" :key="item">
          <div class="card-img" @click="toDetail(item)">
            <span class="title">{{ item.title }}</span>
            <WbImage :src="item.cover_2" />
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="card-text" ref="cardText" v-if="newDataListCard[cardIndex]">
        <span class="font-title" :title="newDataListCard[cardIndex].title">{{ newDataListCard[cardIndex].title }}</span>
        <span class="font-note">{{ newDataListCard[cardIndex].intro }}</span>
      </div>
    </div>
    <div class="top-list">
      <div class="top-list-item" v-for="item in newDataListCardList" :key="item">
        <span @click="toDetail(item)" class="font-title" :title="item.title">{{ item.title }}</span>
        <span class="font-note">{{ item.intro }}</span>
      </div>
    </div>
  </div>
  <div class="list" v-loading="listLoading">
    <WbItemCard :imgFit="'cover'" @itemClick="toDetail(item)" v-for="item in nowDataListAll" :key="item.id" :listObj="item" />
    <span v-if="listLoading">加载中....</span>
  </div>
</template>
<script lang="ts">
import { getNewList } from '@/api/index'
import { mainLoading } from '@/utils'
import { reactive, onMounted, onUnmounted, ref } from 'vue'
import { randDate, randNow } from './home'
import { useRouter } from 'vue-router'
import { WindowListening } from '@/views/layout'
export default {
  setup(props: any) {
    // ref获取组件
    const router = useRouter()
    let card = ref<any>(null)
    let cardText = ref<any>(null)
    const newDataListCard: Array<any> = reactive<Array<any>>([])
    const newDataListCardList: Array<any> = reactive<Array<any>>([])
    const nowDataListAll: Array<any> = reactive<Array<any>>([])
    let listLoading = ref<any>(false)
    let cardIndex = ref<number>(0)
    let windowListening: any = null
    // 计算一个随机数-每天不一样
    const pageObj = reactive({ page: 1 })
    onMounted(() => {
      const loading = mainLoading()
      //获取头部数据
      getNewList({ rand: randDate, page: 1 })
        .then((res) => {
          res.data.forEach((item: Object, index: number) => {
            if (index < 4) newDataListCard.push(item)
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
      getListAll().then((res) => {
        windowListening = new WindowListening(getListAll, (): number => {
          let domHight = document.getElementsByClassName('top')[0].clientHeight + document.getElementsByClassName('list')[0].clientHeight - 700
          return domHight
        })
        windowListening.start()
      })
    })
    // 跳转到详细界面
    function toDetail(item: any) {
      if (item.id) router.push({ path: '/detail', query: { id: item.id } })
    }
    function getListAll() {
      return new Promise((resolve, rejest) => {
        listLoading.value = true
        getNewList({ rand: randNow, page: pageObj.page })
          .then((res) => {
            // nowDataListAll.length = 0
            nowDataListAll.push(...res.data)
            listLoading.value = false
            resolve(res)
          })
          .catch((e) => {
            listLoading.value = false
            console.log(e)
            rejest(e)
          })
      })
    }
    function cardChange(index: number) {
      cardIndex.value = index
      cardText.value.classList.add('card-animation')
      setTimeout(() => {
        cardText.value.classList.remove('card-animation')
      }, 400)
    }
    // window.addEventListener('scroll', testScroll) //监听页面滚动
    // let isSr = true
    // let isDowSr = false
    // let nowScroll = 0
    // function testScroll() {
    //   let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    //   let domHight = document.getElementsByClassName('top')[0].clientHeight + document.getElementsByClassName('list')[0].clientHeight - 800
    //   // 是否是下滚动
    //   if (scrollTop > nowScroll) {
    //     nowScroll = scrollTop //更新-下滚动;
    //     isDowSr = true
    //   }
    //   if (scrollTop < nowScroll) {
    //     nowScroll = scrollTop //更新-上滚动;
    //     isDowSr = false
    //   }
    //   if (domHight < scrollTop && isSr && isDowSr) {
    //     isSr = false
    //     getListAll()
    //       .then((res) => {
    //         isSr = true
    //       })
    //       .catch((e) => {
    //         isSr = true
    //       })
    //   }
    // }
    // 界面注销回到
    onUnmounted(() => {
      // 注销滚动监听
      windowListening.stop()
    })
    return {
      // 轮播图数据
      newDataListCard,
      // 轮播图列表数据
      newDataListCardList,
      // 推荐列表数据
      nowDataListAll,
      // 轮播组件
      card,
      cardText,
      // 列表加载
      listLoading,
      // 切换轮播图
      cardChange,
      // 轮播图坐标
      cardIndex,
      // 跳转到详细
      toDetail
    }
  }
}
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 440px;
  margin-bottom: 18px;
  display: flex;
  // 适配手机
  @media (max-width: 750px) {
    flex-direction: column;
    height: auto;
  }
  background: $color-note-bg;
  border-radius: 10px;
  padding: 18px;
  .top-card {
    width: 60%;
    // 适配手机
    @media (max-width: 750px) {
      width: 100%;
      margin-bottom: 18px;
    }
    height: 100%;
    padding-top: 18px;
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
    .card-animation {
      animation: showList 1s;
    }
    .card-text {
      margin-top: 18px;
      .font-note {
        margin-top: 18px;
      }
    }
  }
  .top-list {
    flex: 1;
    padding: 4px 18px;
    overflow: hidden;
    .top-list-item {
      margin-bottom: 22px;
      display: flex;
      flex-direction: column;
      .font-title {
        margin-bottom: 12px;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
}
.list {
  width: 100%;
  text-align: center;
}
@keyframes showList {
  0% {
    opacity: 0;
    margin-left: 10px;
  }
  50% {
    opacity: 0.5;
    margin-left: 5px;
  }
  100% {
    opacity: 1;
    margin-left: 0px;
  }
}
</style>
