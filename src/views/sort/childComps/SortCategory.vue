<template>
  <div class="sort-category">
    <div v-for="(item, index) in category"
        :key="index"
        class="item"
        :class="{active: index === currentIndex}"
        @click="itemClick(index)">
      {{item.title}}
    </div>
  </div>
</template>

<script>

export default {
  components: {
    
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
    itemClick(index) {

      console.log(index);
      this.currentIndex = index
      /* this.$emit('titleClick', index) */
    }
  }

}
</script>

<style>
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
  }
</style>
