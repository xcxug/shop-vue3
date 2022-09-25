<template>
  <div ref="goodsClassifyContent" class="goods-content-main">
    <div v-show="goods.length > 0">
      <div class="goods-wrap" v-for="(item, index) in goods" :key="index">
        <div class="classify-name">{{ item.title }}</div>
        <div class="goods-items-wrap">
          <ul
            v-for="(item2, index2) in item.goods"
            :key="index2"
            @click="$router.push('/goods/details?gid=' + item2.gid)"
          >
            <li>
              <img
                src="../../../assets/images/common/lazyImg.jpg"
                :data-echo="item2.image"
                alt=""
              />
            </li>
            <li>{{ item2.title }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div v-show="goods.length <= 0" class="no-data">没有相关商品！</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  nextTick,
  getCurrentInstance,
} from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import IScroll from "@/assets/js/libs/iscroll";

export default defineComponent({
  name: "component-classify-item",
  setup() {
    const { proxy }: any = getCurrentInstance();
    const router = useRouter();
    const store = useStore();

    let goodsClassifyContent = ref<HTMLElement | null>(null);

    let state = reactive<{ goods: any; cid: string; myScroll: any }>({
      goods: computed(() => store.state.goods.goods),
      cid: "",
      myScroll: {},
    });

    onBeforeMount(() => {
      state.cid = (router.currentRoute.value.query.cid as string)
        ? (router.currentRoute.value.query.cid as string)
        : "";
      init(state.cid);
    });

    onMounted(() => {
      goodsClassifyContent.value?.addEventListener(
        "touchmove",
        scrollPreventDefault
      );
      state.myScroll = new IScroll(goodsClassifyContent.value, {
        scrollX: false,
        scrollY: true,
        preventDefault: false,
      });

      // 滚动结束
      state.myScroll.on("scrollEnd", () => {
        proxy.$utils.lazyImg();
      });
    });

    onUnmounted(() => {
      goodsClassifyContent.value?.removeEventListener(
        "touchmove",
        scrollPreventDefault
      );
    });

    // 在当前路由改变，但是该组件被复用时调用
    onBeforeRouteUpdate((to, form, next) => {
      // console.log(to.query.cid);
      init(to.query.cid as string);
      next();
    });

    let scrollPreventDefault = (e: { preventDefault: () => void }) => {
      e.preventDefault();
    };

    let init = (cid: string) => {
      store.dispatch("goods/getGoods", {
        cid,
        success: () => {
          nextTick(() => {
            // 刷新
            state.myScroll.refresh();

            proxy.$utils.lazyImg();
          });
        },
      });
    };

    return {
      goodsClassifyContent,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
.goods-content-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.goods-wrap {
  width: 100%;
  height: auto;
}

.goods-wrap .classify-name {
  font-size: 0.28rem;
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  overflow: hidden;
}

.goods-wrap .goods-items-wrap {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  padding-top: 0.2rem;
  overflow: hidden;
}

.goods-wrap .goods-items-wrap ul {
  width: 32%;
  height: auto;
  float: left;
  margin-left: 0.5%;
  margin-right: 0.5%;
  margin-bottom: 0.2rem;
}

.goods-wrap .goods-items-wrap ul li:nth-child(1) {
  width: 1.5rem;
  height: 1.5rem;
  overflow: hidden;
  margin: 0 auto;
  text-align: center;
}

.goods-wrap .goods-items-wrap ul li:nth-child(1) img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.goods-wrap .goods-items-wrap ul li:nth-child(2) {
  width: 90%;
  height: 0.8rem;
  font-size: 0.24rem;
  overflow: hidden;
  text-align: center;
  margin: 0 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 0.2rem;
}
</style>
