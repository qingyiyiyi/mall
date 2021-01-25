<template>
  <div class="cart-list" v-if="length !== 0">
    <cart-list-item v-for="(item, index) in cartList" :item-info="item" :key="index" />
  </div>
  <h2 v-else class="blank">购物车空空如也</h2>
</template>

<script>
import CartListItem from './CartListItem';



import {mapGetters} from 'vuex';

export default {
  components: {
    CartListItem,

  },
  computed: {
    ...mapGetters({
      cartList: 'cartList',
      length: 'cartLength'
    }),

  }
}
</script>

<style>
  .blank{
    color: #ff5777;
    text-align: center;
  }
</style>
