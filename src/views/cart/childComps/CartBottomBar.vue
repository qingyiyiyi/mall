<template>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"/>
        <span>全选</span>
      </div>
      <div class="price">
        <span>合计</span>：{{totalPrice}}
      </div>
      <div class="buy">
        <button class="settlement" @click="calcClick">结算({{checkLength}})</button>
      </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton';
import {mapGetters} from 'vuex';

export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },

    isSelectAll() {
      //if(this.cartList.length === 0) return false
     // return !(this.cartList.filter(item => !item.checked).length)
     if(this.cartList.length === 0) return false
       return !(this.cartList.find(item => !item.checked))
    }
  },
  methods: {
    checkClick() {

      if(this.isSelectAll) { //全部选中
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: absolute;
    bottom: 49px;
    width: 100%;
    line-height: 40px;
    display: flex;
    font-size: 15px;
  }

  .check-content{
    display: flex;
    align-items: center;
    /* font-size: 15px; */
    margin-left: 5px;
  }

  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin: 0 4px;
  }

  .price{
    margin-left: 30px;
  }

  .price span {
    color: black;
  }

  .buy{
    margin-left: auto;
    font-size: 15px;

  }

  .settlement {
    width: 80px;
    height: 25px;
    border-radius: 10%;
    color: #fff;
    background-color: orangered;
  }


</style>
