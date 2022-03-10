<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import BottomBar from '@components/BottomBar/BottomBar.vue';
</script>

<template>
  <router-view></router-view>
  <BottomBar />
</template>

<style>
body {
  background-color: #f6f6f6;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
}
:root {
  --van-primary-color: #66b4c6;
}
</style>
