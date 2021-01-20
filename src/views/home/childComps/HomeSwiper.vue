<template>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link" >
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper';

export default {
   props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },

  //这里设置了一个isLoad的属性记录状态，当有一张图片加载完成后，就会执行这个代码，后面的不用请求。因为这里要的是监听图片的高度，
  //不是请求图片的方法，所以只显示一张图片我们就监听到了Swiper的图片高度了，后面的图片就没必要监听。
  methods: {
    imageLoad() {
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }

}
</script>

<style>

</style>
