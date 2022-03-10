<template>
  <NavBar title="我的信息" />
  <div class="block">
    <h2 class="block-title">用户信息</h2>
    <van-cell-group inset>
      <van-cell v-if="isLogin" title="用户名" :value="userState.state.username" />
      <van-cell v-if="isLogin" title="昵称" :value="userState.state.nickname" />
      <van-cell v-else title="用户名" value="未登录" @click="showLoginPopup" is-link />
      <van-cell v-if="isLogin" title="密码" value="修改密码" @click="showChangePasswordPopup" is-link />
    </van-cell-group>
  </div>
  <div class="block" v-if="isLogin">
    <h2 class="block-title">订单信息</h2>
    <van-cell-group inset>
      <van-cell title="订单" value="查看订单" is-link @click="toMyOrder" />
    </van-cell-group>
  </div>
  <div class="block" v-if="isLogin">
    <h2 class="block-title">账号操作</h2>
    <van-cell-group style="background: unset" inset>
      <van-button round block type="danger" native-type="submit" @click="doLogout">退出登录</van-button>
    </van-cell-group>
  </div>
  <van-popup class="login-popup" v-model:show="loginPopup" round>
    <LoginPage v-model:show="loginPopup" @login-success="loginSuccess" />
  </van-popup>
  <van-popup class="login-popup" v-model:show="changePasswordPopup" round>
    <ChangePasswordPage v-model:show="changePasswordPopup" @cp-success="cpSuccess" />
  </van-popup>
</template>
<script setup lang="ts">
import NavBar from '@components/NavBar.vue';
import {
  Cell as vanCell,
  CellGroup as vanCellGroup,
  Popup as vanPopup,
  Dialog,
  Toast
} from 'vant';
import '@assets/css/block.css'
import { useUserState } from '../../store/user';
import { onMounted } from '@vue/runtime-core';
import { ref } from 'vue';
import router from '../../router';
import LoginPage from './components/login.vue'
import ChangePasswordPage from './components/changePassword.vue'
const userState = useUserState
const isLogin = ref(false)

const checkLogin = () => {
  userState.dispatch("checkIsLogin").then((res) => {
    isLogin.value = res
  })
}

onMounted(() => {
  checkLogin()
})

const loginPopup = ref(false)
const showLoginPopup = () => {
  loginPopup.value = true
}

const loginSuccess = () => {
  checkLogin()
  loginPopup.value = false
}

const doLogout = () => {
  Dialog.confirm({
    title: '退出确认',
    message: '是否要退出登录',
  })
    .then(() => {
      userState.dispatch('setLogout')
      Toast.success('登出成功！');
      isLogin.value = false
    })
}
const changePasswordPopup = ref(false)
const showChangePasswordPopup = () => {
  changePasswordPopup.value = true
}

const cpSuccess = () => {
  changePasswordPopup.value = false
}

const toMyOrder = () => {
  router.push('/user/order')
}

</script>
<style>
.login-popup {
  width: 80%;
}
</style>