import Vue from 'vue'
import Vuex from 'vuex'
import { getProfile } from '@/api/common'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    profile: {}
  },
  mutations: {
    setProfile (state, profile) {
      state.profile = profile
    }
  },
  actions: {
    getProfile (context) {
      getProfile().then((data) => {
        context.commit('setProfile', data)
      })
    }
  },
  getters: {
    profile: (state) => state.profile
  },
  modules: {
  }
})
