import { createStore } from "vuex"
import { getOrderGroupsByDate } from "../api/orderGroup/orderGroup"

interface eventType {
  events: eventItem[]
}

interface eventItem {
  start: string
  end: string
  title: string
  content: string
  class: string
  split?: number
}
const defaultState: eventType = {
  events: []
}

export const useEventState = createStore({
  state: defaultState,
  mutations: {
    setEvents(state, data) {
      state.events = data
    }

  }, actions: {
    listEventByDate(_context, data) {
      getOrderGroupsByDate(data.startDate, data.endDate)
    },
  }
})