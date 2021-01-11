import "core-js/stable";
import "regenerator-runtime/runtime";
import "typeface-roboto";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as backend from "./backend";
import i18n from "./i18n";

Vue.config.productionTip = false;

window.app = { backend };

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
