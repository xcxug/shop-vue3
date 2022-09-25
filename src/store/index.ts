import { createStore } from "vuex";
import index from "./modules/index";

export default createStore({
  modules: {
    index,
  },
});
