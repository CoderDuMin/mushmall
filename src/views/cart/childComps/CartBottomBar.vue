<template>
  <div class="bottom-bar">
    <div  class="check-content">
      <check-button class="check-button" :is-checked="isCheck" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">
      合计：￥{{totalPrice}}
    </div>

    <div class="calculate" @click="calClick">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  components:{
    CheckButton
  },
  // data() {
  //   return {
  //     isChecked:false
  //   }
  // },
  computed: {
    isCheck(){
      
      return this.$store.getters.cartList==0 ? false : !this.$store.getters.cartList.find(item => !item.checked) 
    },
    totalPrice(){
      return this.$store.getters.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue + item.price * item.count
      },0).toFixed(2);
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item)=>{
        return item.count+preValue
      },0)
    }

  },
  methods: {
    checkClick(){
      if(this.isCheck){
        this.$store.state.cartList.map(item =>{
          return item.checked = false
        })
      }else{
         this.$store.state.cartList.map(item =>{
          return item.checked = true
        })
      }
    },
    calClick(){
      if(this.checkLength==0){
        this.$toast.show('当前购物车为空')
      }else{
        this.$toast.show('开始结算')
      }
    }
  },
}
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    height: 40px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;
    line-height: 40px;
  }
  .check-content{
   display: flex;
   align-items: center;
   margin-left: 10px;
   width:100px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    flex: 1;
    margin-left: 40px;
  }
  .calculate{
    width: 100px;
    text-align: center;
    font-size: 17px;
    color: #fff;
    background-color: red;
  }
</style>