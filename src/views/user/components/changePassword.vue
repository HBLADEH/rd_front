<template>
  <h4>修改密码</h4>
  <van-form @submit="onChangePasswordSubmit">
    <van-cell-group>
      <van-field
        v-model="cPForm.oldPassword"
        type="password"
        name="password"
        label="旧密码"
        placeholder="旧密码"
        :rules="[{ required: true, message: '请填写旧密码' }]"
      />
      <van-field
        v-model="cPForm.newPassword"
        type="password"
        name="password"
        label="新密码"
        placeholder="新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
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
      <van-button round block type="primary" native-type="submit">修改密码</van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">
import {
  Form as vanForm,
  Field as vanField,
  CellGroup as vanCellGroup,
  Toast
} from 'vant'
import { reactive, ref, watch } from 'vue';
import { doChangePassword } from '../../../api/user/user';

const emit = defineEmits(['cpSuccess'])

const cPForm = reactive({
  oldPassword: '',
  newPassword: ''
})


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
      clearcPForm()
    }, 300);
  }
})


const cpassword = ref('')
const checkPassword = () => cPForm.newPassword == cpassword.value
const onChangePasswordSubmit = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  doChangePassword(cPForm).then((res) => {
    const { data } = res
    if (data.code != 200) {
      Toast.fail(data.message);
    } else {
      clearcPForm()
      emit('cpSuccess')
      Toast.success('密码修改成功！');
    }
  })
}

const clearcPForm = () => {
  cPForm.newPassword = ''
  cPForm.oldPassword = ''
  cpassword.value = ''
}
</script>
<style lang="scss">
h4 {
  color: #66b4c6;
  text-align: center;
}
</style>