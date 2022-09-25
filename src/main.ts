import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import utils from "@/assets/js/utils";

const app = createApp(App);
app.config.globalProperties.$utils = utils;
app.use(store).use(router).mount("#app");
