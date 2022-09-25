import { getHotKeywordData } from "@/api/search";
import { HotKeyword } from "./interface";
import * as Types from "./types";

export default {
  namespaced: true,
  state: {
    historyKeywords: localStorage["historyKeywords"]
      ? JSON.parse(localStorage["historyKeywords"])
      : [],
    hotKeywords: [],
  },
  mutations: {
    [Types.SET_KEYWORDS](
      state: { historyKeywords: string[] },
      payload: { historyKeywords: string[] }
    ) {
      state.historyKeywords = payload.historyKeywords;
      localStorage["historyKeywords"] = JSON.stringify(state.historyKeywords);
    },
    [Types.CLEAR_KEYWORDS](state: { historyKeywords: string[] }) {
      state.historyKeywords = [];
      localStorage.removeItem("historyKeywords");
    },
    [Types.SET_HOTKEYWORD](
      state: { hotKeywords: HotKeyword[] },
      payload: { hotKeywords: HotKeyword[] }
    ) {
      state.hotKeywords = payload.hotKeywords;
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
  },
};
