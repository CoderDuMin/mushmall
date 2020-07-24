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
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
  //  setTimeout(()=>{
     //1,创建BScroll对象
      this.scroll = new BScroll('.wrapper',{
      click:true,
      probeType:this.probeType,
      pullUpLoad:{
        default:this.pullUpLoad,
        threshold:50
      }
    })
    //2,监听滚动位置
    if(this.probeType ===2 || this.probeType === 3){
      this.scroll.on('scroll',(position)=>{
      // console.log(position)
      this.$emit('scroll', position)
      })
    }
    // console.log(this.scroll)
    // this.scroll.refresh();
    //3,监听scroll滚动到底部
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }

  //  },2000)
  },
  methods: {
    scrollTo(x,y,time){
     this.scroll && this.scroll.scrollTo(x,y,time);
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
    },
    refresh(){
      this.scroll && this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  },  
}
</script>

<style scoped>
</style>