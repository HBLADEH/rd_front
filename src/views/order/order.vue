<template>
  <NavBar title="预约组局" />
  <div class="block">
    <h2 class="block-title">组局查询</h2>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-cell title="预约日期" :value="searchForm.playTime" @click="datePickshow = true" is-link />
        <van-calendar v-model:show="datePickshow" @confirm="onConfirm" color="#66B4C6" />
        <van-cell
          title="游玩商品"
          v-model:value="searchForm.goodsName"
          is-link
          @click="showGoodsPicker = true"
        />
        <van-cell
          title="游玩房间"
          v-model:value="searchForm.roomName"
          is-link
          @click="showRoomPicker = true"
        />
        <van-cell
          title="游玩场次"
          v-model:value="searchForm.roundName"
          is-link
          @click="showRoundPicker = true"
        />
        <van-popup v-model:show="showRoomPicker" position="bottom">
          <van-picker
            :columns="RoomColumns"
            @confirm="onRoomConfirmSelect"
            @cancel="showRoomPicker = false"
          />
        </van-popup>
        <van-popup v-model:show="showRoundPicker" position="bottom">
          <van-picker
            :columns="RoundColumns"
            @confirm="onRoundConfirmSelect"
            @cancel="showRoundPicker = false"
          />
        </van-popup>
        <van-popup v-model:show="showGoodsPicker" position="bottom">
          <van-search v-model="checkGoodsName" @search="onSearch" placeholder="请输入搜索关键词" />
          <van-picker
            :columns="GoodsColumns.data"
            :loading="goodsLoading"
            @confirm="onGoodsConfirmSelect"
            @cancel="showGoodsPicker = false"
          />
        </van-popup>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">查询</van-button>
      </div>
    </van-form>
  </div>
  <div class="block">
    <h2 class="block-title">组局信息</h2>
    <van-list
      v-model:loading="orderGroupLoading"
      :finished="orderGroupFinished"
      finished-text="没有更多了"
      @load="orderGroupLoad"
    >
      <van-card
        v-for="item in orderGroupList"
        :price="item.packagePrice"
        :desc="'游玩时间：' + item.playTime"
        :title="item.goodsName"
        :thumb="IMAGE_SERVER_URL + item.coverImg"
      >
        <template #tags>
          <div style="margin-bottom: 2px;">
            <span style="color: #ff6034;">人数 {{ item.players + '/' + item.playNum }}</span>
          </div>
          <van-tag plain style="margin-right: 2px;" type="primary">{{ item.roomName }}</van-tag>
          <van-tag plain style="margin-right: 2px;" type="primary">{{ item.roundName }}</van-tag>
          <van-tag plain type="primary">{{ item.packageName }}</van-tag>
        </template>
        <template #num>
          <span>游玩时间：{{ item.playTime }}</span>
          <!-- <van-button size="mini">按钮</van-button> -->
        </template>
        <template #footer>
          <van-button size="mini" @click="checkOrder(item.id)">预约</van-button>
        </template>
      </van-card>
    </van-list>
  </div>
</template>
<script setup lang="ts">
import NavBar from '@components/NavBar.vue';
import {
  Cell as vanCell,
  CellGroup as vanCellGroup,
  Calendar as vanCalendar,
  Form as vanForm,
  Picker as vanPicker,
  Popup as vanPopup,
  Search as vanSearch,
  List as vanList,
  Card as vanCard,
  Tag as vanTag,
  Toast,
  Dialog
} from 'vant';
import { onMounted, reactive, ref } from 'vue';
import { useInitStore } from '../../store/init';
import '@assets/css/block.css'
import { getGoodsDWData } from '../../api/goods/goods';
import { addOrder, searchOrderFrom } from '../../api/order/order';
import { IMAGE_SERVER_URL } from '../../utils/const';
import { useUserState } from '../../store/user';

const initStore = useInitStore
const userStore = useUserState

const showRoomPicker = ref(false)
const showRoundPicker = ref(false)
const showGoodsPicker = ref(false);


const GoodsColumns = reactive({
  data: ['']
})
const RoomColumns = initStore.state.rooms.map((val) => val.name);
const RoundColumns = initStore.state.rounds.map((val) => val.name);


const checkGoodsName = ref('')

onMounted(() => {
  // console.log(initStore.state);
  loadGoodsData()
})

const goodsLoading = ref(false)

const onSearch = () => {
  loadGoodsData()
}

const loadGoodsData = () => {
  goodsLoading.value = true
  getGoodsDWData(checkGoodsName.value).then((res) => {
    GoodsColumns.data = res.data.result.map((val: { label: string; }) => val.label)
    goodsLoading.value = false
  })
}

const searchForm = reactive(
  {
    playTime: '',
    goodsName: '',
    roomName: '',
    roundName: '',
  }
)

const datePickshow = ref(false);
const formatDate = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const onConfirm = (value: Date) => {
  datePickshow.value = false;
  searchForm.playTime = formatDate(value);
};

const onGoodsConfirmSelect = (value: string) => {
  // console.log(value);
  searchForm.goodsName = value
  showGoodsPicker.value = false
};
const onRoomConfirmSelect = (value: string) => {
  // console.log(value);
  searchForm.roomName = value
  showRoomPicker.value = false
};
const onRoundConfirmSelect = (value: string) => {
  // console.log(value);
  searchForm.roundName = value
  showRoundPicker.value = false
};




const orderGroupLoading = ref(false)
const orderGroupFinished = ref(false)
const orderGroupList = ref<any[]>([])
const orderGroupLoad = () => {
  orderGroupLoading.value = false
  orderGroupFinished.value = true
}

const onSubmit = () => {
  // console.log(searchForm);
  if (!searchForm.playTime) Toast.fail("请先选择一个日期！")
  else {
    orderGroupList.value = []
    orderGroupFinished.value = false
    orderGroupLoading.value = true
    searchOrderFrom(searchForm).then((res) => {
      // console.log(res);
      const { result } = res.data
      for (let item of result) {
        orderGroupList.value.push({
          id: item.id,
          playTime: item.playTime,
          playNum: item.playNum,
          players: item.players,
          goodsName: item.goodsName,
          coverImg: item.coverImg,
          roomName: item.roomName,
          roundName: item.roundName,
          packageName: item.packageName,
          packagePrice: item.packagePrice,
        })
      }
      orderGroupLoading.value = false
      orderGroupFinished.value = true
    })
  }
}
const checkOrder = (orderGroup: number) => {
  Dialog.confirm({
    title: '确认预约',
    message: '是否要预约该组局？',
  })
    .then(() => {
      // on confirm
      doCheckOrder(orderGroup)
    })
    .catch(() => {
      // on cancel
    });

}
const doCheckOrder = (orderGroup: number) => {
  userStore.dispatch('checkIsLogin').then((res) => {
    if (res) {
      addOrder(orderGroup).then((res) => {
        const { data } = res
        if (data.code != 200) {
          Toast.fail(data.message);
        } else {
          Toast.success('预定成功！');
          onSubmit()
        }
      })
    } else {
      Toast.fail("请先登录！")
    }
  })
}
</script>
<style>
</style>