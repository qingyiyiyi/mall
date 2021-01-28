<template>
  <div class="login">
    <div class="login-left">
      <img src="~assets/img/mine/touxiang.svg" alt="">
    </div>
    <div class="login-center">
      <p>点击头像登录</p>
    </div>
    <div class="login-right">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .login {
    padding: 5px;
    height: 100px;
    position: relative;
    background-image: linear-gradient(to right, rgb(247, 55, 7) , rgb(253, 165, 63));
    /* margin: 0 3px; */
  }
  .login-left img{
    height: 70px;
    width: 70px;
    margin-left: 15px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    background-color: #fff;
    border-radius: 50%;
  }
  .login-center p{
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    color: #fff;
    left: 26%;
  }
  .login-right img{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 91%;
  }
</style>
