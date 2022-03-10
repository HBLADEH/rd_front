import { useInitStore } from "../store/init"
import { ACCESS_TOKEN } from "../store/mutation-types"
import { useUserState } from "../store/user"
import { storage } from "../utils/Storage"

const userState = useUserState
const initStore = useInitStore

export const getUserInfo = async () => {
  const token = storage.get(ACCESS_TOKEN)
  if (token) {
    await userState.dispatch('getUserInfo')
  }
}
export const getInit = async () => {
  if (initStore.state.rooms.length == 0 && initStore.state.rounds.length == 0)
    await initStore.dispatch("getInit")
}