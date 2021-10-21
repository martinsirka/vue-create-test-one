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
