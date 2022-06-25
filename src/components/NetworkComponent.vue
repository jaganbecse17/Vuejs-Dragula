<template>
  <div>
    <h1>network component</h1>
    <div>
      <button class="btn btn-info p-2 m-2" @click="getapi">get Api</button>
      <br />
      <button class="btn btn-success p-2 m-2" @click="getcall">
        get count
      </button>
      <p>notify count</p>
      <button @click="log">log</button>
    </div>
  </div>
</template>

<script>
import apis from "@/services/list";
export default {
  computed: {},
  methods: {
    getapi() {
      this.$HTTP
        .Get_Api()
        .then((res) => {
          console.log("response", res);
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    getcall() {
      let api = apis.get_count();
      this.$store.dispatch("get_api_call", api);
    },
    log() {
      console.log("store count", this.$store.state);
    },
  },
};
</script>

<style lang="scss" scoped></style>
