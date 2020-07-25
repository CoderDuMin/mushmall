<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" 
              class="item-title" 
              :class="{isactive:currentIndex === index}"
              @click="titleClick(index)"
              :key="index">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components:{
    NavBar
  },
  methods: {
    titleClick(index){
      this.currentIndex = index
    },
    backClick(){
      this.$router.go(-1);
    }
  },
}
</script>

<style scoped>
  .nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .title{
    display: flex;
  }
  .item-title{
    flex: 1;
  }
  .isactive{
    color: var(--color-high-text);
  }
  .back img{
   margin-top: 10px;
   margin-left: 5px;
  }
</style>