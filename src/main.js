import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import toast from 'components/common/toast'

//安装toast插件
Vue.use(toast)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
