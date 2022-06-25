<template>
  <div>
    <h1>About component</h1>
    <p>name from route params: &nbsp;{{ this.$route.params.name }}</p>
    <!-- <p>name from store: &nbsp;{{ this.$store.state.name }}</p> -->
    <p>
      project from props (only if props:true in router file):&nbsp;{{ project }}
    </p>
    <p>Id from route query:&nbsp;{{ this.$route.query.id }}</p>
    <p>history:{{ history }}</p>
    <!-- dynamic components  -->
    <div>
      <P>dynamic template</P>
      <button v-for="temp in temps" :key="temp" @click="curtemp = temp">
        {{ temp }}
      </button>
    </div>
    <component :is="curtemp" />
    <div>
      <p>event handling</p>
      <button @click.once="handler($event)">event once</button>
    </div>
    <div @click.ctrl="popup">
      <p>keyboard modifier -ctrl click me</p>
    </div>
    <input v-model.trim="age" />
    {{ age }}
  </div>
</template>

<script>
import AboutTemp from "@/template/AboutTemp";
import HomeTemp from "@/template/HomeTemp";
export default {
  props: ["project"],
  components: {
    AboutTemp,
    HomeTemp,
  },
  data() {
    return {
      history: window.history,
      temps: ["AboutTemp", "HomeTemp"],
      curtemp: "HomeTemp",
      age: "",
    };
  },
  methods: {
    handler(event) {
      console.log("event handler", event);
    },
    listener(e) {
      // console.log("window", e);
      if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
        e.preventDefault();
        console.log("ctrl + f ");
        alert("You Pressed ctrl + f");
      }
    },
    popup() {
      alert("clicked");
    },
  },
  created() {
    window.addEventListener("keydown", this.listener);
  },
  destroyed() {
    window.removeEventListener("keydown", this.listener);
  },
};
</script>

<style lang="scss" scoped></style>
