import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    signedIn: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setSignedIn(state, signedIn) {
      state.signedIn = signedIn;
    },
  },
  actions: {
    setUser: (context, user) => {
      context.commit("setUser", user);
    },
    setSignedIn: (context, signedIn) => {
      context.commit("setSignedIn", signedIn);
    },
  },
});
