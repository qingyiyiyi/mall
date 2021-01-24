<template>
  <div class="shop-item">
    <div class="item-selector">
      <check-button @click.native="checkClick" :is-checked="itemInfo.checked"/>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton';

export default {
  components:{
    CheckButton
  },
  props: {
    itemInfo: {
      type:Object,
      default() {
        return {}
      }
    }
  },
   methods: {
      checkClick() {
        this.itemInfo.checked = !this.itemInfo.checked
      }
    }
}
</script>

<style>
  .shop-item{
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info{
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

 .item-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
    height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .info-bottom{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .item-price {
    color: orangered;
  }

  .item-count {
    font-size: 17px;
    text-align: right;
    /* line-height: 22px; */

  }
</style>
