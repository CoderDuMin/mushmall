<template>
  <div class="tab-bar-item" @click="change()">
    <div v-if="!isActive" ><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"> <slot  name="item-text"></slot></div>
    
    <!-- <img src="../../assets/img/tabbar/home.png" alt="" />
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path: String,
    activeColor:{
      type:String,
      default:'pink'
    }
  },
  data() {
    return {
      // isActive:false
    }
  },
  computed: {
    isActive(){
       return  this.$route.path.indexOf(this.path) !== -1
      // return  this.$route.path.includes(this.path);
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    change(){
      if(this.$route.path != this.path){
          this.$router.push(this.path)
      }
    }
  },
}
</script>

<style >
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    }
</style>