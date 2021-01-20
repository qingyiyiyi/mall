<template>
  <div id = 'home'>
    <nav-bar class = "home-nav"><div slot ="center">购物街</div></nav-bar>

    <tab-control  :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  class="tav-control"
                  v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImage"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl"></tab-control>
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
import {debounce} from 'common/utils';


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
      isShow: false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    
      this.saveY = this.$refs.scroll.getScrollY()
      console.log(this.saveY);


  },
  created() {
      //1、请求多个数据
      this.getHomeMultidata()

      //2、请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //3、监听item图片加载完成，使用的防抖函数，节省了服务器请求的次数，第一个参数是一个函数，第二个参数是延迟时间
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      //$bus总线，为了节省GoodsListItem向Scroll请求的操作步骤，可以在mian.js中设置一个 Vue.prototype.$bus = new Vue()
      //总线接收GoodsListItem传过来的数据让图片接收一张就刷新一次，而设置防抖函数就是为了不让刷新次数太多，可以集中几次一起请求。
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })


    },

    methods: {
      /* 事件监听方法 */
      //根据点击的下标来判断改变请求过来的数据
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
        //记录选中两个的下标让他们相等
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl.currentIndex = index;
      },
      //参数一和参数二是跳转到的位置，参数三是延迟，通常可以设置为直接到达顶部
      backClick() {
        //在SCroll里封装了scrollTo这个函数
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      //设置图片在什么距离
      contentScroll(position) {
        //1、判断BackTop是否显示
        this.isShow = (-position.y) > 1090

        //2、决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //监听到上拉加载更多请求数据，相当于下一页的数据
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      //监听Swiper的图片高度，因为想要获取offsetTop，这个Swiper的图片影响最大，所以才会监听Swiper的图片高度
      swiperImage() {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
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

            //在Scroll中封装了finishPullUp()这个函数，因为上拉加载更多这个函数只能回调一次，所以要调用finishPullUp()
            this.$refs.scroll.finishPullUp()
        })
      }
    }
}
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: white;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100; */
  }

  .tav-control{
    position: relative;
    z-index: 9;
  }


  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }
/*   .content{
    height: calc( 100% - 93px );
    overflow: hidden;
  } */
</style>
