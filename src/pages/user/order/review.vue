<template>
  <div>
    <div
      class="order-list"
      v-for="(item, index) in reviewOrders"
      :key="index"
      @click="$router.push('/user/order/details?ordernum=' + item.ordernum)"
    >
      <div class="ordernum-wrap">
        <div class="ordernum">订单编号：{{ item.ordernum }}</div>
        <div class="status">
          {{
            item.status === "0"
              ? "待付款"
              : item.status === "1"
              ? "待收货"
              : "已收货"
          }}
        </div>
      </div>
      <div
        class="item-list"
        v-for="(item2, index2) in item.goods"
        :key="index2"
      >
        <div class="image">
          <img
            :data-echo="item2.image"
            src="../../../assets/images/common/lazyImg.jpg"
            alt=""
          />
        </div>
        <div class="title">{{ item2.title }}</div>
        <div class="amount">x {{ item2.amount }}</div>
        <div
          class="status-btn"
          @click.stop="
            $router.push(
              '/user/order/add_review?gid=' +
                item2.gid +
                '&ordernum=' +
                item.ordernum
            )
          "
        >
          {{ item2.isreview === "0" ? "评价" : "追加评价" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onBeforeMount,
  onUnmounted,
  nextTick,
  getCurrentInstance,
} from "vue";
import { useStore } from "vuex";
import UpRefresh from "@/assets/js/libs/uprefresh";

export default defineComponent({
  name: "order-reivew",
  setup() {
    const { proxy }: any = getCurrentInstance();
    const store = useStore();

    let state = reactive<{
      reviewOrders: any;
      pullUp: any;
    }>({
      reviewOrders: computed(() => store.state.order.reviewOrders),
      pullUp: {},
    });

    onBeforeMount(() => {
      proxy.$utils.safeUser();

      state.pullUp = new UpRefresh();

      getReviewOrder();
    });

    onUnmounted(() => {
      state.pullUp.uneventSrcoll();
    });

    let getReviewOrder = () => {
      store.dispatch("order/getReviewOrder", {
        page: 1,
        success: (pageNum: number) => {
          nextTick(() => {
            proxy.$utils.lazyImg();
          });

          state.pullUp.init(
            { curPage: 1, maxPage: pageNum, offsetBottom: 100 },
            (page: number) => {
              store.dispatch("order/getReviewOrderPage", {
                page: page,
                success: () => {
                  proxy.$utils.lazyImg();
                },
              });
            }
          );
        },
      });
    };

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
.order-list {
  width: 100%;
  height: auto;
}

.order-list .ordernum-wrap {
  width: 96%;
  height: 0.8rem;
  border-bottom: #efefef 1px solid;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  padding-left: 2%;
  padding-right: 2%;
  align-items: center;
  -webkit-align-items: center;
}

.order-list .ordernum-wrap .ordernum,
.order-list .ordernum-wrap .status {
  width: auto;
  height: auto;
  font-size: 0.28rem;
}

.item-list {
  width: 100%;
  height: 2.4rem;
  border-bottom: #efefef 1px solid;
  position: relative;
  z-index: 1;
}

.item-list .image {
  width: 1.2rem;
  height: 1.2rem;
  position: absolute;
  z-index: 1;
  left: 2%;
  top: 0.2rem;
}

.item-list .image img {
  width: 100%;
  height: 100%;
}

.item-list .title {
  width: 72%;
  height: auto;
  font-size: 0.28rem;
  position: absolute;
  z-index: 1;
  left: 22%;
  top: 0.2rem;
}

.item-list .amount {
  width: auto;
  height: auto;
  position: absolute;
  z-index: 1;
  right: 2%;
  bottom: 0.8rem;
  font-size: 0.24rem;
  color: #909090;
}

.item-list .status-btn {
  font-size: 0.24rem;
  width: 1.24rem;
  height: 0.52rem;
  line-height: 0.52rem;
  text-align: center;
  border: 1px solid #f15353;
  border-radius: 4px;
  position: absolute;
  z-index: 1;
  right: 2%;
  bottom: 0.2rem;
}

.total-wrap {
  width: 96%;
  height: 0.8rem;
  border-bottom: 1px solid #f17f1f;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  padding-left: 2%;
  padding-right: 2%;
}

.total-wrap .total {
  font-size: 0.28rem;
}
</style>
