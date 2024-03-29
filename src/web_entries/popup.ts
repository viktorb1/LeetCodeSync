import { createApp } from "vue";
import { createPinia } from "pinia";
import "../global.css";

import PopupView from "../views/PopupView.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTowerBroadcast
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faTowerBroadcast
);

const app = createApp(PopupView);

app.use(createPinia());
app.component("font-awesome-icon", FontAwesomeIcon);


app.mount("#app");
