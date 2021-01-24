<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
  .check-button{
    border-radius: 50%;
    border: 1px solid #aaa;
  }

  .check{
    background-color: #ff5777;
    border-color: #ff5777;
  }
</style>
