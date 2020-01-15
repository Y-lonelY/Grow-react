import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        list: [1,2,3]
    },
    actions: {

    },
    mutations: {

    },
    getters: {
        pushList: state => {
            return state.list.concat([1,2,3]);
        }
    },
    modules: {

    }
});

export default store;