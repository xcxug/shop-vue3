import { addOrderData, getOrderNumData } from "@/api/order";
import { OrderNumData } from "./interface";
import * as Types from "./types";

export default {
  namespaced: true,
  state: {
    orderNum: "",
  },
  mutations: {
    [Types.SET_ORDERNUM](
      state: { orderNum: string },
      payload: { orderNum: string }
    ) {
      state.orderNum = payload.orderNum;
    },
  },
  actions: {
    // 提交订单
    addOrder(
      conText: any,
      payload: {
        freight: number;
        goodsData: string;
        addsid: string;
        success: (res: { code: number; data: string; status: number }) => void;
      }
    ) {
      addOrderData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res: { code: number; data: string; status: number }) => {
          if (payload.success) {
            payload.success(res);
          }
        }
      );
    },
    // 获取订单编号
    getOrderNum(conText: any) {
      getOrderNumData(conText.rootState.user.uid).then(
        (res: { code: number; data: OrderNumData; status: number }) => {
          if (res.code === 200) {
            conText.commit(Types.SET_ORDERNUM, { orderNum: res.data.ordernum });
          }
        }
      );
    },
  },
};
