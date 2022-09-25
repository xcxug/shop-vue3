import { CartData } from "./interface";
import * as Types from "./types";

export default {
  namespaced: true,
  state: {
    cartData: localStorage["cartData"]
      ? JSON.parse(localStorage["cartData"])
      : [],
  },
  mutations: {
    // 添加购物车商品
    [Types.ADD_ITEM](
      state: { cartData: CartData[] },
      payload: { cartData: CartData }
    ) {
      let isSame = false;
      if (state.cartData.length > 0) {
        for (let i = 0; i < state.cartData.length; i++) {
          if (
            state.cartData[i].gid === payload.cartData.gid &&
            JSON.stringify(state.cartData[i].attrs) ===
              JSON.stringify(payload.cartData.attrs)
          ) {
            isSame = true;
            state.cartData[i].amount =
              state.cartData[i].amount + payload.cartData.amount;
            break;
          }
        }
      }
      if (!isSame) {
        state.cartData.push(payload.cartData);
      }
      localStorage["cartData"] = JSON.stringify(state.cartData);
    },
    // 删除商品
    [Types.DEL_ITEM](
      state: { cartData: CartData[] },
      payload: { index: number }
    ) {
      state.cartData.splice(payload.index, 1);
      localStorage["cartData"] = JSON.stringify(state.cartData);
    },
    // 选择商品
    [Types.SELECT_ITEM](
      state: { cartData: CartData[] },
      payload: { index: number }
    ) {
      state.cartData[payload.index].checked =
        !state.cartData[payload.index].checked;
      localStorage["cartData"] = JSON.stringify(state.cartData);
    },
    // 减少数量
    [Types.DEC_AMOUNT](
      state: { cartData: CartData[] },
      payload: { index: number }
    ) {
      state.cartData[payload.index].amount =
        state.cartData[payload.index].amount > 1
          ? --state.cartData[payload.index].amount
          : 1;
      localStorage["cartData"] = JSON.stringify(state.cartData);
    },
    // 更改数量
    [Types.SET_AMOUNT](
      state: { cartData: CartData[] },
      payload: { index: number; amount: string }
    ) {
      let amount = payload.amount;
      amount = amount.replace(/[^\d]/g, "");
      state.cartData[payload.index].amount = Number(amount);
      if (!amount || amount === "0") {
        state.cartData[payload.index].amount = 1;
      }
      localStorage["cartData"] = JSON.stringify(state.cartData);
    },
    // 增加数量
    [Types.INC_AMOUNT](
      state: { cartData: CartData[] },
      payload: { index: number }
    ) {
      state.cartData[payload.index].amount += 1;
      localStorage["cartData"] = JSON.stringify(state.cartData);
    },
    // 全选/反选
    [Types.ALL_SELECT_ITEM](
      state: { cartData: CartData[] },
      payload: { checked: boolean }
    ) {
      if (state.cartData.length > 0) {
        for (let i = 0; i < state.cartData.length; i++) {
          state.cartData[i].checked = payload.checked;
        }
        localStorage["cartData"] = JSON.stringify(state.cartData);
      }
    },
  },
  getters: {
    // 运费
    freight(state: { cartData: CartData[] }) {
      if (state.cartData.length > 0) {
        const freights = [];
        for (let i = 0; i < state.cartData.length; i++) {
          if (state.cartData[i].checked) {
            freights.push(state.cartData[i].freight);
          }
        }
        return freights.length > 0 ? Math.max.apply(null, freights) : 0;
      } else {
        return 0;
      }
    },
    // 计算总金额
    total(state: { cartData: CartData[] }) {
      if (state.cartData.length > 0) {
        let total = 0;
        for (let i = 0; i < state.cartData.length; i++) {
          if (state.cartData[i].checked) {
            total += state.cartData[i].price * state.cartData[i].amount;
          }
        }
        return parseFloat(total.toFixed(2));
      } else {
        return 0;
      }
    },
  },
};
