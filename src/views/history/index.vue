<!--
 * @Descripttion: 
 * @version: 
 * @Author: tommy
 * @Date: 2021-08-24 19:44:28
 * @LastEditors: tommy
 * @LastEditTime: 2021-08-29 21:50:20
-->
<template>
  <div>
    路由
    <WbItemCard v-for="item in nowDataListAll" :key="item.id" :listObj="item" />
  </div>
</template>
<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    let nowDataListAll = reactive<Array<any>>([])
    return { nowDataListAll }
  },

  mounted() {},

  methods: {}
}
</script>
