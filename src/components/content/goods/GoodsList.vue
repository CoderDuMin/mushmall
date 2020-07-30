<template>
  <div class="goods">
    <goods-list-item v-for="(good,index) in goods" :key="index" :goods-item="good" />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  .goods{
    display: flex;
    flex-wrap: wrap;
    
    justify-content: space-around;
    -webkit-justify-content: space-evenly;
    -ms-justify-content:space-around;
   /* justify-content: space-between; 			
    &:before,&:after { 			
      content: ''; 			
      display: block; 		
    } */
  }
  /* .goods::before,.goods::after{
    content: '';
    display: block;
  } */
  
</style>