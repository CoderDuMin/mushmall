<template>
  <div id="shop-item">
    <div class="item-img">
      <img :src="item.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{item.title}}</div>
      <div class="item-desc">{{item.desc}}</div>
      <div class="item-bottom">
        <div class="item-price">￥{{item.price}}</div>
        <div class="item-count">X {{item.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'CartListItem',
  props:{
    item:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  #shop-item{
    width: 100%;
    position: flex;
    width: 100%;
    padding: 5px;
    font-size: 0;
    border-bottom: 1px solid #ccc;
  }
  .item-img{
    padding: 5px;
  }
  .item-img img{
   width: 80px;
   height: 100px;
   display: block;
   border-radius: 8px;
  }
  .item-title,.item-desc{
    font-size: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>