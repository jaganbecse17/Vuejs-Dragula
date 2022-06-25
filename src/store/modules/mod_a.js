export default {
  state: {
    name: "mod_a",
    count: {},
  },
  mutations: {
    setname(state, payload) {
      state.name = payload;
    },
    set_count(state, payload) {
      console.log("ntoify count", payload);
      state.count = payload;
    },
  },
};
