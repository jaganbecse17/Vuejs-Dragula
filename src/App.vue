<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import EventBus from '@/components/practice/modal/EventBus'
export default {
  name: "App",
  components: {},
  computed: {
    name() {
      return this.$store.state.name;
    },
  },
  mounted(){
        this.$bus.$on("modalemit",(data,type)=>{
      console.log("EventBus on",data,type)
      return "return value"
    })
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
