<template>
  <van-tabbar v-model="active" route :z-index="999" placeholder>
    <van-tabbar-item
      v-for="item in BottomBarList.list"
      :name="item.name"
      :icon="item.icon"
      :to="item.to"
    >{{ item.text }}</van-tabbar-item>
    <!-- <van-tabbar-item name="home" icon="calendar-o">标签</van-tabbar-item>
    <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
    <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
    <van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item>-->
  </van-tabbar>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Tabbar as vanTabbar, TabbarItem as vanTabbarItem, } from 'vant';
import { BottomBarList } from './BottomBar'
const active = ref(BottomBarList.default);

</script>