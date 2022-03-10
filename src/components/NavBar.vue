<template>
  <van-nav-bar v-if="!props.isBack" :title="props.title" />
  <van-nav-bar v-else :title="props.title" left-text="返回" left-arrow @click-left="onClickLeft" />
</template>
<script setup lang="ts">
import { NavBar as vanNavBar } from 'vant';
import router from '../router';

const props = defineProps({
  title: String,
  isBack: {
    type: Boolean,
    default: false,
  }
})


const onClickLeft = () => {
  router.go(-1)
}

</script>