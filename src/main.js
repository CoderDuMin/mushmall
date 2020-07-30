import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'

import toast from 'components/common/toast'


//安装toast插件
Vue.use(toast)

//解决移动端的300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
