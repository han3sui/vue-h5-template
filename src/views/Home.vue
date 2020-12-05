<template>
  <div class="home">
    <van-tabs>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
    <van-tabbar>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

import { Tabbar, TabbarItem, Tabs, Tab } from 'vant'
export default {
  name: 'Home',
  components: {
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem,
    VanTab: Tab,
    VanTabs: Tabs
  }
}
</script>
<style lang="scss" scoped>
.t1{
  width: 375px;
  height: 100px;
  background: #2c3e50;
  & span{
    color: #fff;
    font-size: 24px;
  }
}
</style>
