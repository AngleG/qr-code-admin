import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    globalLoading: false
  },
  getters: {
    GLOBAL_LOADING(state) {
      return state.globalLoading
    }
  },
  mutations: {
    changeGlobalLoading(state, loading) {
      state.globalLoading = loading
    }
  }
})
