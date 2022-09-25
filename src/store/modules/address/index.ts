import { getAddresData, delAddressData, addAddressData } from "@/api/address";
import { Address, AddAddressData } from "./interface";
import * as Types from "./types";

export default {
  namespaced: true,
  state: {
    address: [],
  },
  mutations: {
    [Types.SET_ADDRESS](
      state: { address: Address[] },
      payload: { address: Address[] }
    ) {
      state.address = payload.address;
    },
    // 删除收货地址
    [Types.DEL_ADDRESS](
      state: { address: Address[] },
      payload: { index: number }
    ) {
      state.address.splice(payload.index, 1);
    },
  },
  actions: {
    // 获取收货地址
    getAddress(conText: any) {
      getAddresData(conText.rootState.user.uid).then(
        (res: { code: number; data: Address[]; status: number }) => {
          if (res.code === 200) {
            conText.commit(Types.SET_ADDRESS, { address: res.data });
          }
        }
      );
    },
    // 删除收货地址
    delAddress(conText: any, payload: { index: string; aid: string }) {
      delAddressData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res: { code: number; data: string; status: number }) => {
          if (res.code === 200) {
            conText.commit(Types.DEL_ADDRESS, { index: payload.index });
          }
        }
      );
    },
    // 添加收货地址
    addAddress(
      conText: any,
      payload: {
        name: string;
        cellphone: string;
        address: string;
        isdefault: string;
        province: string;
        city: string;
        area: string;
        success: (res: {
          code: number;
          data: AddAddressData | string;
          status: number;
        }) => void;
      }
    ) {
      addAddressData({
        uid: conText.rootState.user.uid,
        ...payload,
      }).then(
        (res: {
          code: number;
          data: AddAddressData | string;
          status: number;
        }) => {
          if (payload.success) {
            payload.success(res);
          }
        }
      );
    },
  },
};
