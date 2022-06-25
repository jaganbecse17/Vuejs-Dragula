<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  async errorCaptured(data, vm, info) {
    console.log("errorcaptured....", data, vm, info);
  },
};
</script>

<style scoped></style>
