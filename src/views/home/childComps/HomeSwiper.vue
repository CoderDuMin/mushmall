<template>
  <div>
    <swiper :interval=2500>
    <swiper-item  v-for='item in banners' :key='item.title'>
      <a :href='item.link'>
        <img :src='item.image' alt="" :title='item.title' @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name:'HomeSwiper',
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
   components:{
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad:false
    }
  },
  methods: {
    imageLoad(){
      if(!this.isLoad){
      this.$emit('swiperImageLoad')
      this.isLoad = true
      }
    }
  },
}
</script>

<style scoped>

</style>