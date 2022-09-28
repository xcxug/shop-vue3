import config from "@/assets/js/conf/config";
import { request } from "@/assets/js/utils/request";
import { AddOrderData } from "./interface";

// 提交订单
function addOrderData(data: AddOrderData) {
  return request(
    config.baseApi + "/order/add?token=" + config.token,
    "post",
    data
  );
}

// 获取订单编号
function getOrderNumData(uid: string) {
  return request(
    config.baseApi + "/order/lastordernum?uid=" + uid + "&token=" + config.token
  );
}

export { addOrderData, getOrderNumData };
