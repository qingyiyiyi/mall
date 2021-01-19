<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll';

export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    //1、创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: true,
      click: true,
    })

    //2、监听滚动位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })

    //3、到达底部触发上啦加载更多
    this.scroll.on('pullingUp' , () => {
      console.log('上拉加载更多');
    })
  },
  methods: {
    scrollTo(x, y, time=500) {
      this.scroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style>

</style>
