import { createApp } from 'vue'
import App from './App.vue'
import { Icon, Button as vanButton } from 'vant';
import store from './store';
import router from './router';
import 'makeit-captcha/dist/captcha.min.css';
import MakeitCaptcha from 'makeit-captcha'

createApp(App)
  .use(router)
  .use(store)
  .use(vanButton)
  .use(MakeitCaptcha)
  .use(Icon)
  .mount('#app')