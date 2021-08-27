<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-08-24 17:39:44
 * @LastEditors: tommy
 * @LastEditTime: 2021-08-27 09:17:43
-->
<template>
  <div class="content">
    <div class="icon">
      <img src="~@/assets/logo.png" />
      <span>GeekTime</span>
    </div>
    <div class="menu">
      <WbSearch />
      <span v-for="item in routers" :class="[navPath === item.path ? 'span-on' : '']" :key="item.path" @click="navTo(item.path)">{{
        item.title
      }}</span>
    </div>
  </div>
  <div class="text">
    <div class="left">
      <router-view></router-view>
    </div>
    <div class="right">
      <div class="date">日历</div>
      <div class="dev">广告</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const navPath = ref<string>(router.currentRoute.value.fullPath)
    let routers = [
      { path: '/home', title: '主页' },
      { path: '/history', title: '历史' }
    ]
    // 点击跳转路由
    function navTo(path: string) {
      router.push({ path: path })
    }
    // 监听路由
    onBeforeRouteUpdate((to) => {
      navPath.value = to.path
    })
    return { routers, navTo, navPath, date: new Date() }
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
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 2%;
  // 适配手机
  @media (max-width: 300px) {
    flex-direction: column;
  }
  .left {
    width: 80%;
    padding: 1%;
  }
  .right {
    width: 20%;
    padding: 1%;
    .date {
      width: 100%;
      height: 200px;
      border: 1px solid sienna;
    }
    .dev {
      margin-top: 18px;
      width: 100%;
      height: 20px;
      border: 1px solid sienna;
    }
  }
}
</style>
