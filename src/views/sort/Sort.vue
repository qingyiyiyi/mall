<template>
  <div id="sort">
    <nav-bar class = "home-nav"><div slot ="center">商品分类</div></nav-bar>

    <scroll class="content" ref="scroll">
      <sort-category :category="category"/>
    </scroll>


  </div>
</template>

<script>
import SortCategory from './childComps/SortCategory';

import NavBar from 'components/common/navbar/NavBar';
import Scroll from 'components/common/scroll/Scroll';

import {getSort} from 'network/sort';

export default {
  components: {
    SortCategory,
    NavBar,
    Scroll
  },

  data() {
    return {
      category: []
    }
  },

  created() {
    this.getSort()
  },

  methods: {
    getSort() {
      getSort().then(res => {
      console.log(res);
      this.category = res.data.category.list
    })
    }
  }
}
</script>

<style>
  #sort{
    height: 100vh;
    position: relative;
    background-color: #fff;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;

  }
</style>
