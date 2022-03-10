<template>
  <NavBar title="谜语人预约表" />
  <vue-cal
    today-button
    :disable-views="['years', 'week']"
    active-view="month"
    class="vuecal--blue-theme"
    locale="zh-cn"
    v-model:split-days="splitDays.data"
    :events="calData.events"
    @view-change="logEvents($event)"
    @ready="fistEvents($event)"
  ></vue-cal>
</template>

<script setup lang="ts">
import VueCal from 'vue-cal'
import 'vue-cal/dist/i18n/zh-cn.js'
import 'vue-cal/dist/vuecal.css'
import NavBar from '@components/NavBar.vue';
import { OrderGroupsData, VueCalEvent } from './data';
import { onMounted, reactive } from 'vue';
import { useInitStore } from '../../store/init';
import { getOrderGroupsByDate } from '../../api/orderGroup/orderGroup';


const initStore = useInitStore

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

const calData = reactive<eventType>({
  events: []
}
)

interface SplitDaysType {
  data: SplitDayItem[]
}
interface SplitDayItem {
  id: number
  label: string
}
let splitDays = reactive<SplitDaysType>({
  data: []
})
// console.log("splitDays", splitDays);

//   [{
//   start: '2021-11-2 14:30',
//   end: '2021-11-2 19:30',
//   // You can also define event dates with Javascript Date objects:
//   // start: new Date(2018, 11 - 1, 16, 10, 30),
//   // end: new Date(2018, 11 - 1, 16, 11, 30),
//   title: '剧本1',
//   content: '<div>下午场</div><i class="van-icon van-icon-video"></i>',
//   class: 'leisure'
// },]
onMounted(() => {
})

const fistEvents = (event: VueCalEvent) => {
  if (event.view == "month") {
    setTimeout(() => {
      // console.log(initStore.state.rooms);
      splitDays.data = [
        ...initStore.state.rooms.map((value) => {
          return { id: value.id, label: value.name }
        })
      ]
      // console.log(splitDays);
      getOrderGroupsData(event.startDate, event.endDate)
    }, 100);
  }
}

const logEvents = (event: VueCalEvent) => {
  if (event.view == "month") {
    getOrderGroupsData(event.startDate, event.endDate)
  }
}

const getOrderGroupsData = (startDate: Date, endDate: Date) => {
  getOrderGroupsByDate(startDate, endDate).then((res: any) => {
    const { data } = res
    if (data.code == 200) {
      // initStore.dispatch('getTimeBYRound', value.roundName)
      // data.result.forEach((value: OrderGroupsData) => {
      //   const round = rounds.find((item, _index) => {
      //     return item.name == value.roundName
      //   })
      //   const room = rooms.find((item, _index) => {
      //     return item.name == value.roomName
      //   })
      //   calData.events.push({
      //     start: value.playTime + ' ' + round?.startTime,
      //     end: value.playTime + ' ' + round?.endTime,
      //     title: value.goodsName,
      //     class: 'leisure',
      //     content: '<div>' + value.roundName + '</div><i class="van-icon van-icon-video"></i>',
      //     split: room?.id
      //   })
      // });

      calData.events = data.result.map((value: OrderGroupsData) => {
        const round = initStore.state.rounds.find((item, _index) => {
          return item.name == value.roundName
        })
        const room = initStore.state.rooms.find((item, _index) => {
          return item.name == value.roomName
        })
        // console.log("rounds", initStore.state);
        return {
          start: value.playTime + ' ' + round?.startTime,
          end: value.playTime + ' ' + round?.endTime,
          title: value.goodsName,
          class: 'leisure',
          content: '<div>' + value.roundName + '</div><i class="van-icon van-icon-video"></i>',
          split: room?.id
        }
      })
      // console.log("event", calData.events);
    }
  })
}
</script>
<style >
/* Different color for different event types. */
.vuecal__event-title {
  font-weight: 700;
  font-size: large;
}
.vuecal__event-time {
  font-weight: 700;
}
.vuecal__event-content i {
  -webkit-box-align: center;
  align-items: center;
  display: inline-flex;
  font-feature-settings: "liga";
  font-size: 24px;
  -webkit-box-pack: center;
  justify-content: center;
  letter-spacing: normal;
  line-height: 1;
  position: relative;
  text-indent: 0px;
  vertical-align: middle;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) 0s, visibility 0s ease 0s;
}
.vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event.sport {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
</style>