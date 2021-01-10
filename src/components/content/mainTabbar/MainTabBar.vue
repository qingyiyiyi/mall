<template>
  <tab-bar>
      <tab-bar-item path = "/home" activeColor = "deepPink">
        <img slot= "item-icon" src="../../../assets/img/tabbar/homebefort.svg" alt="" >
        <img slot= "item-icon-active" src="../../../assets/img/tabbar/homeafter.svg" alt="" >
        <div slot = "item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path = "/sort" activeColor = "deepPink">
        <img slot= "item-icon" src="../../../assets/img/tabbar/fenleibefort.svg" alt="" >
        <img slot= "item-icon-active" src="../../../assets/img/tabbar/fenleiafter.svg" alt="" >
        <div slot = "item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path = "/cart" activeColor = "deepPink">
        <img slot= "item-icon" src="../../../assets/img/tabbar/gouwuchebefort.svg" alt="" >
        <img slot= "item-icon-active" src="../../../assets/img/tabbar/gouwucheafter.svg" alt="" >
        <div slot = "item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path = "/mine" activeColor = "deepPink">
        <img slot= "item-icon" src="../../../assets/img/tabbar/userbefort.svg" alt="" >
        <img slot= "item-icon-active" src="../../../assets/img/tabbar/userafter.svg" alt="" >
        <div slot = "item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>

import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>
