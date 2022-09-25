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
  },
  actions: {
    getReviews(conText: any, payload: { gid: string; success: () => void }) {
      getReviewsData(payload.gid).then(
        (res: {
          code: number;
          data: Reviews[];
          pageinfo: Pageinfo;
          status: number;
        }) => {
          if (res.code === 200) {
            conText.commit(Types.SET_REVIEWS, {
              reviews: res.data,
              total: res.pageinfo.total,
            });
            if (payload.success) {
              payload.success();
            }
          } else {
            conText.commit(Types.SET_REVIEWS, { reviews: [], total: 0 });
          }
        }
      );
    },
  },
};
