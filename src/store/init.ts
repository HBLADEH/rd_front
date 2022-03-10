import { createStore } from 'vuex'
import { getInitData } from '../api/init/init'

export interface RoomType {
  id: number
  name: string
}
export interface RoundType {
  id: number
  name: string
  startTime: string
  endTime: string
}

export interface InitState {
  rooms: RoomType[]
  rounds: RoundType[]
}

const defaultState: InitState = {
  rooms: [],
  rounds: [],
}

export const useInitStore = createStore({
  state: defaultState,
  mutations: {
    getInit(state, data) {
      state.rooms = data.rooms
      state.rounds = data.rounds
    }
  }, actions: {
    async getInit(context) {
      await getInitData().then(res => {
        const { data } = res
        // console.log(data);
        if (data)
          context.commit("getInit", data.result)
      })

      // if (data)
      //   context.commit("getInit", data.result)
    },
    getTimeBYRound(_context, roundName: string) {
      return this.state.rounds.find((item, _index) => {
        return item.name == roundName
      })
      // greaterThanTen = array.filter(element => element > 10);
    }
  }
})