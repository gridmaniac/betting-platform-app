import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./TheLayout.vue";
import router from "./router";
import "./index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
