<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>

    <scroll class="content1" ref="scroll" @scroll="contentScroll" :probe-type="3">

      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-image-info :images-info="imageInfo" @imgLoad="imgLoad"/>
      <detail-param-info  ref="param" :param-info="paramsInfo"/>
      <detail-comment-info  ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="list" :goods="recommend"/>
      <div class="bottom">已经到达底部了(*^▽^*)</div>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar/>

  </div>
</template>

<script>


import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailImageInfo from './childComps/DetailImageInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar';

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList';
import BackTop from 'components/content/backTop/BackTop';

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail';
import {debounce} from 'common/utils';
import {itemListenerMixin} from 'common/mixin';

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
    BackTop

  },
  //混入
  mixins: [itemListenerMixin],

  data() {
    return {
      iid:null,
      topImages: [],
      goods: {},
      shop: {},
      imageInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommend: [],
      navbarY: [],
      //offsetTop的防抖函数保存
      getNavTopY: null,
      //记录滚动区间的index
      currentIndex: 0,
      //记录返回顶部什么时候显示
      isShowBackTop: false
    }
  },
  created() {
    //1、保存传入的iid
    this.iid = this.$route.params.iid

    //2、根据传入的iid进行数据的请求
    this.getDetail('iid')

    //3、请求详情页的商品数据
    this.getRecommend()

    //4、给getNavTopY赋值
    this.getNavTopY = debounce(() => {
      //根据最新的数据，对应的DOM是已经渲染出来了，但是图片依旧没有加载完(目前的offsetTop是没包含图片的)
      this.navbarY = []
      //拿到各个点的offsetTop的值，存储到navbarY中，给点击事件titleClick提供y值定位到各个点。
      this.navbarY.push(0)
      this.navbarY.push(this.$refs.param.$el.offsetTop)
      this.navbarY.push(this.$refs.comment.$el.offsetTop)
      this.navbarY.push(this.$refs.list.$el.offsetTop)
      /* console.log(this.navbarY); */
    }, 100)
  },

  mounted() {

  },

  updated() {

  },

  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },

  methods: {
    //详情页单一goods相关
    getDetail(iid) {
      getDetail(this.iid).then(res => {
        //取出回调函数回调过来的result数据，里面的详细商品信息
        const data = res.result
        /* console.log(res); */
        //1、获取顶部轮播图片数据
        this.topImages = data.itemInfo.topImages

        //2、获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3、创建店铺信息
        this.shop = new Shop(data.shopInfo)

        //4、保存商品的详情数据
        this.imageInfo = data.detailInfo

        //5、取出参数的信息
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6、取出评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
    },

    //详情页另外goods的推荐
    getRecommend() {
      getRecommend().then(res => {
       /*  console.log(res); */
        this.recommend = res.data.list
      })
    },

    imgLoad() {
      this.$refs.scroll.refresh()
      //给详情页的navbar导航定位作了一个防抖，然后将getNavTopy这个函数放在这里，进行刷新，这样刷新有了防抖不会太多次
      this.getNavTopY()
    },

    //详情页的navbar点击跳转
    titleClick(index) {
      /* console.log(index); */

      this.$refs.scroll.scrollTo(0, -this.navbarY[index], 500)
    },

    backClick() {
        //在SCroll里封装了scrollTo这个函数
        this.$refs.scroll.scrollTo(0, 0, 500)
      },

    //监听scroll的滚动位置
    contentScroll(position) {
      //backTop达到-1001时显示
      this.isShowBackTop = (-position.y) > 460
      //获取滚动高度
      const positionY = -position.y

      //positionY和评论、参数、推荐的offsetTop进行对比  navbarY[0, 参数，评论， 推荐]
      //positionY在 0和参数之间， index = 0
      //positionY在 参数和评论之间， index = 1
      //positionY在 评论和推荐之间， index = 2
      //positionY在 超过推荐的y值， index = 3
      let length = this.navbarY.length
      for(let i = 0; i < length; i++) {
        if(this.currentIndex !== i && i < length -1 && positionY >= this.navbarY[i] &&  positionY < this.navbarY[i+1]) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
        }else if(this.currentIndex !== i && i === length - 1 && positionY >= this.navbarY[i]) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

    }

  }
}
</script>

<style>
  #detail{
    position: relative;
    background-color: #fff;
    height: 100vh;
    z-index: 10;
  }
/*   .wrapper{
    position: relative;
    background-color: #fff;
    height: 100vh;
    z-index: 10;
  } */

  .detail-nav{
    position: relative;
    z-index: 15;
    background-color: #fff;
  }

  .content1{
    /* position: absolute; */
    /* top: 44px;
    bottom: 0px;
    left: 0;
    right: 0; */
    height: calc( 100% - 93px );


  }
  .bottom{
    font-size: 15px;
    background-color: #ff5777;
    text-align: center;
    line-height: 83px;
    height: 83px;
    color: #fff;
  }



</style>
