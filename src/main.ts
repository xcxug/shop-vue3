import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import utils from "@/assets/js/utils";
import { Switch } from "vant";

const app = createApp(App);
app.config.globalProperties.$utils = utils;
app.use(Switch);
app.use(store).use(router).mount("#app");
