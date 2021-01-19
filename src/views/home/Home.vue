<template>
  <div id = 'home'>
    <nav-bar class = "home-nav"><div slot ="center">购物街</div></nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control"
                  :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShow"></back-top>

  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper';
import HomeRecommendView from './childComps/HomeRecommendView';
import FeatureView from './childComps/FeatureView';

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backTop/BackTop';

import {getHomeMultidata, getHomeGoods} from 'network/home';


export default {
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop' : {page: 0, list: []},
        'new' : {page: 0, list: []},
        'sell' : {page: 0, list: []}
      },
      currentType: 'pop',
      isShow: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
      //1、请求多个数据
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /* 事件监听方法 */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
      },

      backClick() {
        this.$refs.scroll.scrollTo(0, -543)
      },

      contentScroll(position) {
        this.isShow = (-position.y) > 1090
      },

      /* 网络请求相关方法 */
      getHomeMultidata() {
          getHomeMultidata().then(res => {
          /* console.log(res); */
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
         getHomeGoods(type, page).then(res => {
           console.log(res);
           this.goods[type].list.push(...res.data.list)
           this.goods[type].page += 1
        })
      }
    }
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control{
    position: sticky;
    top: 44px;
  }

  .content{
    height: calc( 100% - 93px );
  }
</style>
