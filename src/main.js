import Vue from 'vue';
import ElementUI from 'element-ui';
import VueCarousel from 'vue-carousel';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/style/main.scss';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCarousel);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
