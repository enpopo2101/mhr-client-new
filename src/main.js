/*!

 =========================================================
 * Vue Paper Dashboard - v2.0.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App";
import router from "./router/index";
import axios from "./api/agent";
import VueAxios from "vue-axios";
import VModal from "vue-js-modal";
import VueAutosuggest from "vue-autosuggest";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

Vue.use(VueAxios, axios);
Vue.use(PaperDashboard);
Vue.use("vue-autosuggest", VueAutosuggest);
Vue.use(VModal, { dialog: true, dynamic: true, injectModalsContainer: true });
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
