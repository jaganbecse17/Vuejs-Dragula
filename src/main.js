import Vue from "vue";
import App from "./App.vue";
// config...
import "@/mainconfig";
// router...
import router from "@/router";
import VueRouter from "vue-router";
import store from "./store";
// style
import { BootstrapVue } from "bootstrap-vue";
// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// custom stylesheet
import "./assets/style/main.css";
// icons
// https://medium.com/front-end-weekly/how-to-use-fon-awesome-5-on-vuejs-project-ff0f28310821
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

Vue.use(BootstrapVue);
Vue.use(VueRouter);
//

delete window.document.referrer;
window.document.__defineGetter__("referrer", function () {
  return "yoururl.com";
});
console.log("ref", window.document.referrer);
//
delete window.origin;
window.__defineGetter__("origin", function () {
  return "origin.com";
});
console.log("origin", window.origin);
//
export const app = new Vue({ router, store, render: (h) => h(App) }).$mount(
  "#app"
);
