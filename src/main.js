import { createApp } from 'vue';
// https://github.com/VinceG/vue-click-away#readme
import VueClickAway from 'vue3-click-away';

import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './plugins/validation';
import './assets/tailwind.css';
import './assets/main.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VeeValidatePlugin);
app.use(VueClickAway);
app.mount('#app');
