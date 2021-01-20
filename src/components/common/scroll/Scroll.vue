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
    },
    pullUpLoad: {
      type: Boolean,
      default: false
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
      pullUpLoad: this.pullUpLoad,
      click: true,
    })

    //2、监听滚动位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })

    //3、监听到达底部触发上拉加载更多
    this.scroll.on('pullingUp' , () => {
      this.$emit('pullingUp')
    })


  },
  methods: {
    scrollTo(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },

    finishPullUp() {
      this.scroll &&  this.scroll.finishPullUp()
    },

    refresh() {
      console.log('<-请求30张图片的次数');
      this.scroll &&  this.scroll.refresh()
    },

    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style>

</style>
