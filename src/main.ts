import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from  "axios";

import iView from 'iview';
import '../iview-theme/index.less';
import VueResource from 'vue-resource'

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VueResource);
new Vue({
    router,
    store,
    // axios,
    render: (h) => h(App),
}).$mount('#app');
