import Vuex from "vuex";
import Vue from "vue";
import nav from "./modules/nav";

// Load Vuex
Vue.use(Vuex);

//Create store
export default new Vuex.Store({
  modules: {
    nav,
  },
});
