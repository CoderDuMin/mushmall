<template>
  <div class="cart">
    <nav-bar class="nav-bar" >
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <scroll class="content" ref="cartScroll">
      <cart-list :cart-list="lists" />
    </scroll>
  </div>
</template>

<script>
import CartList from './childComps/CartList'

import Scroll from 'components/common/scroll/Scroll'
import NavBar from 'components/common/navbar/NavBar'

import {mapGetters} from 'vuex' 

export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    Scroll
  },
  computed: {
    //两种语法
    // ...mapGetters(['cartLength','cartList'])

    ...mapGetters({
      length:'cartLength',
      lists:'cartList'
    })
  },
  activated() {
     this.$refs.cartScroll.refresh();
  },
}
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
    font-size: 20px;
  }
  .content{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
  }
</style>