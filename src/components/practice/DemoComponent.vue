<template>
  <div>
    <p>demo component...</p>
    <p>count:{{ msg }}</p>
    <button @click="chunkshow = !chunkshow">show chunk</button>
    <div v-if="chunkshow">
      <ChunkComp></ChunkComp>
    </div>
    <button class="btn" @click="Logger">Logger</button>
  </div>
</template>

<script>
const ChunkComp = () => import("./ChunkComponent.vue"); //dynamic and differnet chunk, requested only when need
// import ChunkComp from "@/components/practice/ChunkComponent";
// import EventBus from '@/components/practice/modal/EventBus'
export default {
  components: { ChunkComp },
  async mounted() {
    this.msg = "mounted";
    // this.$nextTick(() => {
    //   this.msg = "Three";
    // })
    // EventBus.$on("modalemit",()=>{
    //   console.log("EventBus on")
    // })
    this.func();
  },
  data() {
    return {
      msg: "data",
      chunkshow: false,
    };
  },
  methods: {
    later() {
      setTimeout(() => {
        this.msg = "later msg";
      }, 2000);
    },
    init() {
      setTimeout(() => {
        this.msg = "initial msg";
      }, 3000);
    },
    async func() {
      await this.init();
      await this.later();
    },
    Logger(){
      console.log("modal emitted",this.$bus.$emit('modalemit','sad','tttt'))
      // this.$bus.$emit('modalemit','sad','tttt')
    }
  },
};
</script>

<style lang="scss" scoped></style>
