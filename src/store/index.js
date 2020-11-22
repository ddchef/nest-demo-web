import Vue from 'vue'
import Vuex from 'vuex'
import { getProfile, getPermission } from '@/api/common'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    profile: {},
    permissions: {},
    routes: [],
    menus: []
  },
  mutations: {
    setProfile (state, profile) {
      state.profile = profile
    },
    setPermissions (state, data) {
      state.permissions = data
    },
    setRoutes (state, routes) {
      state.routes = routes
    },
    setMenus (state, menus) {
      state.menus = menus
    }
  },
  actions: {
    getProfile (context) {
      getProfile().then((data) => {
        context.commit('setProfile', data)
      })
    },
    async getPremissions (context) {
      const data = await getPermission()
      const p = {}
      data.forEach(item => {
        p[item.code] = item.name
      })
      context.commit('setPermissions', p)
    }
  },
  getters: {
    profile: (state) => state.profile,
    permissions: (state) => state.permissions,
    menus: (state) => state.menus
  },
  modules: {
  }
})
