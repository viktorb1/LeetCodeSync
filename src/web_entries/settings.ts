import { createApp } from "vue";
import { createPinia } from "pinia";
import "../global.css";

import SettingsView from "../views/SettingsView.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSquareMinus,
  faPlus,
  faArrowUpRightFromSquare,
  faFloppyDisk,
  faGear,
  faXmark
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faFloppyDisk,
  faPlus,
  faSquareMinus,
  faArrowUpRightFromSquare,
  faGear,
  faXmark
);

const app = createApp(SettingsView);

app.use(createPinia());
app.component("font-awesome-icon", FontAwesomeIcon);


app.mount("#app");
