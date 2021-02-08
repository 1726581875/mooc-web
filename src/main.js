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

//允许跨域携带cookie信息
axios.defaults.withCredentials = true



// 拦截器在请求头部设置token
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem("user-token");
  if (token) {
    //将token放到请求头发送给服务器,将token放在请求头中
    config.headers['Authorization'] = token;
    return config;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
