<template>
  <div id="home">
        <nav-bar class="home-nav"><div slot="center">魔姑街</div></nav-bar>
        <tab-control :titles="['流行','新款','精选']"  
                @tabClick="tabClick"
                class="tab-control"
                v-show="isTabFixed"
                ref="tabControl1"/>
        <scroll class="content" 
                ref="scroll"
                :probe-type="2" 
                @scroll="contentScroll" 
                :pull-up-load="true"
                @pullingUp="loadMore">
          <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"></home-swiper>
          <home-recommend-view :recommends='recommends'></home-recommend-view>
          <home-feature-view/>
          <tab-control :titles="['流行','新款','精选']"  
                @tabClick="tabClick"
                ref="tabControl2"/>
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
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
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
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,100)
  },
  deactivated() {
    console.log('deactivated')
    this.saveY = this.$refs.scroll.getScrollY();
  },
  created() {
    //1,请求多个数据
    this.HomeMultidata();
    //2,请求商品数据
    this.HomeGoods('pop');
    this.HomeGoods('new');
    this.HomeGoods('sell');
  },
  mounted() {
    //1,图片加载完成的事件监听

    //2,获取tabcontrol的offsettop
    //所有的组件都有一个属性$el:用于获取组件的元素
   
  },
  updated() {
    // console.log('refresh!!!')
    this.$refs.scroll.scroll.refresh();
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick(){
      console.log('返回顶部')
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      //1,判断backtop是否显示
      this.isShowBackTop = (-position.y)>1000 

      //2,决定tabcontrol是否吸顶（position：fixed）
      // console.log(-position.y)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      console.log('加载更多的方法')
      this.HomeGoods(this.currentType);
    },
    swiperImageLoad(){
       this.tabOffsetTop= this.$refs.tabControl2.$el.offsetTop
    },
    /*
    网络请求相关的方法
    */
    HomeMultidata(){
      getHomeMultidata().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },
    HomeGoods(type){
      const page = this.goods[type].page + 1;
      // console.log(page)
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;   
        //完成上拉加载更多 
        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.refresh();
      })
    }
  },
  destroyed() {
    console.log('destoryed')
  },
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background: var(--color-tint);
    color: #fff;
    /* 在使用浏览器原生滚动，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10; */
  }
  .tab-control{
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>