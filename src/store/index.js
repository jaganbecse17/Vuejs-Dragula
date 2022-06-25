import Vue from "vue";
import Vuex from "vuex";
import actions from "./action";
import mod_a from "@/store/modules/mod_a";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    name: "vuejs",
    roles: ["admin", "role1", "role2"],
    profile: {
      role: "admin",
    },
    msg: "default",
    log: {},
  },
  getters: {
    rolecount(state) {
      return state.roles.length;
    },
    getmod_a_value() {
      return mod_a.state.name;
    },
  },
  mutations: {
    AddRole(state, role) {
      state.roles.push(role);
    },
    Login(state, payload) {
      console.log("payload", payload);
      localStorage.getItem("roleid", payload.role);
      state.profile = payload;
    },
    toast(state, payload) {
      console.log("toast", payload);
      state.msg = payload;
    },
    dynamicfield(state, payload) {
      console.log("dynamicfield", payload);
      state[payload.variable] = payload.value;
    },
    setlog(state, payload) {
      state.log = payload;
    },
  },
  actions,
  modules: {
    a: mod_a,
  },
});

export default store;
