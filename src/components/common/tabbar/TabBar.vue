<template>
  <div id = "tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'TabBar',
}
</script>

<style>
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /* border-top: 1px solid #002648 */;
    box-shadow: 0px -2px 1px rgba(100,100,100,.15);
    z-index: 9;
  }
</style>
