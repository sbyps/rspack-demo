import Vue from 'vue';
import App from './index.vue';
// import Tag from 'vant/lib/tag';
// import 'vant/lib/tag/style';

// Vue.use(Tag);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
