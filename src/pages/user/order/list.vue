<template>
  <div>
    <div
      class="order-list"
      v-for="(item, index) in orders"
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
      </div>
      <div class="total-wrap">
        <div class="total">实付金额：¥{{ item.total }}</div>
        <div class="status-wrap">
          <div
            class="status-btn"
            v-if="item.status === '0'"
            @click="cancelOrder(index, item.ordernum)"
          >
            取消订单
          </div>
          <div class="status-btn" @click="sureOrder(index, item)">
            {{
              item.status == "0"
                ? "去付款"
                : item.status == "1"
                ? "确认收货"
                : "已收货"
            }}
          </div>
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
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import { Dialog } from "vant";
import UpRefresh from "@/assets/js/libs/uprefresh";

interface SureOrder {
  goods: Goods[];
  ordernum: string;
  status: string;
  total: number;
}

interface Goods {
  amount: string;
  gid: string;
  image: string;
  param: Param[];
  price: string;
  subtotal: string;
  title: string;
}

interface Param {
  attrid: string;
  param: ParamItem[];
  title: string;
}

interface ParamItem {
  paramid: string;
  title: string;
}

export default defineComponent({
  name: "order-list",
  setup() {
    const { proxy }: any = getCurrentInstance();
    const router = useRouter();
    const store = useStore();

    let state = reactive<{
      orders: any;
      status: string;
      pullUp: any;
    }>({
      orders: computed(() => store.state.order.orders),
      status: "all",
      pullUp: {},
    });

    onBeforeMount(() => {
      state.status = (router.currentRoute.value.query.status as string)
        ? (router.currentRoute.value.query.status as string)
        : "all";
      state.pullUp = new UpRefresh();

      getData();
    });

    onUnmounted(() => {
      state.pullUp.uneventSrcoll();
    });

    onBeforeRouteUpdate((to, form, next) => {
      state.status = to.query.status as string;
      getData();
      next();
    });

    let getData = () => {
      store.dispatch("order/getMyOrder", {
        status: state.status,
        page: 1,
        success: (pageNum: number) => {
          nextTick(() => {
            proxy.$utils.lazyImg();
          });

          state.pullUp.init(
            { curPage: 1, maxPage: pageNum, offsetBottom: 100 },
            (page: number) => {
              store.dispatch("order/getMyOrderPage", {
                status: state.status,
                page: page,
              });
            }
          );
        },
      });
    };

    // 取消订单
    let cancelOrder = (index: number, orderNum: string) => {
      Dialog.confirm({
        title: "",
        message: "确认要取消吗？",
      })
        .then(() => {
          store.dispatch("order/cancelOrder", {
            index: index,
            orderNum: orderNum,
          });
        })
        .catch(() => {
          // 什么也不做
        });
    };

    // 确认订单
    let sureOrder = (index: number, item: SureOrder) => {
      if (item.status != "2") {
        store.dispatch("order/sureOrder", {
          index: index,
          orderNum: item.ordernum,
          status: "2",
        });
      }
    };

    return {
      ...toRefs(state),
      cancelOrder,
      sureOrder,
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
  height: 1.6rem;
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
  bottom: 0.2rem;
  font-size: 0.24rem;
  color: #909090;
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

.total-wrap .status-btn {
  font-size: 0.24rem;
  width: 1.24rem;
  height: 0.52rem;
  line-height: 0.52rem;
  text-align: center;
  border: 1px solid #f15353;
  border-radius: 4px;
  margin-left: 0.2rem;
}

.total-wrap .status-wrap {
  display: flex;
  width: auto;
  justify-content: flex-end;
}
</style>
