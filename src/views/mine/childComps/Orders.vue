<template>
  <div class="orders">
    <div class="orders-left">
      <p>全部订单</p>
    </div>
    <div class="orders-right">
      <p>查看详情</p>
      <img src="~assets/img/common/arrow-right.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .orders {
    margin-top: 8px;
    height: 40px;
    background-color: #fff;
    position: relative;
  }

  .orders-left p {
    position: absolute;
    font-size: 13px;
    font-weight: bold;
    line-height: 40px;
    margin-left: 17px;
  }

  .orders-right p {
    position: absolute;
    font-size: 12px;
    line-height: 40px;
    left: 80%;
  }

  .orders-right img {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 93%;
  }
</style>
