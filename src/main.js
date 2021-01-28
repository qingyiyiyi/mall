import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

import FastClick from 'fastclick';

import toast from 'components/common/toast'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

//添加事件总线
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//使用懒加载插件
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/lazyload.jpg')
})


//解决移动端300ms的延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
