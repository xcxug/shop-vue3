import {
  getClassifyData,
  getGoodsData,
  getDetailsData,
  getSpecData,
} from "@/api/goods";
import { Classifys, Goods, Details, Attrs } from "./interface";
import * as Types from "./types";

export default {
  namespaced: true,
  state: {
    classifys: [],
    goods: [],
    details: {},
    attrs: [],
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
    // 设置商品详情
    [Types.SET_DETAILS](
      state: { details: Details },
      payload: { details: Details }
    ) {
      state.details = payload.details;
    },
    // 设置商品规格
    [Types.SET_ATTRS](state: { attrs: Attrs[] }, payload: { attrs: Attrs[] }) {
      state.attrs = payload.attrs;
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
    // 商品详情
    getDetails({ commit }: any, payload: { gid: string; success: () => void }) {
      getDetailsData(payload.gid).then(
        (res: { code: number; data: Details[]; status: number }) => {
          if (res.code === 200) {
            commit(Types.SET_DETAILS, { details: res.data });
            if (payload.success) {
              payload.success();
            }
          }
        }
      );
    },
    // 获取商品规格
    getSpec({ commit }: any, payload: { gid: string }) {
      getSpecData(payload.gid).then(
        (res: { code: number; data: Attrs[]; status: number }) => {
          if (res.code === 200) {
            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < res.data[i].values.length; j++) {
                res.data[i].values[j].active = false;
                res.data[i].values[j].title = res.data[i].values[j].value;
              }
            }
            commit(Types.SET_ATTRS, { attrs: res.data });
          }
        }
      );
    },
  },
};
