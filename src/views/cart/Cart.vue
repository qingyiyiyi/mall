<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <scroll class="content" ref="scroll">
      <cart-list/>
    </scroll>


    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar';

import Scroll from 'components/common/scroll/Scroll';

import {mapGetters} from 'vuex';

export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll
  },
  computed: {
    //第一种navbar显示购物车数量的方法
   /*  cartLength() {
      return this.$store.state.cartList.length
    } */

    //第二种装逼方法使用vueX的getters.js写法
    ...mapGetters({
      length: 'cartLength'
    })
  },
  methods: {

  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  #cart{
    height: 100vh;
    position: relative;
    background-color: #fff;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .cart-nav-bar{
    position: relative;
    z-index: 15;
    color: white;
    background-color: #FF8198;
  }
</style>
