<template>
  <div>
    <h4>Store :vuex</h4>
    <div>
      <P>no.roles:{{ rolecount }}</P>
      <P>roles:</P>
      <li v-for="role in roles" :key="role">{{ role }}</li>
    </div>
    <div>
      <p>store commit</p>
      <input type="text" v-model="role" />
      <button @click="addrole">add role</button>
    </div>
    <div>
      <p>store action dispatch</p>
      <input type="text" v-model="role" />
      <button @click="dispatchrole">add role</button>
    </div>
    <br />
    <div>
      <button @click="log">log</button>
    </div>
    <br />
    <!-- <div>
      <input type="text" name="" id="" v-model="name" />
      <button @click="add">commit</button>
    </div> -->
    <!-- <div>
      <h4>dynamic store</h4>
      <input type="text" name="" id="" v-model="store.variable" />
      <br /><br />
      <input type="text" name="" id="" v-model="store.value" />
      <button @click="addtostore">add to store</button>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["rolecount"]),
    roles() {
      return this.$store.state.roles;
    },
  },
  data() {
    return {
      role: "",
      name: "",
      store: {
        variable: "",
        value: "",
      },
    };
  },
  methods: {
    addrole() {
      this.$store.a.commit("AddRole", this.role);
      this.role = "";
    },
    dispatchrole() {
      this.$store.dispatch("insertrole", this.role);
      this.role = "";
    },
    log() {
      console.log("store main", this.$store.state[this.store.variable]);
      console.log("store mod a", this.$store.state.a.name);
      console.log("getmod_a_value", this.$store.getters.getmod_a_value);
    },
    add() {
      this.$store.commit("setname", this.name);
    },
    addtostore() {
      this.$store.commit("dynamicfield", this.store);
    },
  },
};
</script>

<style lang="scss" scoped></style>
