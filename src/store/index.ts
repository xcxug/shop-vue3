import { createStore } from "vuex";
import index from "./modules/index";
import goods from "./modules/goods";
import search from "./modules/search";

export default createStore({
  modules: {
    index,
    goods,
    search,
  },
});
