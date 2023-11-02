import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';

// const { JSDOM } = require("jsdom");
// const { window } = new JSDOM("");
// const $ = require("jquery")
import $ from 'jquery';


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use($);

new Vue({
  render: h => h(App),
}).$mount('#app')
