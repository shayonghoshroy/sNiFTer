//import axios from "axios";

const state = {
  navs: [
    {
      id: 1,
      name: "default",
    },
    {
      id: 2,
      name: "loggedIn",
    },
  ],
};

const getters = {
  navs: (state) => state.navs,
};

const actions = {};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
