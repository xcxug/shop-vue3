import { getHotKeywordData } from "@/api/search";
import { HotKeyword, Price, Attrs } from "./interface";
import * as Types from "./types";

export default {
  namespaced: true,
  state: {
    historyKeywords: localStorage["historyKeywords"]
      ? JSON.parse(localStorage["historyKeywords"])
      : [],
    hotKeywords: [],
    priceData: {
      isHide: false,
      items: [
        { price1: 1, price2: 50, active: false },
        { price1: 51, price2: 99, active: false },
        { price1: 100, price2: 300, active: false },
        { price1: 301, price2: 1000, active: false },
        { price1: 1001, price2: 4000, active: false },
        { price1: 4001, price2: 9999, active: false },
      ],
    },
    minPrice: "",
    maxPrice: "",
    attrs: [
      {
        title: "颜色",
        isHide: false,
        param: [
          { title: "黑色", active: false },
          { title: "白色", active: false },
          { title: "红色", active: false },
        ],
      },
      {
        title: "尺码",
        isHide: false,
        param: [
          { title: "36", active: false },
          { title: "37", active: false },
          { title: "38", active: false },
        ],
      },
    ],
  },
  mutations: {
    // 设置历史记录关键词
    [Types.SET_KEYWORDS](
      state: { historyKeywords: string[] },
      payload: { historyKeywords: string[] }
    ) {
      state.historyKeywords = payload.historyKeywords;
      localStorage["historyKeywords"] = JSON.stringify(state.historyKeywords);
    },
    // 清除搜索历史记录
    [Types.CLEAR_KEYWORDS](state: { historyKeywords: string[] }) {
      state.historyKeywords = [];
      localStorage.removeItem("historyKeywords");
    },
    // 设置热门关键词
    [Types.SET_HOTKEYWORD](
      state: { hotKeywords: HotKeyword[] },
      payload: { hotKeywords: HotKeyword[] }
    ) {
      state.hotKeywords = payload.hotKeywords;
    },
    // 隐藏价格
    [Types.HIDE_PRICE](state: { priceData: Price }) {
      state.priceData.isHide = !state.priceData.isHide;
    },
    // 选择价格
    [Types.SELECT_PRICE](
      state: { priceData: Price; minPrice: string; maxPrice: string },
      payload: { index: number }
    ) {
      if (state.priceData.items.length > 0) {
        for (let i = 0; i < state.priceData.items.length; i++) {
          if (i !== payload.index) {
            if (state.priceData.items[i].active) {
              state.priceData.items[i].active = false;
              break;
            }
          }
        }
        state.priceData.items[payload.index].active =
          !state.priceData.items[payload.index].active;
        state.minPrice = state.priceData.items[payload.index].active
          ? String(state.priceData.items[payload.index].price1)
          : "";
        state.maxPrice = state.priceData.items[payload.index].active
          ? String(state.priceData.items[payload.index].price2)
          : "";
      }
    },
    // 设置最小价格
    [Types.SET_MINPRICE](
      state: { minPrice: string },
      payload: { minPrice: string }
    ) {
      state.minPrice = payload.minPrice;
      state.minPrice = state.minPrice.replace(/[^\d|.]/g, "");
    },
    // 设置最大价格
    [Types.SET_MAXPRICE](
      state: { maxPrice: string },
      payload: { maxPrice: string }
    ) {
      state.maxPrice = payload.maxPrice;
      state.maxPrice = state.maxPrice.replace(/[^\d|.]/g, "");
    },
    // 显示隐藏商品属性
    [Types.HIDE_ATTR](state: { attrs: Attrs[] }, payload: { index: number }) {
      state.attrs[payload.index].isHide = !state.attrs[payload.index].isHide;
    },
    // 选择商品属性
    [Types.SELECT_ATTR](
      state: { attrs: Attrs[] },
      payload: { index: number; index2: number }
    ) {
      state.attrs[payload.index].param[payload.index2].active =
        !state.attrs[payload.index].param[payload.index2].active;
    },
  },
  actions: {
    getHotKeyword(conText: any) {
      getHotKeywordData().then(
        (res: { code: number; data: HotKeyword[]; status: number }) => {
          if (res.code === 200) {
            conText.commit(Types.SET_HOTKEYWORD, { hotKeywords: res.data });
          }
        }
      );
    },
    // 搜索页跨页面读取（首页）数据
    selectClassify(conText: any, payload: { index: number }) {
      // console.log(conText);
      if (conText.rootState.goods.classifys.length > 0) {
        for (let i = 0; i < conText.rootState.goods.classifys.length; i++) {
          if (i !== payload.index) {
            if (conText.rootState.goods.classifys[i].active) {
              conText.rootState.goods.classifys[i].active = false;
              break;
            }
          }
          // if (conText.rootState.goods.classifys[i].active) {
          //   conText.rootState.goods.classifys[i].active =
          //     conText.rootState.goods.classifys[payload.index].active;
          //   break;
          // }
        }
        conText.rootState.goods.classifys[payload.index].active =
          !conText.rootState.goods.classifys[payload.index].active;
      }
    },
  },
};
