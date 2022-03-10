<template>
  <NavBar title="商品列表" />
  <van-search v-model="keyword" @search="onSearch" placeholder="请输入搜索商品名称" />
  <van-pull-refresh
    v-model="refreshing"
    @refresh="onRefresh"
    style="margin-top: 10px;"
    offset="500"
  >
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-grid :gutter="10" :column-num="2">
        <van-grid-item v-for="item in list" :key="item" @click="doShowGoodsInfo(item.id)">
          <van-image :src="IMAGE_SERVER_URL + item.coverImg" fit="cover" height="174" />
          <span class="goods-title">{{ item.name }}</span>
        </van-grid-item>
      </van-grid>
    </van-list>
  </van-pull-refresh>
  <van-popup
    v-model:show="showGoodsInfo"
    :round="true"
    @close="doCloseGoodsInfo"
    class="goods-info-popup"
  >
    <div class="wrapper">
      <div class="block">
        <van-image
          v-if="GoodsInfo.goods?.coverImg != undefined"
          :src="IMAGE_SERVER_URL + GoodsInfo.goods?.coverImg"
          fit="cover"
          height="174"
          @click="viewImg(IMAGE_SERVER_URL + GoodsInfo.goods?.coverImg)"
          style="margin: 0 auto;"
        />
        <div class="info">
          <div class="item">
            <span class="title">商品名称：</span>
            <span class="text">{{ GoodsInfo.goods?.name }}</span>
          </div>
          <div class="item">
            <span class="title">游玩人数：</span>
            <span class="text">{{ GoodsInfo.goods?.playNum }}</span>
          </div>
          <div class="item" v-for="pg in GoodsInfo.packageList">
            <span class="title">{{ pg.name }}：</span>
            <span class="text red">{{ pg.price }}</span>
          </div>
          <div class="item">
            <span class="title">商品简介：</span>
            <span class="text">{{ GoodsInfo.goods?.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
  <!-- <van-image-preview v-model:show="showImagesView" :images="imagesView"></van-image-preview> -->
</template>
<script setup lang="ts">
import NavBar from '@components/NavBar.vue';
import {
  Search as vanSearch,
  List as vanList,
  PullRefresh as vanPullRefresh,
  Grid as vanGrid,
  GridItem as vanGridItem,
  Image as vanImage,
  // Overlay as vanOverlay,
  Popup as vanPopup,
  ImagePreview
} from 'vant';
import { reactive, ref } from 'vue';
import { getGoodsData, getGoodsInfoById } from '../../api/goods/goods';
import { IMAGE_SERVER_URL } from '../../utils/const';
import { GoodsInfoType } from './data';


const keyword = ref("")
const list = ref<any[]>([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const showGoodsInfo = ref(false);

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
  getGoodsData(Page.size, Page.page, keyword.value).then((res: any) => {
    const { records, current, pages } = res.data.result
    // console.log(records);
    for (let item of records) {
      list.value.push({ id: item.id, coverImg: item.coverImg, name: item.name })
    }
    Page.page++
    loading.value = false;
    if (current >= pages) finished.value = true;

  })
};
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

const GoodsInfo = reactive<GoodsInfoType>({})
const doShowGoodsInfo = (goodsId: number) => {
  showGoodsInfo.value = true

  getGoodsInfoById(goodsId).then((res) => {
    // console.log(res);
    const { goods, packageList } = res.data.result
    GoodsInfo.goods = goods
    GoodsInfo.packageList = packageList
  })
}

const doCloseGoodsInfo = () => {
  showGoodsInfo.value = false
  setTimeout(() => {
    GoodsInfo.goods = undefined
    GoodsInfo.packageList = undefined
  }, 300)

}
// const imagesView = ref([""])
// const showImagesView = ref(false)
const viewImg = (src: string) => {
  // imagesView.value = [src]
  // showImagesView.value = true
  ImagePreview({
    images: [
      src
    ], teleport: "#app"
  })
}
</script>
<style lang="scss" >
.van-image img {
  border-radius: 5px;
}
.goods-title {
  color: #646566;
  margin-top: 5px;
  font-weight: 600;
  font-size: 16px;
  /* line-height: 1.5; */
  word-break: break-all;
}
.container {
  width: 100%;
}
.goods-container {
  width: 100%;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    padding: 20px 20px 10px;
    text-align: center;
    border-radius: 5px;
    width: 100%;
    /* height: 50%; */
    background-color: #fff;
    // overflow-y: auto;

    .info {
      text-align: left;
      .item {
        margin-bottom: 2px;
        .title {
          font-weight: 600;
          // font-size: 13px;
        }
        .text {
          color: #34495e;
          font-size: 15px;
          line-height: 26px;
        }
        .red {
          color: #ff6034;
        }
      }
    }
  }
}

.goods-info-popup {
  width: 90%;
  max-height: 80%;
}
</style>