<template>
  <div class="page">
    <SubHeader title="下单成功"></SubHeader>
    <div class="main">
      <div class="list success">下单成功！</div>
      <div class="list ordernum">订单编号：{{ orderNum }}</div>
      <div class="list" @click="$router.push('/user/order')">查看订单</div>
      <div class="pay-btn">去付款</div>
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
  getCurrentInstance,
} from "vue";
import { useStore } from "vuex";
import SubHeader from "@/components/sub_header";

export default defineComponent({
  name: "order-end",
  components: {
    SubHeader,
  },
  setup() {
    const { proxy }: any = getCurrentInstance();
    const store = useStore();

    let state = reactive<{
      orderNum: any;
    }>({
      orderNum: computed(() => store.state.order.orderNum),
    });

    onBeforeMount(() => {
      proxy.$utils.safeUser();
      getOrderNum();
    });

    let getOrderNum = () => {
      store.dispatch("order/getOrderNum");
    };

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
}

.main {
  width: 100%;
  margin-top: 1.3rem;
}

.main .list {
  width: 100%;
  font-size: 0.32rem;
  text-align: center;
  margin-bottom: 0.2rem;
}

.main .list.success {
  color: #e51b19;
}

.main .list.ordernum {
  color: #f17f1f;
}

.main .pay-btn {
  width: 3.2rem;
  height: 0.6rem;
  font-size: 0.28rem;
  color: #ffffff;
  text-align: center;
  margin: 0 auto;
  background-color: #0a8ddf;
  line-height: 0.6rem;
  border-radius: 4px;
}
</style>
