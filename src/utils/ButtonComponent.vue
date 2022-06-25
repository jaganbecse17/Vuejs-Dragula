<template>
  <div>
    <div v-for="(btn, index) in data" :key="index" class="">
      <button
        v-if="btn.type === 'button'"
        type="button"
        class="btn-outline-danger m-2"
        :class="btn.class"
        @click="log"
      >
        {{ btn.label }}
      </button>
      <!-- <button v-if="btn.type === 'button'" class="btn-success">clear</button> -->
      <button v-if="btn.type === 'link'" class="btn btn-primary m-2">
        b btn
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    log() {
      console.log("log");
    },
  },
};
</script>

<style lang="scss" scoped></style>
