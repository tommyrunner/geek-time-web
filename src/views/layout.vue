<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-08-24 17:39:44
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-04 17:30:01
-->
<template>
  <div class="content">
    <div class="icon">
      <img src="~@/assets/logo.png" />
      <span>GeekTime</span>
    </div>
    <div class="menu">
      <WbSearch @onSearch="onSearch" />
      <span v-for="item in routers" :class="[navPath === item.path ? 'span-on' : '']" :key="item.path" @click="navTo(item.path)">{{
        item.title
      }}</span>
    </div>
  </div>
  <div class="text">
    <div class="right" v-if="routers.some((item) => item.path === navPath)">
      <a href="/app.apk" download="app.apk" class="dev">
        <span>去下载app</span>
        <img src="~@/assets/img/app_dow.png" alt="" />
      </a>
    </div>
    <div class="left">
      <router-view ref="routerView"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { bus, Bus } from '@/utils/mitt'
interface ILayoutRouters {
  path: String
  title: String
}
export default {
  setup() {
    const router = useRouter()
    const navPath = ref<string>(router.currentRoute.value.fullPath)
    let routers: Array<ILayoutRouters> = [
      { path: '/home', title: '主页' },
      { path: '/history', title: '历史' }
    ]
    const routerView = ref()
    // 点击跳转路由
    function navTo(path: string) {
      router.push({ path: path })
    }
    // 监听路由
    onBeforeRouteUpdate((to) => {
      navPath.value = to.path
    })
    // 搜索
    function onSearch(value: string) {
      if (router.currentRoute.value.path === '/search') {
        bus.emit(Bus.bus_search, value)
      } else router.push({ path: '/search', query: { value } })
    }
    return { routers, navTo, navPath, date: new Date(), routerView, onSearch }
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  color: #222226;
  background: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(83, 83, 83, 0.253);
  box-shadow: 0 2px 4px 0 rgba(83, 83, 83, 0.226);
  width: 100%;
  position: fixed;
  z-index: 100;
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    img {
      width: 48px;
      height: 48px;
    }
  }

  .menu {
    display: flex;
    align-items: center;
    span {
      margin-left: 24px;
      &:hover {
        color: $color-theme;
        cursor: pointer;
      }
    }
    .span-on {
      color: $color-theme;
      font-weight: bold;
    }
  }
}
.text {
  padding-top: 64px;
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  // 适配手机
  @media (max-width: 750px) {
    flex-direction: column;
  }
  .left {
    width: 80%;
    padding: 1%;
    @media (max-width: 750px) {
      width: 100%;
    }
  }
  .right {
    width: 18%;
    padding: 1%;
    // 适配手机
    @media (max-width: 750px) {
      width: 100%;
      position: static;
    }
    position: fixed;
    right: 1%;
    .date {
      width: 100%;
      height: 200px;
    }
    .dev {
      margin-top: 18px;
      width: 100%;
      height: 280px;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      align-items: center;
      &:hover {
        cursor: pointer;
      }
      img {
        width: 200px;
        height: 200px;
      }
      span {
        font-weight: bolder;
        color: black;
      }
    }
  }
}
</style>
