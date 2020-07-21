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
    this.scroll.on('scroll',(position)=>{
      // console.log(position)
      this.$emit('scroll', position)
    })
    //3,监听上拉事件
    this.scroll.on('pullingUp',()=>{
      // console.log('上拉加载更多')
      this.$emit('pullingUp')
    })
  //  },2000)
  },
  methods: {
    scrollTo(x,y,time){
      this.scroll.scrollTo(x,y,time);
    },
    finishPullUp(){
      this.scroll.finishPullUp();
    },
  },  
}
</script>

<style scoped>
</style>