<template>
  <div class="container">
    <!-- <div class="head">
      <h2>谜语人剧本杀预约系统</h2>
    </div>-->
    <div class="from">
      <van-tabs v-model:active="active">
        <van-tab title="登录">
          <van-form @submit="onLoginSubmit">
            <van-cell-group>
              <van-field
                v-model="loginForm.username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <van-field
                v-model="loginForm.password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
            </van-cell-group>
            <mi-captcha
              style="margin-top: 10px;"
              width="90%"
              :height="35"
              themeColor="#66b4c6"
              :logo="logo"
              @success="onAuthCode"
            ></mi-captcha>
            <div style="margin: 16px;">
              <van-button round block type="primary" native-type="submit">登录</van-button>
            </div>
          </van-form>
        </van-tab>
        <van-tab title="注册">
          <van-form @submit="onRegisterSubmit">
            <van-cell-group>
              <van-field
                v-model="registerForm.username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <van-field
                v-model="registerForm.nickname"
                name="nickname"
                label="昵称"
                placeholder="昵称"
                :rules="[{ required: true, message: '请填写昵称' }]"
              />
              <van-field
                v-model="registerForm.password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
              <van-field
                v-model="cpassword"
                type="password"
                name="cpassword"
                label="确认密码"
                placeholder="确认密码"
                :rules="[{ required: true, validator: checkPassword, message: '确认密码要和密码一致' }]"
              />
            </van-cell-group>
            <div style="margin: 16px;">
              <van-button round block type="primary" native-type="submit">注册</van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Form as vanForm,
  Field as vanField,
  CellGroup as vanCellGroup,
  Tab as vanTab,
  Tabs as vanTabs,
  Toast
} from 'vant'
import { reactive, ref, watch } from 'vue';
// import PicCode from '@components/PicCode/PicCode.vue'
import { doLogin, doRegister } from '../../../api/user/user';
import { useUserState } from '../../../store/user';
import logo from '@/assets/logo.png';

const emit = defineEmits(['loginSuccess'])

const userState = useUserState

const active = ref(0);

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

//
watch(() => props.show, (newVal, _oldVal) => {
  if (!newVal) {
    setTimeout(() => {
      clearForm()
    }, 300);
  }
})

const loginForm = reactive({
  username: '',
  password: '',
})
const loginCode = ref(false)
const registerForm = reactive({
  username: '',
  nickname: '',
  password: '',
})
const cpassword = ref('')
const checkPassword = () => registerForm.password == cpassword.value
const onAuthCode = () => {
  loginCode.value = true
}
const onLoginSubmit = (_values: any) => {
  // console.log('submit', values);
  if (!loginCode.value) {
    Toast.fail("请先进行滑块验证！");
    return
  }
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  doLogin(loginForm).then((res) => {
    const { data } = res
    if (data.code != 200) {
      Toast.fail(data.message);
    } else {
      clearForm()
      userState.dispatch('setLogin', data.result)
      emit('loginSuccess')
      Toast.success('登录成功！');
    }
  })
};


const onRegisterSubmit = (_values: any) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  doRegister(registerForm).then((res) => {
    const { data } = res
    if (data.code != 200) {
      Toast.fail(data.message);
    } else {
      clearForm()
      Toast.success('注册成功！');
      active.value = 0
    }
  })
}

const clearForm = () => {
  // 清空登录
  loginForm.username = ''
  loginForm.password = ''

  // 清空注册
  registerForm.nickname = ''
  registerForm.username = ''
  registerForm.password = ''
  cpassword.value = ''
}
</script>
<style lang="scss">
.mi-captcha-content {
  margin: 0 auto;
}
</style>