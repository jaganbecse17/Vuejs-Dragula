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
import "./registerServiceWorker";
import * as rules from "vee-validate/dist/rules";
import * as VeeValidate from "vee-validate";
import { messages } from "@/datas/validation_messages";
Vue.use(BootstrapVue);
Vue.use(VueRouter);
//
Object.keys(rules).forEach((rule) => {
  VeeValidate.extend(rule, {
    ...rules[rule],
    message: messages[rule],
  });
});
Vue.use(VeeValidate);
Vue.component("ValidationObserver", VeeValidate.ValidationObserver);
Vue.component("ValidationProvider", VeeValidate.ValidationProvider);
// 
// import {EventBus} from '@/components/practice/modal/EventBus'
// Vue.prototype.$drlist=EventBus
// import EmitModal from '@/components/practice/modal/EmitModal'

// Vue.component('')
//
// export const app = new Vue({ router, store, render: (h) => h(App) }).$mount("#app");



import Keycloak from 'keycloak-js';

let initOptions = {
  // url: "http://localhost:8080/auth",
  url: "http://auth.fasoftwares.net/auth",
  realm: "Bagic",
  clientId: "bagic-ui-ilm",
  onLoad: "login-required",
};

if(window.ReactNativeWebView && window.location.href.includes("mobile")){
  initOptions['clientId'] = "Surveyor"
}else{
  initOptions['clientId'] = "bagic-ui-ilm"
}



let keycloak = Keycloak(initOptions);
keycloak.init({ onLoad: initOptions.onLoad,checkLoginIframe:false }).then(()=>{
  new Vue({ router, store, render: (h) => h(App) }).$mount("#app");
  if(window.ReactNativeWebView){
    window.ReactNativeWebView.postMessage("MOUNTED")
  }

})

export {keycloak}