import { createStore } from "vuex";
import index from "./modules/index";
import goods from "./modules/goods";
import search from "./modules/search";
import goodsReview from "./modules/goods/review";
import cart from "./modules/cart";
import user from "./modules/user";

export default createStore({
  modules: {
    index,
    goods,
    search,
    goodsReview,
    cart,
    user,
  },
});
