import { createApp } from 'vue'
import Layout from "./Layout.vue";
import router from './router'
import "./index.css";

const app = createApp(Layout)

app.use(router)

app.mount('#app')
