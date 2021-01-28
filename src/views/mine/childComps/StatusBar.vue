<template>
  <div class="status-bar">
    <div class="daizhifu">
      <img src="~assets/img/mine/daizhifu.svg" alt="">
      <p>待支付</p>
    </div>
    <div class="daifahuo">
      <img src="~assets/img/mine/daifahuo.svg" alt="">
      <p>待发货</p>
    </div>
    <div class="daishouhuo">
      <img src="~assets/img/mine/daishouhuo.svg" alt="">
      <p>待收货</p>
    </div>
    <div class="daipingjia">
      <img src="~assets/img/mine/daipingjia.svg" alt="">
      <p>待评价</p>
    </div>
    <div class="shouhou">
      <img src="~assets/img/mine/shouhou.svg" alt="">
      <p>退货/售后</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .status-bar {
    margin-top: 8px;
    width: 100%;
    display: flex;
    background-color: #fff;
    height: 75px;
  }
  .status-bar div img {
    width: 24px;
    height: 24px;
    line-height: 50px;
    margin-top: 20%;
  }

  .status-bar div {
    flex: 1;
    text-align: center;
    align-items: center;
    align-content: center;

  }
  .status-bar div p {
    font-size: 13px;
    line-height: 30px;
    font-weight: bold;
  }
</style>
