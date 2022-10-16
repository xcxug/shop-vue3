import { getHotKeywordData, getSearchData, getAttrsData } from "@/api/search";
import { HotKeyword, Price, Attrs, SearchData, PageInfo } from "./interface";
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
    attrs: [],
    cid: "",
    params: [],
    searchData: [],
    total: 0,
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
    // 设置搜索结果
    [Types.SET_SEARCH_DATA](
      state: { searchData: SearchData[]; total: number },
      payload: { searchData: SearchData[]; total: number }
    ) {
      state.searchData = payload.searchData;
      state.total = payload.total;
    },
    // 增加分页数据（第2页、第3页...）
    [Types.SET_SEARCH_DATA_PAGE](
      state: { searchData: SearchData[] },
      payload: { searchData: SearchData[] }
    ) {
      if (payload.searchData.length > 0) {
        for (let i = 0; i < payload.searchData.length; i++) {
          state.searchData.push(payload.searchData[i]);
        }
      }
    },
    // 设置商品分类的cid
    [Types.SET_CID](state: { cid: string }, payload: { cid: string }) {
      state.cid = payload.cid;
    },
    [Types.SET_ATTRS](state: { attrs: Attrs[] }, payload: { attrs: Attrs[] }) {
      state.attrs = payload.attrs;
    },
    // 设置属性的值
    [Types.SET_PARAMS](state: { attrs: Attrs[]; params: string[] }) {
      if (state.attrs.length > 0) {
        state.params = [];
        for (let i = 0; i < state.attrs.length; i++) {
          for (let j = 0; j < state.attrs[i].param.length; j++) {
            if (state.attrs[i].param[j].active) {
              state.params.push(state.attrs[i].param[j].pid);
            }
          }
        }
      }
    },
    [Types.RESET_SCREEN](state: {
      cid: string;
      priceData: Price;
      minPrice: string;
      maxPrice: string;
      attrs: Attrs[];
      params: string[];
    }) {
      state.cid = "";

      // 重置价格
      if (state.priceData.items.length > 0) {
        for (let i = 0; i < state.priceData.items.length; i++) {
          if (state.priceData.items[i].active) {
            state.priceData.items[i].active = false;
            break;
          }
        }
        state.minPrice = "";
        state.maxPrice = "";
      }

      // 重置属性
      if (state.attrs.length > 0) {
        for (let i = 0; i < state.attrs.length; i++) {
          for (let j = 0; j < state.attrs[i].param.length; j++) {
            if (state.attrs[i].param[j].active) {
              state.attrs[i].param[j].active = false;
            }
          }
        }
        state.params = [];
      }
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
    // 选择分类
    selectClassify(conText: any, payload: { index: number }) {
      // console.log(conText);
      // 搜索页跨页面读取（首页）数据
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

        const cid = conText.rootState.goods.classifys[payload.index].active
          ? conText.rootState.goods.classifys[payload.index].cid
          : "";
        conText.commit(Types.SET_CID, { cid: cid });
      }
    },
    // 获取商品搜索结果
    getSearch(
      { commit }: any,
      payload: {
        keyword: string;
        page?: number;
        otype: string;
        cid: string;
        price1: string;
        price2: string;
        param: string;
        success: (pageNum: number) => void;
      }
    ) {
      getSearchData(payload).then(
        (res: {
          code: number;
          data: SearchData[];
          pageinfo: PageInfo;
          status: number;
        }) => {
          let pageNum = 0;
          if (res.code === 200) {
            pageNum = parseInt(res.pageinfo.pagenum);
            commit(Types.SET_SEARCH_DATA, {
              searchData: res.data,
              total: res.pageinfo.total,
            });
          } else {
            pageNum = 0;
            commit(Types.SET_SEARCH_DATA, { searchData: [], total: 0 });
          }
          if (payload.success) {
            payload.success(pageNum);
          }
        }
      );
    },
    getSearchPage(
      { commit }: any,
      payload: {
        keyword: string;
        page?: number;
        otype: string;
        cid: string;
        price1: string;
        price2: string;
        param: string;
        success: () => void;
      }
    ) {
      getSearchData(payload).then(
        (res: {
          code: number;
          data: SearchData[];
          pageinfo: PageInfo;
          status: number;
        }) => {
          if (res.code === 200) {
            commit(Types.SET_SEARCH_DATA_PAGE, { searchData: res.data });
            if (payload.success) {
              payload.success();
            }
          }
        }
      );
    },
    // 获取商品属性
    getAttrs(
      { commit }: any,
      payload: { keyword: string; success: () => void }
    ) {
      getAttrsData(payload.keyword).then(
        (res: { code: number; data: Attrs[]; status: number }) => {
          if (res.code === 200) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].isHide = false;
              for (let j = 0; j < res.data[i].param.length; j++) {
                res.data[i].param[j].active = false;
              }
            }
            commit(Types.SET_ATTRS, { attrs: res.data });
          } else {
            commit(Types.SET_ATTRS, { attrs: [] });
          }
          if (payload.success) {
            payload.success();
          }
        }
      );
    },
    // 筛选面板重置
    resetScreen(conText: any) {
      // 重置分类
      if (conText.rootState.goods.classifys.length > 0) {
        for (let i = 0; i < conText.rootState.goods.classifys.length; i++) {
          if (conText.rootState.goods.classifys[i].active) {
            conText.rootState.goods.classifys[i].active = false;
            break;
          }
        }
      }

      conText.commit(Types.RESET_SCREEN);
    },
  },
};
