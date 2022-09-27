import config from "@/assets/js/conf/config";
import { request } from "@/assets/js/utils/request";
import {
  DelAddressData,
  AddAddressData,
  AddressInfoData,
  ModAddressData,
} from "./interface";

// 收货地址列表
function getAddresData(uid: string) {
  return request(
    config.baseApi + "/user/address/index?uid=" + uid + "&token=" + config.token
  );
}

// 删除收货地址
function delAddressData(params: DelAddressData) {
  return request(
    config.baseApi +
      "/user/address/del?uid=" +
      params.uid +
      "&aid=" +
      params.aid +
      "&token=" +
      config.token
  );
}

// 添加收货地址
function addAddressData(params: AddAddressData) {
  return request(
    config.baseApi + "/user/address/add?token=" + config.token,
    "post",
    params
  );
}

// 收货地址详情
function getAddressInfoData(params: AddressInfoData) {
  return request(
    config.baseApi +
      "/user/address/info?uid=" +
      params.uid +
      "&aid=" +
      params.aid +
      "&token=" +
      config.token
  );
}

// 修改收货地址
function modAddressData(params: ModAddressData) {
  return request(
    config.baseApi + "/user/address/mod?token=" + config.token,
    "post",
    params
  );
}

// 获取默认地址
function getDefaultAddressData(uid: string) {
  return request(
    config.baseApi +
      "/user/address/defaultAddress?uid=" +
      uid +
      "&token=" +
      config.token
  );
}

export {
  getAddresData,
  delAddressData,
  addAddressData,
  getAddressInfoData,
  modAddressData,
  getDefaultAddressData,
};
