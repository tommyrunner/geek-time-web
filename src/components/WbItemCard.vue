<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-08-27 10:35:05
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-04 18:08:09
-->
<template>
  <div class="item-content">
    <WbImage :src="listObj.cover_2" :fit="'fill'" />
    <div class="text">
      <span class="font-title" @click="clickTitle()">{{ listObj.title }}</span>
      <span class="font-note">
        {{ listObj.intro }}
      </span>
      <div class="font-note msg">
        <span>作品时间: {{ fromDate(listObj.time) }}</span>
        <span>作者: {{ listObj.author_name }}</span>
        <span>{{ listObj.column_unit }}</span>
        <span v-if="listObj.historyTime">历史时间: {{ fromDate(listObj.historyTime) }}</span>
      </div>
      <div class="line-h"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { fromDate } from '@/utils'
export default {
  name: 'Wbitemcard',
  props: {
    listObj: {
      type: Object,
      defalut: () => {}
    }
  },
  setup(props: any, context: any) {
    function clickTitle() {
      context.emit('itemClick')
    }
    return { clickTitle }
  },
  mounted() {},

  methods: {
    fromDate(time: number) {
      return fromDate(time * 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.item-content {
  display: flex;
  width: 100%;
  height: 140px;
  @media (max-width: 750px) {
    height: 160px;
    align-items: center;
  }
  width: 100%;
  margin-bottom: 28px;
  /deep/ .el-image__error,
  .el-image {
    width: 220px;
    transition: 0.6s;
    // 适配手机
    @media (max-width: 750px) {
      width: 120px;
      height: 50%;
    }
  }
  .item-img {
    width: 220px;
    background: url('~@/assets/logo.png');
    background-size: 100%;
    &:hover {
      cursor: pointer;
    }
  }
  .text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    margin-left: 18px;
    overflow: hidden;
    .font-title {
      margin-bottom: 18px;
      width: 100%;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .msg {
      margin-top: 18px;
      display: flex;
      span {
        margin-right: 18px;
      }
    }
  }
}
</style>
