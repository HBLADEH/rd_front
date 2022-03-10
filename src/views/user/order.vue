<template>
  <NavBar title="我的订单" isBack />
  <van-search v-model="goodsName" @search="onSearch" placeholder="请输入搜索商品名称" />
  <van-pull-refresh
    v-model="refreshing"
    @refresh="onRefresh"
    style="margin-top: 10px;"
    offset="500"
  >
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <div v-for="item in list" :key="item">{{ item.id }}</div> -->
      <van-card
        v-for="item in list"
        :key="item"
        :price="item.packagePrice"
        :desc="'订单号：' + item.orderId"
        :title="item.goods"
        :thumb="IMAGE_SERVER_URL + item.coverImg"
      >
        <template #tags>
          <div style="margin-bottom: 2px;">
            <span>游玩时间：{{ item.playTime }}</span>
          </div>
          <van-tag plain style="margin-right: 2px;" type="primary">{{ item.room }}</van-tag>
          <van-tag plain style="margin-right: 2px;" type="primary">{{ item.round }}</van-tag>
          <van-tag plain type="primary">{{ item.packageName }}</van-tag>
        </template>
        <template #num>
          <span>下单时间：{{ item.orderTime }}</span>
        </template>
        <template #footer>
          <van-button
            v-if="checkOrderCanDelete(item.playTime, item.round)"
            size="mini"
            @click="deleteOrder(item.id)"
          >取消订单</van-button>
        </template>
      </van-card>
    </van-list>
  </van-pull-refresh>
</template>
<script setup lang="ts">
import NavBar from '@components/NavBar.vue';
import { onMounted } from '@vue/runtime-core';
import { useUserState } from '../../store/user';
import {
  List as vanList,
  PullRefresh as vanPullRefresh,
  Card as vanCard,
  Tag as vanTag,
  Search as vanSearch,
  Dialog,
  Toast
} from 'vant'
import { ref } from 'vue';
import { getUserOrder } from '../../api/user/user';
import { IMAGE_SERVER_URL } from '../../utils/const';
import { useInitStore } from '@/store/init';
import { deleteOrderById } from '@/api/order/order';

const userState = useUserState
const initStore = useInitStore

const list = ref<any[]>([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

onMounted(() => {
  userState.dispatch("checkIsLogin").then((res) => {
    if (!res) window.location.href = "/"
  })
})

const Page = {
  size: 6,
  page: 1
}
const onLoad = () => {
  if (refreshing.value) {
    Page.page = 1
    list.value = [];
    refreshing.value = false;
  }
  getUserOrder(Page.size, Page.page, goodsName.value).then((res: any) => {
    const { records, current, pages } = res.data.result
    // console.log(records);
    for (let item of records) {
      list.value.push({
        id: item.id,
        orderId: item.orderId,
        goods: item.goods,
        room: item.room,
        round: item.round,
        coverImg: item.coverImg,
        playTime: item.playTime,
        packageName: item.packageName,
        packagePrice: item.packagePrice,
        orderTime: item.orderTime,
      })
    }
    Page.page++
    loading.value = false;
    if (current >= pages) finished.value = true;

  })
};

const checkOrderCanDelete = (playTime: string, roundName: string) => {
  const roundData = initStore.state.rounds.find((item, _index) => {
    return item.name == roundName
  })
  const hour = 3 * 60 * 60 * 1000 // 第一个参数是几个小时
  const checkDate = new Date(new Date(playTime + " " + roundData?.startTime).getTime() - hour);
  return new Date() < checkDate
}

const deleteOrder = (id: number) => {
  Dialog.confirm({
    title: '确认取消',
    message: '是否要取消该组局？',
  })
    .then(() => {
      // on confirm
      doDeleteOrder(id)
    })
    .catch(() => {
      // on cancel
    });

}
const doDeleteOrder = (id: number) => {
  deleteOrderById(id).then((res) => {
    const { data } = res
    if (data.code != 200) {
      Toast.fail(data.message);
    } else {
      onSearch()
      Toast.success('取消成功！');
    }
  })
}

const goodsName = ref('')
const onSearch = () => {
  refreshing.value = true
  onRefresh()
}

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
</script>