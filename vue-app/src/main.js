import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import { router } from "./bootcamp/Router"
import TestPlugin from "./bootcamp/Plugins/Test"

Vue.config.productionTip = false

Vue.use(TestPlugin, { name: "test" })

Vue.globalTest()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
