import { createApp } from 'vue';
import store from '@/store/index.js';
import App from './App.vue';
import 'virtual:svg-icons-register';

const app = createApp(App).mount('#app');

app.use(store);
