<template>
  <div class="toast"  v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message:'',
      isShow: false
    }
  },
  methods: {
    show(message, duration=2000) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      },duration)
    }
  }
}
</script>

<style>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    color: #ffffff;
    background-color: rgba(0,0,0,.75);
    z-index: 999;
  }
</style>
