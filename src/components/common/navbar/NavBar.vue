<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    line-height: 44px;
    height: 44px;
    box-shadow: 0 1px 1px rgba(73, 73, 73, 0.2);
    font-size: 17px;
     /* box-shadow: 0,3px,3px,#888888; */
  }
  .left,.right{
    width: 60px;
  } 
  .center{
    flex: 1;
    text-align: center;
  }
</style>