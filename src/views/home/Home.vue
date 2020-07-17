<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">魔姑街</div>
    </nav-bar>
    <h2>首页</h2>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components:{
    NavBar
  }
}
</script>

<style>
  .home-nav{
    background: var(--color-tint);
    color: #fff;
  }
</style>