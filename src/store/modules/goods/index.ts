import { getClassifyData, getGoodsData } from "@/api/goods";
import { Classifys, Goods, Attrs } from "./interface";
import * as Types from "./types";

export default {
  namespaced: true,
  state: {
    classifys: [],
    goods: [],
    attrs: [
      {
        title: "颜色",
        values: [
          {
            value: "黑色",
            active: false,
          },
          {
            value: "红色",
            active: false,
          },
          {
            value: "白色",
            active: false,
          },
        ],
      },
      {
        title: "尺码",
        values: [
          {
            value: "36",
            active: false,
          },
          {
            value: "37",
            active: false,
          },
          {
            value: "38",
            active: false,
          },
        ],
      },
    ],
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
    // 选择商品属性
    [Types.SELECT_ATTR](
      state: { attrs: Attrs[] },
      payload: { index: number; index2: number }
    ) {
      if (state.attrs.length > 0) {
        for (let i = 0; i < state.attrs[payload.index].values.length; i++) {
          if (state.attrs[payload.index].values[i].active) {
            state.attrs[payload.index].values[i].active = false;
            break;
          }
        }
        state.attrs[payload.index].values[payload.index2].active = true;
      }
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
