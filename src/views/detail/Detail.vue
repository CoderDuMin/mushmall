<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" @titleClick="titleClick" ref="detailbar"/>
    <scroll :probe-type="3" class="content" ref="detailScroll" @scroll="contentScroll" >
      <!-- 属性topImages 传入值：top-images -->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo" ></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" />
      <detail-params-info :param-info="itemParams" ref="params" />
      <comment-info :comment-info='commentInfo' ref="comment" />
      <goods-list :goods="recommends"  ref="recommends" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>  
  </div>
</template>

<script>
import DetailSwiper from './childComps/DetailSwiper'
import DetailNavBar from './childComps/DetailNavBar'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import CommentInfo from './childComps/CommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import BackTop from 'components/content/backTop/BackTop'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import {getDetail,Goods,getRecommend} from 'network/detail'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    CommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  data() {
    return {
      iid:null,
      topImages:[],
      goodsInfo:{},
      shop:{},
      detailInfo:{},
      itemParams:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      currentIndex:0,
      isShowBackTop:false
    }
  },
  created() {
    //1,获取iid
    // console.log(this.$route.query.iid)
    this.iid = this.$route.query.iid

    //2,请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res)
      //1,获取数据
      const data = res.result;
      // console.log(data)
      //2,取轮播图的图片
      this.topImages = data.itemInfo.topImages;
      //3,创建商品的对象
      this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      //4，取出店铺信息
      this.shop = data.shopInfo;
      //5,取出详情的信息
      this.detailInfo = data.detailInfo;
      //6,取出参数信息
      this.itemParams = data.itemParams;
      //7，取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      //1,第一次获取，值不对
      //值不对的原因：this.$refs.params.$el压根没有渲染
          // this.themeTopYs = [];
          // this.themeTopYs.push(0);
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
          // console.log(this.themeTopYs)
      
      // this.$nextTick(()=>{
        //  2,第二次获取: 值不对
        // 值不对的原因： 图片没有计算在内
      //   // 根据最新的数据，对应的DOM是已经被渲染出来
      //   //但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
      //   //offsetTop值不对的时候，都是因为图片的问题
      //     this.themeTopYs = [];
      //     this.themeTopYs.push(0);
      //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //     this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      //     console.log(this.themeTopYs)
      // })
    })

    //3,请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  updated() {
     this.$refs.detailScroll.scroll.refresh();
    setTimeout(()=>{
      this.$refs.detailScroll.scroll.refresh();
       this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE);
          console.log(this.themeTopYs)
    },500)
  },
  methods: {
    backTop(){
      this.$refs.detailScroll.scrollTo(0,0,500)
    },
    titleClick(index){
      console.log(index)
      this.$refs.detailScroll.scrollTo(0,-this.themeTopYs[index],500)
    },
    contentScroll(position){
      // console.log(position)
      //1,获取y值
      const positionY = -position.y;
      //2,positionY和主题中的值进行对比
      for(let i=0; i<this.themeTopYs.length-1;i++){
        // console.log(i+1) // str 3 +1 =31

        if(this.currentIndex !== i && positionY >= this.themeTopYs[i] &&  positionY < this.themeTopYs[i+1]){
            this.currentIndex = i;
            this.$refs.detailbar.currentIndex= this.currentIndex
        }

        // if(this.currentIndex !== i &&
        // ((i < this.themeTopYs.length-1 && positionY >= this.themeTopYs[i] &&  positionY < this.themeTopYs[i+1])||
        //     (i === this.themeTopYs.length-1 && positionY >= this.themeTopYs[i]))){
        //       this.currentIndex = i;
        //       console.log(this.currentIndex)
        //       this.$refs.detailbar.currentIndex= this.currentIndex
        // }
      }

      //3，是否显示回到顶部
      this.isShowBackTop = - position.y > 1000;
    },
    addToCart(){
      //1，获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.lowNowPrice;
      product.iid = this.iid;
      //2,将商品添加到购物车
      // this.$store.commit('addCart',product);
      this.$store.dispatch('addCart',product)
    }
  },

}
</script>

<style scoped>
  #detail{
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 58px;
    overflow: hidden;
    
  }
</style>