import { createApp } from "vue";
import { createPinia } from "pinia";
import "./global.css";

import PopupView from "./views/PopupView.vue";

const app = createApp(PopupView);

app.use(createPinia());

app.mount("#app");
