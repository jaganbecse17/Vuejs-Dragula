<template>
  <div>
    <h1>other component</h1>
    <div>
      <p>get route</p>
      <button @click="getroute">route</button>
    </div>
    <div>
      <button @click="chunkshow = !chunkshow">show chunk</button>
      <div v-if="chunkshow">
        <ChunkComp></ChunkComp>
      </div>
    </div>
  </div>
</template>

<script>
const ChunkComp = () => import("../practice/ChunkComponent.vue");
export default {
  //   mounted() {
  //     console.log("D");
  //   },
  components: { ChunkComp },
  data() {
    return {
      chunkshow: false,
    };
  },
  methods: {
    getroute() {
      console.log("route:", this.$route.path);
      console.log("route:", this.$route.path.includes("other"));
    },
  },
};
</script>

<style lang="scss" scoped></style>
