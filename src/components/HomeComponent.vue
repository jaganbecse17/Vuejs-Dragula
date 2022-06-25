<template>
  <div>
    <!-- <alertcomponent /> -->
    <div>
      <h1>home screen</h1>
      <ul>
        <li>
          <router-link to="/"><a>Home</a></router-link>
        </li>
        <li>
          <router-link to="form"><a>Form</a></router-link>
        </li>
        <li>
          <router-link
            :to="{
              name: 'about',
              params: {
                name: 'dragula',
                project: 'vue.js',
              },
              query: { id: 1 },
            }"
            ><a>About</a></router-link
          >
        </li>
        <li><router-link to="/parent">Parent</router-link></li>
        <li><router-link to="/Store">Store</router-link></li>
        <li><router-link to="network">network</router-link></li>
        <li><router-link to="style">style</router-link></li>
        <li><router-link to="table">table</router-link></li>
        <li><router-link to="/routeparent">routing</router-link></li>
      </ul>
    </div>
    <div>
      <div>
        <label for="username">username</label>
        <input
          type="text"
          name="username"
          id=""
          v-model="profile.name"
          class="form-control w-25"
        />
        <br />
        <label for="role">role</label>
        <select
          name="role"
          id=""
          v-model="profile.role"
          class="form-control w-25"
        >
          <option value="admin">admin</option>
          <option value="dev">developer</option>
        </select>
        <br />
        <button @click="login">Login</button>
      </div>
    </div>
    <!-- btn -->
    <div>
      <btn :data="butttons" class="row" />
    </div>
    <button class="btn" @click="log">log</button>
    <button class="btn" @click="addroute">addroutes "form"</button
    ><i class="fab fa-medium"></i>
    <i class="far fa-envelope"></i>
  </div>
</template>

<script>
// import { v4 as uuidv4 } from "uuid";
import { addroutes } from "@/router";
import storage from "../store/localstorage";
// import alertcomponent from "./StyleComponent.vue";
import btn from "@/utils/ButtonComponent.vue";
export default {
  components: { btn },
  mounted() {
    console.log("env", process.env.VUE_APP_MODE);
  },
  data() {
    return {
      profile: { name: "", role: "" },
      butttons: [
        {
          label: "Accept",
          type: "button",
          path: "",
          link: "",
          class: "btn m-4",
        },
        {
          label: "Log",
          type: "button",
          path: "",
          link: "",
        },
        {
          label: "redirect",
          type: "link",
          path: "",
          link: "#",
        },
      ],
    };
  },

  methods: {
    login() {
      this.$store.commit("Login", this.profile);
      this.$storage.setprofile(this.profile);
    },
    log() {
      this.$Toast();
      let profiles = this.$storage.getprofile();
      console.log("localstorage", profiles);
      console.log("session storage", sessionStorage.getItem("role"));
      // console.log("uuid", uuidv4());
      // console.log("window.location.href", this.$router.currentRoute);
    },
    clear() {
      storage.clearstorage();
    },
    addroute() {
      addroutes({
        path: "/form",
        name: "form",
        // component: lazy("Form"),
        aliasname: "Form",
        meta: {
          auth: ["admin"],
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
