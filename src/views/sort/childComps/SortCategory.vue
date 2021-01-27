<template>
  <div id="sort-category">
    <scroll class="content" ref="scroll">
      <div v-for="(item, index) in category"
          :key="index"
          class="item"
          :class="{active: index === currentIndex}"
          @click="itemClick(item,index)">
        {{item.title}}
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';
export default {
  components: {
    Scroll
  },
  props: {
    category: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return{
      currentIndex: 0
    }
  },
   methods: {
    itemClick(item,index) {
      const obj = {
        maitKey: item.maitKey,
        index
      }
      console.log(index);
      this.currentIndex = index
      this.$emit('itemClick', obj)
    }
  }

}
</script>

<style scoped>
  .item{
    width: 110px;
    height: 50px;
    /* border: 1px solid black; */
    font-size: 15px;
    color: #333;
    line-height: 50px;
    text-align: center;
    background-color: rgb(233, 232, 232);

  }
  .active {
      border-left: 5px solid var(--color-tint);
      background-color: #fff;
      padding: 5px;
  }
  #sort-category{
    height: 92vh;
    position: relative;
    background-color: #fff;
  }
  .content{
    position: absolute;
    top: 3px;
    bottom: 49px;
    left: 0px;
    right: 0;
    overflow: hidden;
    width: 100%;
  }
</style>
