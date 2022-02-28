import Vuex from "vuex";
import Vue from "vue";
import auth from "./auth";

// Load Vuex
Vue.use(Vuex);

//Create store
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
});
