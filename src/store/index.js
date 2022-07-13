import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  state: {
    user: {},
    name: '上海',
    id: ''

  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setName (state, payload) {
      state.name = payload
    },
    setId (state, payload) {
      state.id = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
