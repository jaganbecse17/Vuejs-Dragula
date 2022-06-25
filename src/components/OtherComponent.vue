<template>
  <div>
    <h1>other component</h1>
    <div>
      <p>get route</p>
      <button @click="getroute">route</button>
    </div>
  </div>
</template>

<script>
export default {
  //   mounted() {
  //     console.log("D");
  //   },
  methods: {
    getroute() {
      console.log("route:", this.$route.path);
      console.log("route:", this.$route.path.includes("other"));
    },
  },
};
</script>

<style lang="scss" scoped></style>
