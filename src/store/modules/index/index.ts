import {
  getSwiperData,
  getNavsData,
  getGoodsData,
  getRecomGoodsData,
} from "@/api/index";
import { Swipers, Navs, Goods, RecomGoods } from "./interface";
import * as Types from "./types";

export default {
  namespaced: true,
  state: {
    swipers: [],
    navs: [],
    goods: [],
    recomGoods: [],
  },
  mutations: {
    [Types.SET_SWIPER](
      state: { swipers: Swipers[] },
      payload: { swipers: Swipers[] }
    ) {
      state.swipers = payload.swipers;
    },
    [Types.SET_NAVS](state: { navs: Navs[] }, payload: { navs: Navs[] }) {
      state.navs = payload.navs;
      // console.log(state.navs);
    },
    [Types.SET_GOODS](state: { goods: Goods[] }, payload: { goods: Goods[] }) {
      state.goods = payload.goods;
    },
    [Types.SET_RECOMGOODS](
      state: { recomGoods: RecomGoods[] },
      payload: { recomGoods: RecomGoods[] }
    ) {
      state.recomGoods = payload.recomGoods;
    },
  },
  actions: {
    getSwiper(conText: any, payload: { success: () => void }) {
      getSwiperData().then(
        (res: { code: number; data: Swipers[]; status: number }) => {
          if (res.code === 200) {
            conText.commit(Types.SET_SWIPER, { swipers: res.data });
            if (payload.success) {
              payload.success();
            }
          }
        }
      );
    },
    getNavs({ commit }: any, payload: { success: () => void }) {
      getNavsData().then(
        (res: { code: number; data: Navs[]; status: number }) => {
          // console.log(res);
          if (res.code === 200) {
            commit(Types.SET_NAVS, { navs: res.data });
            if (payload.success) {
              payload.success();
            }
          }
        }
      );
    },
    getGoods({ commit }: any, payload: { success: () => void }) {
      getGoodsData().then(
        (res: { code: number; data: Goods[]; status: number }) => {
          if (res.code === 200) {
            commit(Types.SET_GOODS, { goods: res.data });
            if (payload.success) {
              payload.success();
            }
          }
        }
      );
    },
    getRecomGoods({ commit }: any, payload: { success: () => void }) {
      getRecomGoodsData().then(
        (res: { code: number; data: RecomGoods[]; status: number }) => {
          if (res.code === 200) {
            commit(Types.SET_RECOMGOODS, { recomGoods: res.data });
            if (payload.success) {
              payload.success();
            }
          }
        }
      );
    },
  },
};
