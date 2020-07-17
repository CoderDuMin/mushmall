<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">魔姑街</div></nav-bar>
    <home-swiper :banners='banners'></home-swiper>
    <home-recommend-view :recommends='recommends'></home-recommend-view>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import NavBar from 'components/common/navbar/NavBar'
import HomeRecommendView from './childComps/HomeRecommendView'

import {getHomeMultidata} from 'network/home'

export default {
  data() {
    return {
      banners:[],
      recommends:[]
    }
  },
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommendView
   
  },
  created() {
    //1,请求多个数据
    getHomeMultidata().then(res => {
      console.log(res);
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
    })
  },
}
</script>

<style>
  .home-nav{
    background: var(--color-tint);
    color: #fff;
  }
</style>