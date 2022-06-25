import Http from "@/network/config";
export default {
  insertrole({ commit }, payload) {
    setTimeout(() => {
      commit("AddRole", payload);
    }, 2000);
  },
  add_dynamic_fields({ commit }, payload) {
    commit("dynamicfield", payload);
  },

  async get_api_call({ commit }, payload) {
    let { url, data, store_mutations } = payload;
    console.log("action payload", payload);
    await Http.Get_Api_Auth(url, data).then((response) => {
      commit(store_mutations, response.data);
    });
  },
};
