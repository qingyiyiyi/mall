import {debounce} from 'common/utils';

export const itemListenerMixin = {
  components: {

  },
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
      //3、监听item图片加载完成，使用的防抖函数，节省了服务器请求的次数，第一个参数是一个函数，第二个参数是延迟时间
      const refresh = debounce(this.$refs.scroll.refresh, 200)

      //对监听事件进行保存
      this.itemImgListener = () => {
        refresh()
      }

      //$bus总线，为了节省GoodsListItem向Scroll请求的操作步骤，可以在mian.js中设置一个 Vue.prototype.$bus = new Vue()
      //总线接收GoodsListItem传过来的数据让图片接收一张就刷新一次，
      this.$bus.$on('itemImageLoad', this.itemImgListener)


  },
  methods: {

  }
}
