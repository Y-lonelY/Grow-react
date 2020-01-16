import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    list: [1, 2, 3]
  },
  actions: {
    delayAdd({ commit }, obj) {
      setTimeout(function() {
        commit("clear")
      }, obj.time)
    }
  },
  mutations: {
    add(state, payload) {
      state.list = state.list.concat(payload.list)
    },
    clear(state) {
        state.list = []
    }
  },
  getters: {
    pushList: state => {
      return state.list.find(item => item > 1)
    }
  },
  modules: {}
})

export default store
