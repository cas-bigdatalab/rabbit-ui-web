import Vue from 'vue';
import VueFormGenerator from 'vue-form-generator';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

import iView from 'iview';
import '../iview-theme/index.less';
import 'vue-form-generator/dist/vfg.css';
import  'vue-form-generator/dist/vfg.js';
import VueResource from 'vue-resource';

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VueFormGenerator);
Vue.use(VueResource);
new Vue({
    router,
    store,
    // axios,
    render: (h) => h(App),
}).$mount('#app');
