import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/style/reset.css';
import '@/assets/style/wall.css';
import '@/assets/style/style.css';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
