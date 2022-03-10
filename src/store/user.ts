import { createStore } from "vuex";
import { getUserInfo } from "../api/user/user";
import { storage } from "../utils/Storage";
import { ACCESS_TOKEN } from "./mutation-types";

export interface userData {
  token: string
  username: string
  nickname: string
}

export interface UserState {
  token: string
  username: string
  nickname: string
}
const defaultState: UserState = {
  token: '',
  username: '',
  nickname: ''
}
export const useUserState = createStore({
  state: defaultState,
  mutations: {

  }, actions: {
    checkIsLogin(): boolean {
      return this.state.token != ''
    },
    setLogin(_context, user: userData): void {
      const ex = 7 * 24 * 60 * 60 * 1000;
      storage.set(ACCESS_TOKEN, user.token, ex);
      this.state.token = user.token
      this.state.username = user.username
      this.state.nickname = user.nickname
    },
    setLogout(): void {
      storage.remove(ACCESS_TOKEN)
      this.state.token = ''
      this.state.username = ''
      this.state.nickname = ''
    },
    async getUserInfo() {
      await getUserInfo().then((res) => {
        if (res.data.result) {
          const { username, nickname } = res.data.result
          this.state.token = storage.get(ACCESS_TOKEN)
          this.state.username = username
          this.state.nickname = nickname
        }
      })
    }
  }
})
