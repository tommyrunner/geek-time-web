<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-08-27 10:35:05
 * @LastEditors: tommy
 * @LastEditTime: 2021-08-27 18:01:23
-->
<template>
  <div class="item-content">
    <WbImage :src="listObj.cover_2" />
    <div class="text">
      <span class="font-title">{{ listObj.title }}</span>
      <span class="font-note">
        {{ listObj.intro }}
      </span>
      <div class="font-note msg">
        <span>时间: {{ fromDate(listObj.time) }}</span>
        <span>作者:xxxx</span>
        <span>xxx</span>
      </div>
      <div class="line-h"></div>
    </div>
  </div>
</template>
<script>
import { fromDate } from '@/utils'
export default {
  name: 'Wbitemcard',
  props: {
    listObj: {
      type: Object,
      defalut: () => {}
    }
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {
    fromDate(time) {
      return fromDate(time * 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.item-content {
  display: flex;
  height: 120px;
  width: 100%;
  margin-bottom: 18px;
  /deep/ .el-image__error,
  .el-image {
    width: 220px;
    transition: 0.6s;
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
    margin-left: 18px;
    overflow: hidden;
    .font-title:hover {
      cursor: pointer;
      text-decoration: underline;
    }
    .msg {
      display: flex;
      span {
        margin-right: 18px;
      }
    }
  }
}
</style>
