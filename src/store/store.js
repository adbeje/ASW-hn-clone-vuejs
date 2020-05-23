import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    apiToken:'',
    userID:'',
    userName: ''
  },
  mutations: {
    change (state, apiToken, userID) {
      state.apiToken = apiToken,
      state.userID = userID
    }
  },
  getters: {
    apiToken: state => state.apiToken,
    userID: state => state.userID
  }
});