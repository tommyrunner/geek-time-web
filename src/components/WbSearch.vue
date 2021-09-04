<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-08-26 11:24:10
 * @LastEditors: tommy
 * @LastEditTime: 2021-09-03 16:25:11
-->
<template>
  <el-input
    @change="onSearch"
    :class="['search', search ? '' : 'search-value']"
    placeholder="搜索"
    size="mini"
    prefix-icon="el-icon-search"
    v-model="search"
  >
  </el-input>
</template>
<script lang="ts">
import { ref } from 'vue'
export default {
  name: 'WbSearch',

  setup(props: any, context: any) {
    let search = ref('')
    function onSearch() {
      context.emit('onSearch', search.value)
    }
    return { search, onSearch }
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
