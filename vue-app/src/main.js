import Vue from 'vue'
import App from './App.vue'
import { router } from './bootcamp/Router';
import TestPlugin from './bootcamp/Plugins/Test';

Vue.config.productionTip = false

Vue.use(TestPlugin, {name: 'test'});

Vue.globalTest();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
