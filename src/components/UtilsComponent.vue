<template>
  <div class="div-cls">
    <b-alert :show="false" class="alert">Default Alert</b-alert>
    <b-toast id="example-toast" title="BootstrapVue" auto-hide-delay="2000">{{
      msg
    }}</b-toast>
    <b-button
      class="mb-2"
      variant="primary"
      @click="$Toast('welcome', 'Login Successfuly!...', 'success')"
      >toast</b-button
    >
    <b-button class="btn-primary p-2 rounded" @click="change">click</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: this.$store.state.msg,
    };
  },
  computed: {
    get() {
      return null;
    },
  },
  watch: {
    msg() {
      console.log("msg changed");
    },
  },
  methods: {
    toasts(title = "No Title", content = "body content", variant = "primary") {
      this.$bvToast.toast(content, {
        title: title,
        autoHideDelay: 3000,
        variant: variant,
      });
    },
    change() {
      this.$store.commit("toast", "new msg");
    },
  },
};
</script>

<style scoped>
.alert {
  width: fit-content;
  padding: 0px;
}
.div-clsa {
  position: absolute;
  right: 0;
}
</style>
