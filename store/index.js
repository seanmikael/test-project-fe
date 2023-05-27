import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations, actions, getters } from './auth' // Update the import statement

Vue.use(Vuex)

export const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
