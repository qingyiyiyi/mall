<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品列表 -->

      <cart-list/>



    <!-- 底部汇总 -->

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import CartList from './childComps/CartList';

import Scroll from 'components/common/scroll/Scroll';

import {mapGetters} from 'vuex';

export default {
  components: {
    NavBar,
    CartList,
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
  }
}
</script>

<style scoped>
  .cart-nav-bar{
    position: relative;
    z-index: 15;
    color: white;
    background-color: #ff5777;
  }
</style>
