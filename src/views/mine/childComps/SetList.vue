<template>
  <div class="set-list">
    <div>
      <p>我的账单</p>
      <img src="~assets/img/common/arrow-right.svg" alt="">
    </div>
    <div>
      <p>浏览记录</p>
      <img src="~assets/img/common/arrow-right.svg" alt="">
    </div>
    <div>
      <p>优惠卷</p>
      <img src="~assets/img/common/arrow-right.svg" alt="">
    </div>
    <div>
      <p>关于我们</p>
      <img src="~assets/img/common/arrow-right.svg" alt="">
    </div>
    <div>
      <p>设置</p>
      <img src="~assets/img/common/arrow-right.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .set-list{
    height: 380px;
    background-color: #fff;
    margin-top: 8px;

  }

  .set-list div{
    height: 50px;
    border-bottom: .5px solid rgb(223, 223, 223);
    position: relative;
  }

  .set-list div img {
    height: 20px;
    width: 20px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 93%;
  }

  .set-list div p {
    line-height: 50px;
    margin-left: 17px;
    font-weight: bold;
  }
</style>
