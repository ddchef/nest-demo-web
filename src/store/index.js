import Vue from 'vue'
import Vuex from 'vuex'
import { getProfile, getPermission } from '@/api/common'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    profile: {},
    permissions: []
  },
  mutations: {
    setProfile (state, profile) {
      state.profile = profile
    },
    setPermissions (state, data) {
      state.permissions = data
    }
  },
  actions: {
    getProfile (context) {
      getProfile().then((data) => {
        context.commit('setProfile', data)
      })
    },
    getPremissions (context) {
      getPermission().then((data) => {
        context.commit('setPermissions', data)
      })
    }
  },
  getters: {
    profile: (state) => state.profile,
    permissions: (state) => {
      const p = {}
      state.permissions.forEach(item => {
        p[item.code] = item.name
      })
      return p
    }
  },
  modules: {
  }
})
