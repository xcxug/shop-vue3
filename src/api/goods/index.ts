import config from "@/assets/js/conf/config";
import { request } from "@/assets/js/utils/request";

// 左侧分类
function getClassifyData() {
  return request(config.baseApi + "/home/category/menu?token=" + config.token);
}

// 右侧商品
function getGoodsData(cid = "") {
  return request(
    config.baseApi + "/home/category/show?cid=" + cid + "&token=" + config.token
  );
}

// 商品详情
function getDetailsData(gid = "") {
  return request(
    config.baseApi +
      "/home/goods/info?gid=" +
      gid +
      "&type=details&token=" +
      config.token
  );
}

// 获取商品规格
function getSpecData(gid = "") {
  return request(
    config.baseApi +
      "/home/goods/info?gid=" +
      gid +
      "&type=spec&token=" +
      config.token
  );
}

export { getClassifyData, getGoodsData, getDetailsData, getSpecData };
