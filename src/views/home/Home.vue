<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">魔姑街</div></nav-bar>
    <home-swiper :banners='banners'></home-swiper>
    <home-recommend-view :recommends='recommends'></home-recommend-view>
    <home-feature-view/>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" />
    <goods-list :goods="showGoods" />
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li></ul>
  </div>
</template>

<script>
//私有组件
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeatureView'

//公有组件
import GoodsList from 'components/content/goods/GoodsList'
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'

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
      currentType:'pop'
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
    GoodsList
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
    /*
    网络请求相关的方法
    */
    HomeMultidata(){
      getHomeMultidata().then(res => {
      console.log(res);
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
    })
    },
    HomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
      })
    }
  },
}
</script>

<style>
  #home{
    padding-top: 44px;
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
</style>