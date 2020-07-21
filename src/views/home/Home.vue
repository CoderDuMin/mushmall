<template>
  <div id="home">
        <nav-bar class="home-nav"><div slot="center">魔姑街</div></nav-bar>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
          <home-swiper :banners='banners'></home-swiper>
          <home-recommend-view :recommends='recommends'></home-recommend-view>
          <home-feature-view/>
          <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" />
          <goods-list :goods="showGoods" />
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
//私有组件
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeatureView'

//公有组件
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
  data() {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShowBackTop:false
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    //1,请求多个数据
    this.HomeMultidata();
    //2,请求商品数据
    this.HomeGoods('pop');
    this.HomeGoods('new');
    this.HomeGoods('sell');
  },
  methods: {
    /*
    事件监听相关的方法
    */
    tabClick(index){
      console.log(index)
      switch(index){
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
            this.currentType = 'new'
            break;
        case 2:
            this.currentType = 'sell'
            break;
      }
    },
    backClick(){
      console.log('返回顶部')
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      this.isShowBackTop = (-position.y)>1000 
    },
    /*
    网络请求相关的方法
    */
    HomeMultidata(){
      getHomeMultidata().then(res => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },
    HomeGoods(type){
      const page = this.goods[type].page + 1;
      console.log(page)
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      })
    }
  },
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    background: #fff;
    z-index: 9;
  }
  .content{
    /* overflow: hidden; */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>