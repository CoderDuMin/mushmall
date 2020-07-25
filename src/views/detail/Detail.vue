<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar"/>
    <scroll class="content" ref="detailScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo" ></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" />
      <h2>{{iid}}</h2>
      <h2>{{iid}}</h2>
      <h2>{{iid}}</h2>
      <h2>{{iid}}</h2>
      <h2>{{iid}}</h2>
      <h2>{{iid}}</h2>
      <h2>{{iid}}</h2>
      <h2>{{iid}}</h2>
      <h2>{{iid}}</h2>
    </scroll>
   
  </div>
</template>

<script>
import DetailSwiper from './childComps/DetailSwiper'
import DetailNavBar from './childComps/DetailNavBar'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail,Goods} from 'network/detail'

export default {
  name:'Detail',
  data() {
    return {
      iid:null,
      topImages:[],
      goodsInfo:{},
      shop:{},
      detailInfo:{}
    }
  },
  destroyed() {
    console.log('has destoryed')
  },
  created() {
    //1,获取iid
    console.log(this.$route.query.iid)
    this.iid = this.$route.query.iid

    //2,请求详情数据
    getDetail(this.iid).then(res => {
      //1,获取数据
      const data = res.result;
      console.log(data)
      //2,取轮播图的图片
      this.topImages = data.itemInfo.topImages;
      //3,创建商品的对象
      this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      //4，取出店铺信息
      this.shop = data.shopInfo;
      //5,取出详情的信息
      this.detailInfo = data.detailInfo;
    })
  },
  updated() {
    this.$refs.detailScroll.scroll.refresh();
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo
  }
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
    bottom: 60px;
    
  }
</style>