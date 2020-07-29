<template>
  <div id="shop-item">
     <div class="item-selector" >
      <CheckButton :is-checked="item.checked" @click.native="checkClick"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="item.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{item.title}}</div>
      <div class="item-desc">{{item.desc}}</div>
      <div class="item-bottom">
        <div class="item-price left">￥{{item.price}}</div>
        <div class="item-count right">X {{item.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name:'CartListItem',
  props:{
    item:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  components:{
    CheckButton
  },
  methods: {
    checkClick(){
      this.item.checked = !this.item.checked;
    }
  },
}
</script>

<style scoped>
  #shop-item{
    width: 100%;
    display: flex;
    width: 100%;
    padding: 5px;
    font-size: 0;
    border-bottom: 1px solid #ccc;
  }
  .item-selector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
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
  .item-info{
    font-size: 17px;
    padding:  5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-title,.item-desc{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-info .item-desc{
     color: #ccc;
    margin-top: 15px;
    font-size: 14px;
  }
  .item-bottom{
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    margin-top: 10px;
  }
  .item-price{
    color: red;
  }
</style>