<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-08-24 17:39:44
 * @LastEditors: tommy
 * @LastEditTime: 2021-08-27 12:01:29
-->
<template>
  <router-view />
</template>

<style lang="scss">
html,
body,
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
/* 滚动条 */
::-webkit-scrollbar {
  width: 5px; /* 纵向滚动条*/
  height: 5px; /* 横向滚动条 */
  background-color: #fff;
}

/*定义滚动条轨道 内阴影*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: #ccc;
}

/*定义滑块 内阴影*/
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: $color-theme;
  border-radius: 10px;
}
</style>
