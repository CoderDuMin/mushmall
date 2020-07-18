<template>
  <div class="tab-control">
    <div  v-for="(title ,index) in titles" :key="index" @click="changeCurrent(index)" class="tab-control-item" :class="{isactive:index===currentindex}">
      <span>{{title}}</span>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentindex:0
    }
  },
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods: {
    changeCurrent(index){
      this.currentindex=index;
    }
  },
}
</script>

<style>
  .tab-control{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 14px;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item span {
    padding: 5px 5px;
  }
  .isactive{
    color: var(--color-high-text);
  }
  .isactive span{
     border-bottom: 2px solid var(--color-high-text);
  }
</style>