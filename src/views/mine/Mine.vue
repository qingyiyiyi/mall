<template>
  <div id="mine">
    <nav-bar class = "mine-nav"><div slot="center">个人中心</div></nav-bar>
    <login />
    <orders />
    <status-bar />
    <set-list />
  </div>
</template>

<script>
import Login from './childComps/Login';
import Orders from './childComps/Orders';
import StatusBar from './childComps/StatusBar';
import SetList from './childComps/SetList';

import NavBar from 'components/common/navbar/NavBar';

export default {
  components: {
    Login,
    Orders,
    StatusBar,
    SetList,
    NavBar
  }
}

</script>

<style scoped>
 .mine-nav{
    background-color: var(--color-tint);
    color: white;

  }
</style>
