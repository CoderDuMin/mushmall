<template>
<!-- ref ->  -->
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)

export default {
  name:'Scroll',
  data() {
    return {
      scroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    }
  },
  mounted() {
   setTimeout(()=>{
     //1,创建BScroll对象
      this.scroll = new BScroll('.wrapper',{
      click:true,
      probeType:this.probeType
    })
    this.scroll.on('scroll',(position)=>{
      // console.log(position)
      this.$emit('scroll', position)
    })
   },500)
  },
  methods: {
    scrollTo(x,y,time){
      this.scroll.scrollTo(x,y,time);
    }
  },  
}
</script>

<style scoped>
</style>