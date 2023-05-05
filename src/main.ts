import { createApp } from 'vue'
import router from './router';
import App from './App.vue'
import './style.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);
app.use(Antd);
app.use(pinia);
app.use(router);
app.mount('#app');
