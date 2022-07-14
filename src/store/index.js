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
    id: '',
    communityname: '',
    communityId: '',
    roomType: [],
    oriented: '',
    floor: ''
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
    },
    setcommunityname (state, payload) {
      state.communityname = payload
    },
    setcommunityId (state, payload) {
      state.communityId = payload
    },
    setroomType (state, payload) {
      state.roomType = payload
    },
    setoriented (state, payload) {
      state.oriented = payload
    },
    setfloor (state, payload) {
      state.floor = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
