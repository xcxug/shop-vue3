import config from "@/assets/js/conf/config";
import { request } from "@/assets/js/utils/request";
import { DelAddressData } from "./interface";

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

export { getAddresData, delAddressData };
