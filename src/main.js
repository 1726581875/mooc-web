import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
// 引入qs
import qs from 'qs'
Vue.prototype.$qs = qs

import requestBaseUrl from './api/projectSetting'
Vue.prototype.$requestBaseUrl = requestBaseUrl
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
