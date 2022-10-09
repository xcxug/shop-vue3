import { getReviewsData } from "@/api/goods/review";
import { Reviews, Pageinfo } from "./interface";
import * as Types from "./types";

export default {
  namespaced: true,
  state: {
    reviews: [],
    total: 0,
  },
  mutations: {
    [Types.SET_REVIEWS](
      state: { reviews: Reviews[]; total: number },
      payload: { reviews: Reviews[]; total: number }
    ) {
      state.reviews = payload.reviews;
      state.total = payload.total;
    },
    [Types.SET_REVIEWS_PAGE](
      state: { reviews: Reviews[] },
      payload: { reviews: Reviews[] }
    ) {
      state.reviews.push(...payload.reviews);
    },
  },
  actions: {
    getReviews(
      conText: any,
      payload: { gid: string; success: (pageNum: number) => void }
    ) {
      getReviewsData(payload.gid).then(
        (res: {
          code: number;
          data: Reviews[];
          pageinfo: Pageinfo;
          status: number;
        }) => {
          let pageNum = 0;
          if (res.code === 200) {
            conText.commit(Types.SET_REVIEWS, {
              reviews: res.data,
              total: res.pageinfo.total,
            });
            pageNum = parseInt(res.pageinfo.pagenum);
          } else {
            conText.commit(Types.SET_REVIEWS, { reviews: [], total: 0 });
            pageNum = 0;
          }
          if (payload.success) {
            payload.success(pageNum);
          }
        }
      );
    },
    getReviewsPage({ commit }: any, payload: { gid: string; page: number }) {
      getReviewsData(payload.gid, payload.page).then(
        (res: {
          code: number;
          data: Reviews[];
          pageinfo: Pageinfo;
          status: number;
        }) => {
          if (res.code === 200) {
            commit(Types.SET_REVIEWS_PAGE, { reviews: res.data });
          }
        }
      );
    },
  },
};
