import {
  addOrderData,
  getOrderNumData,
  getMyOrderData,
  cancelOrderData,
  sureOrderData,
  getOrderInfoData,
} from "@/api/order";
import {
  OrderNumData,
  MyOrderData,
  Pageinfo,
  OrderInfoData,
} from "./interface";
import * as Types from "./types";

export default {
  namespaced: true,
  state: {
    orderNum: "",
    orders: [],
    orderInfo: {},
  },
  mutations: {
    [Types.SET_ORDERNUM](
      state: { orderNum: string },
      payload: { orderNum: string }
    ) {
      state.orderNum = payload.orderNum;
    },
    // 我的订单
    [Types.SET_ORDERS](
      state: { orders: MyOrderData[] },
      payload: { orders: MyOrderData[] }
    ) {
      state.orders = payload.orders;
    },
    // 我的订单分页
    [Types.SET_ORDERS_PAGE](
      state: { orders: MyOrderData[] },
      payload: { orders: MyOrderData[] }
    ) {
      state.orders.push(...payload.orders);
    },
    // 取消订单
    [Types.DEL_ORDERS](
      state: { orders: MyOrderData[] },
      payload: { index: number }
    ) {
      state.orders.splice(payload.index, 1);
    },
    // 改变订单状态
    [Types.SET_STATUS](
      state: { orders: MyOrderData[] },
      payload: { index: number; status: string }
    ) {
      state.orders[payload.index].status = payload.status;
    },
    // 设置订单详情
    [Types.SET_ORDER_INFO](
      state: { orderInfo: OrderInfoData },
      payload: { orderInfo: OrderInfoData }
    ) {
      state.orderInfo = payload.orderInfo;
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
    // 获取我的订单
    getMyOrder(
      conText: any,
      payload: {
        status: string;
        page: number;
        success: (pageNum: number) => void;
      }
    ) {
      getMyOrderData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res: {
          code: number;
          data: MyOrderData[];
          pageinfo: Pageinfo;
          status: number;
        }) => {
          let pageNum = 0;
          if (res.code === 200) {
            pageNum = parseInt(res.pageinfo.pagenum);
            conText.commit(Types.SET_ORDERS, { orders: res.data });
          } else {
            pageNum = 0;
            conText.commit(Types.SET_ORDERS, { orders: [] });
          }
          if (payload.success) {
            payload.success(pageNum);
          }
        }
      );
    },
    // 我的订单分页
    getMyOrderPage(conText: any, payload: { status: string; page: number }) {
      getMyOrderData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res: {
          code: number;
          data: MyOrderData[];
          pageinfo: Pageinfo;
          status: number;
        }) => {
          if (res.code === 200) {
            conText.commit(Types.SET_ORDERS_PAGE, { orders: res.data });
          }
        }
      );
    },
    // 取消订单
    cancelOrder(conText: any, payload: { index: number; orderNum: string }) {
      cancelOrderData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res: { code: number; data: string; status: number }) => {
          if (res.code === 200) {
            conText.commit(Types.DEL_ORDERS, { index: payload.index });
          }
        }
      );
    },
    // 确认订单
    sureOrder(
      conText: any,
      payload: { index: number; orderNum: string; status: string }
    ) {
      sureOrderData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res: { code: number; data: string; status: number }) => {
          console.log(res);
          if (res.code === 200) {
            conText.commit(Types.SET_STATUS, {
              index: payload.index,
              status: payload.status,
            });
          }
        }
      );
    },
    // 订单详情
    getOrderInfo(conText: any, payload: { orderNum: string }) {
      getOrderInfoData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res: { code: number; data: OrderInfoData; status: number }) => {
          if (res.code === 200) {
            conText.commit(Types.SET_ORDER_INFO, {
              orderInfo: {
                ordernum: res.data.ordernum,
                name: res.data.name,
                cellphone: res.data.cellphone,
                status: res.data.status,
                province: res.data.province,
                city: res.data.city,
                area: res.data.area,
                address: res.data.address,
                freight: res.data.freight,
                total: res.data.total,
                truetotal: res.data.truetotal,
                ordertime: res.data.ordertime,
                goods: res.data.goods,
              },
            });
          }
        }
      );
    },
  },
};
