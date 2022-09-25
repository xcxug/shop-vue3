import { createStore } from "vuex";
import index from "./modules/index";
import goods from "./modules/goods";

export default createStore({
  modules: {
    index,
    goods,
  },
});
