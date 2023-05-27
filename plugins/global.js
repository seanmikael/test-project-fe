import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import store from './store'

Vue.use(Vuex)

new Vue({
  router,
  store,
  // Other Vue app configuration options
}).$mount('#app')
