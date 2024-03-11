import { createApp } from "vue";
import { createPinia } from "pinia";
import "../global.css";

import ConnectView from "../views/ConnectView.vue";

const app = createApp(ConnectView);

app.use(createPinia());

app.mount("#app");
