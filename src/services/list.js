export default {
  get_count() {
    return {
      url: "fetchcount",
      payload: {},
      store_module: "",
      method: "",
      store_mutations: "set_count",
      isactive: true,
    };
  },
};
