import { getClassifyData, getGoodsData } from "@/api/goods";
import { Classifys, Goods } from "./interface";
import * as Types from "./types";

export default {
  namespaced: true,
  state: {
    classifys: [],
    goods: [],
  },
  mutations: {
    [Types.SET_CLASSIFYS](
      state: { classifys: Classifys[] },
      payload: { classifys: Classifys[] }
    ) {
      state.classifys = payload.classifys;
    },
    [Types.SELECT_ITEM](
      state: { classifys: Classifys[] },
      payload: { index: number }
    ) {
      if (state.classifys.length > 0) {
        for (let i = 0; i < state.classifys.length; i++) {
          if (state.classifys[i].active) {
            state.classifys[i].active = false;
            break;
          }
        }
        state.classifys[payload.index].active = true;
      }
    },
    [Types.SET_GOODS](state: { goods: Goods[] }, payload: { goods: Goods[] }) {
      state.goods = payload.goods;
    },
  },
  actions: {
    // 左侧分类
    getClassify(conText: any, payload: { success: () => void }) {
      getClassifyData().then(
        (res: { code: number; data: Classifys[]; status: number }) => {
          if (res.code === 200) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].active = false;
            }
            conText.commit(Types.SET_CLASSIFYS, { classifys: res.data });
            if (payload.success) {
              payload.success();
            }
          }
        }
      );
    },
    // 右侧商品
    getGoods({ commit }: any, payload: { cid: string; success: () => void }) {
      getGoodsData(payload.cid).then(
        (res: { code: number; data: Goods[]; status: number }) => {
          if (res.code === 200) {
            commit(Types.SET_GOODS, { goods: res.data });
            if (payload.success) {
              payload.success();
            }
          } else {
            commit(Types.SET_GOODS, { goods: [] });
          }
        }
      );
    },
  },
};
