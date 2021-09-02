<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-08-27 16:00:10
 * @LastEditors: tommy
 * @LastEditTime: 2021-08-28 20:07:43
-->
<template>
  <el-image :src="src" :fit="fit">
    <template #placeholder>
      <div class="image-slot">
        <img src="~@/assets/logo.png" alt="加载中..." />
      </div>
    </template>
    <template #error>
      <div class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </template>
  </el-image>
</template>
<script>
export default {
  name: 'Wbimage',
  props: {
    src: {
      type: String,
      default: ''
    },
    fit: {
      type: String,
      default: 'cover'
    }
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
/deep/ .el-image__error,
.el-image {
  height: 100%;
  width: 100%;
  border-radius: 10px;
  transition: 0.6;
  &:hover {
    cursor: pointer;
    border-radius: 0px;
  }
}
.image-slot {
  background: #f5f7fa;
  color: #999;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
}
</style>
