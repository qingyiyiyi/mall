<template>
  <div class="recommends">
    <div v-for="(item, index) in recommends" :key="index" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      tpye: Array,
      default() {
        return [

        ]
      }
    }
  }
}
</script>

<style>
  .recommends{
    display: flex;
    width: 100%;
    font-size: 12px;
    text-align: center;
    padding: 15px 0 15px 0;
    border-bottom: 10px solid #f5dada;
  }
  .recommends-item{
    flex: 1;
  }
  .recommends img{
    width: 65px;
    height: 65px;
  margin-bottom: 12px;
  }
</style>
