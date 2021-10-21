import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

axios.defaults.baseURL = "https://api.github.com";

axios.defaults.headers.common["Authorization"] = "token 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"; 

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
