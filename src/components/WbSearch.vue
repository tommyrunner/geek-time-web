<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-08-26 11:24:10
 * @LastEditors: tommy
 * @LastEditTime: 2021-08-26 13:39:27
-->
<template>
  <el-input :class="['search', search ? '' : 'search-value']" placeholder="搜索" size="mini" prefix-icon="el-icon-search" v-model="search">
  </el-input>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'WbSearch',

  setup() {
    let search = ref('')
    return { search }
  },

  mounted() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
.search {
  width: 200px;
}
.search-value {
  transition: 0.6s;
  width: 86px;
  &:hover {
    width: 200px;
  }
}
</style>
