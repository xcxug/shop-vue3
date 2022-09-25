import config from "@/assets/js/conf/config";
import { request } from "@/assets/js/utils/request";

// 首页轮播图
function getSwiperData() {
  return request(config.baseApi + "/home/index/slide?token=" + config.token);
}

// 首页快速导航
function getNavsData() {
  return request(config.baseApi + "/home/index/nav?token=" + config.token);
}

// 首页核心产品
function getGoodsData() {
  return request(
    config.baseApi + "/home/index/goodsLevel?token=" + config.token
  );
}

// 首页推荐
function getRecomGoodsData() {
  return request(config.baseApi + "/home/index/recom?token=" + config.token);
}

export { getSwiperData, getNavsData, getGoodsData, getRecomGoodsData };
