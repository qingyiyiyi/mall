<template>
  <div id="sort">
    <nav-bar class = "home-nav"><div slot ="center">商品分类</div></nav-bar>
    <sort-category :category="category" @itemClick="itemClick"/>

    <!-- <tab-control :titles="titleList"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  class="tav-control"
                  v-show="isTabFixed"></tab-control> -->

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll">
      <sort-info :category-list="subcategoryList"/>
      <tab-control :titles="titleList"
                  @tabClick="tabClick"
                  ref="tabControl"></tab-control>
      <goods-list :goods="categoryDetailList"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>

  </div>
</template>

<script>
import SortCategory from './childComps/SortCategory';
import SortInfo from './childComps/SortInfo';

import NavBar from 'components/common/navbar/NavBar';
import Scroll from 'components/common/scroll/Scroll';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import BackTop from 'components/content/backTop/BackTop';

import {getSort, getCategoryDetail, getSubcategory } from 'network/sort';
import {itemListenerMixin} from 'common/mixin';

export default {
  components: {
    SortCategory,
    SortInfo,
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      //侧边栏数据
      category: [],

      // 分类内容数据
      subcategoryList: [],
      categoryDetailList: [],
      titleList: ["流行", "新款", "精选"],
      currentIndex: 0,
      isTabFixed: false,
      isShow: false,
      saveY: 0,

    }
  },

  created() {
    this.getSort()
  },

  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
     this.$refs.scroll.refresh()
  },

  methods: {
    itemClick({ maitKey, index }) {
      // 防止反复请求
      if (this.currentIndex === index) return;
      this.currentIndex = index;
      // 每次切换分类初始化tabControl的下标
      this.$refs.tabControl.currentIndex = 0;
      // 请求对应的推荐列表
      this.getCategoryDetail(this.category[this.currentIndex].miniWallkey, "pop");
      this.getSubcategory(maitKey);
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    //根据点击的下标来判断改变请求过来的数据
    tabClick(index) {
      const typeList = ["pop", "new", "sell"];
      // 切换类型数据
      this.getCategoryDetail(this.category[this.currentIndex].miniWallkey, typeList[index]);
    },
    getSort() {
      getSort().then(res => {
        /* console.log(res.data.category.list); */
        this.category = res.data.category.list
        this.$nextTick(() => {
            this.getSubcategory(this.category[0].maitKey);
            this.getCategoryDetail(this.category[0].miniWallkey, "pop");
          });
      })
    },
    getSubcategory(key) {
      getSubcategory(key).then(res => {
        // console.log(res.data.list);
        this.subcategoryList = [...res.data.list];
      });
    },
    getCategoryDetail(key, type) {
      getCategoryDetail(key, type).then(res => {
        // console.log(res);
        this.categoryDetailList = [...res];
      });
    },
    backClick() {
      //在SCroll里封装了scrollTo这个函数
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      //1、判断BackTop是否显示
      this.isShow = (-position.y) > 470
      }
  }
}
</script>

<style scoped>
  #sort{
    height: 100vh;
    position: relative;
    background-color: #fff;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 110px;
    right: 0;
    overflow: hidden;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;

  }
  .tav-control{
    position: absolute;
    z-index: 100;
    top: 44px;
    left: 110px;
    display: flex;
    width: 71%;
  }

</style>
