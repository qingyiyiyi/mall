<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop :shop="shop"></detail-shop>
  </div>
</template>

<script>


import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShop from './childComps/DetailShop';

import {getDetail, Goods, Shop} from 'network/detail';

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop
  },

  data() {
    return {
      iid:null,
      topImages: [],
      goods:{},
      shop: {}
    }
  },
  created() {
    //1、保存传入的iid
    this.iid = this.$route.params.iid

    //2、根据传入的iid进行数据的请求
    this.getDetail('iid')


  },
  methods: {
    getDetail(iid) {
      getDetail(this.iid).then(res => {
        const data = res.result
      /* console.log(res); */
      //1、获取顶部轮播图片数据
      this.topImages = data.itemInfo.topImages

      //2、获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //3、创建店铺信息
      this.shop = new Shop(data.shopInfo)
    })
    }
  }
}
</script>

<style>





</style>
