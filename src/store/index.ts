import { createStore } from "vuex";
import index from "./modules/index";
import goods from "./modules/goods";
import search from "./modules/search";
import goodsReview from "./modules/goods/review";

export default createStore({
  modules: {
    index,
    goods,
    search,
    goodsReview,
  },
});
