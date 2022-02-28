import { Auth } from "aws-amplify";

export const state = () => ({
  isAuthenticated: false,
  user: null,
});

export const mutations = {
  set(state, user) {
    state.isAuthenticated = !!user;
    state.user = user;
  },
};

export const actions = {
  async load({ commit }) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      commit("set", user);
      return user;
    } catch (e) {
      commit("set", null);
    }
  },

  async register(_, { username, email, password }) {
    const user = await Auth.signUp({
      username,
      email,
      password,
    });
    return user;
  },

  async confirmRegistration(_, { username, email, code }) {
    return await Auth.confirmSignUp(username, email, code);
  },

  async login({ commit }, { username, password }) {
    const user = await Auth.signIn(username, password);
    commit("set", user);
    return user;
  },

  async logout({ commit }) {
    await Auth.signOut();
    commit("set", null);
  },
};
