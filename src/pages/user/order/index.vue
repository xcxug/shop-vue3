<template>
  <div class="page">
    <SubHeader :title="headerTitle"></SubHeader>
    <OrderTags :status="status"></OrderTags>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  getCurrentInstance,
} from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import SubHeader from "@/components/sub_header";
import OrderTags from "@/components/order_tags";

export default defineComponent({
  name: "my-order",
  components: {
    SubHeader,
    OrderTags,
  },
  setup() {
    const { proxy }: any = getCurrentInstance();
    const router = useRouter();

    let state = reactive<{
      status: string;
      headerTitle: string;
    }>({
      status: "all",
      headerTitle: "全部订单",
    });

    onBeforeMount(() => {
      proxy.$utils.safeUser();

      state.status = (router.currentRoute.value.query.status as string)
        ? (router.currentRoute.value.query.status as string)
        : "all";
    });

    onMounted(() => {
      getTitle();
    });

    onBeforeRouteUpdate((to, form, next) => {
      state.status = to.query.status as string;
      getTitle();
      next();
    });

    let getTitle = () => {
      switch (state.status) {
        case "all":
          state.headerTitle = "全部订单";
          document.title = state.headerTitle;
          break;
        case "0":
          state.headerTitle = "待付款";
          document.title = state.headerTitle;
          break;
        case "1":
          state.headerTitle = "待收货";
          document.title = state.headerTitle;
          break;
        case "2":
          state.headerTitle = "待评价";
          document.title = state.headerTitle;
          break;
        default:
          state.headerTitle = "全部订单";
          document.title = state.headerTitle;
          break;
      }
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
}

.main {
  width: 100%;
  padding-top: 1.9rem;
}
</style>
