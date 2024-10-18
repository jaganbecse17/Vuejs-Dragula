import Vue from "vue";
import storage from "@/store/localstorage";
import HttpCalls from "@/network/config";
import { Toast } from "@/utils/toast.js";
// devtools to view function process and vuex (store) - chrome extension
Vue.config.devtools = true;
// remove console tips
Vue.config.productionTip = false;
// error handling - Vue
Vue.config.errorHandler = function (err, vm, info) {
  console.log("vue error :", err);
  console.log("vue vm :", vm);
  console.warn("vue info :", info);
};
// windows errors
window.onerror = function (message, source, lineno, colno, error) {
  /// what you want to do with error here
  console.log("error", message, source, lineno, colno, error);
};
//
window.addEventListener("error", (err) => {
  console.log("error event", err);
});
// GLOBAL variables
// localstorage
Vue.prototype.$storage = storage;

// Axios - HTTP
Vue.prototype.$HTTP = HttpCalls;

// Vue.component("BtnS", btn);
Vue.prototype.$Toast = Toast;
import EventBus from '@/components/practice/modal/EventBus'
Vue.prototype.$bus=EventBus
// format
// (
//   title = "No Title",
//   content = "body content",
//   variant = "primary"
// )
