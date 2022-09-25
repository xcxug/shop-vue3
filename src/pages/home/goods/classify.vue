<template>
  <div class="page">
    <div class="search-header">
      <div class="back" @click="goBack()"></div>
      <div class="search">请输入宝贝名称</div>
    </div>
    <div class="goods-main">
      <div ref="scrollClassify" class="classify-wrap">
        <div>
          <div
            :ref="classifyItem"
            :class="{ 'classify-item': true, active: item.active }"
            v-for="(item, index) in classifys"
            :key="index"
            @click="
              replacePage('/goods/classify/item?cid=' + item.cid + '', index)
            "
          >
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="goods-content">
        <router-view></router-view>
      </div>
    </div>
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
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import IScroll from "@/assets/js/libs/iscroll";

export default defineComponent({
  name: "component-classify",
  setup() {
    const router = useRouter();
    const store = useStore();

    let scrollClassify = ref<HTMLElement | null>(null);
    let elClassifyItem = reactive<any[]>([]);
    let classifyItem = (el: any) => {
      elClassifyItem.push(el);
    };

    let state = reactive<{ classifys: any; cid: string; myScroll: any }>({
      classifys: computed(() => store.state.goods.classifys),
      cid: "",
      myScroll: {},
    });

    onBeforeMount(() => {
      state.cid = (router.currentRoute.value.query.cid as string)
        ? (router.currentRoute.value.query.cid as string)
        : "";
      getClassify();
    });

    onMounted(() => {
      document.title = router.currentRoute.value.meta.title as string;
      scrollClassify.value?.addEventListener("touchmove", scrollPreventDefault);
      state.myScroll = new IScroll(scrollClassify.value, {
        scrollX: false,
        scrollY: true,
        preventDefault: false,
      });
    });

    onUnmounted(() => {
      scrollClassify.value?.removeEventListener(
        "touchmove",
        scrollPreventDefault
      );
    });

    let scrollPreventDefault = (e: { preventDefault: () => void }) => {
      e.preventDefault();
    };

    let getClassify = () => {
      store.dispatch("goods/getClassify", {
        success: () => {
          nextTick(() => {
            // 刷新
            state.myScroll.refresh();

            if (state.classifys.length > 0 && state.cid) {
              let i = 0;
              for (; i < state.classifys.length; i++) {
                if (state.classifys[i].cid === state.cid) {
                  break;
                }
              }
              selectItem(i);
            } else {
              selectItem(0);
            }
          });
        },
      });
    };

    let replacePage = (url: string, index: number) => {
      router.replace(url);

      selectItem(index);
    };

    let selectItem = (index: number) => {
      // 点击中间部分区域有动画效果
      let topHeight = elClassifyItem[0].offsetHeight * index;
      let halfHeight = (scrollClassify.value?.offsetHeight as number) / 3;
      let bottomHeight =
        (scrollClassify.value?.scrollHeight as number) - topHeight;
      if (
        topHeight > halfHeight &&
        bottomHeight > (scrollClassify.value?.offsetHeight as number)
      ) {
        // 滚动到相对于当前位置的某处
        state.myScroll.scrollTo(
          0,
          -topHeight,
          1000,
          (IScroll.utils.ease as any).elastic
        );
      }

      store.commit("goods/SELECT_ITEM", { index: index });
    };

    let goBack = () => {
      router.go(-1);
    };

    return {
      scrollClassify,
      elClassifyItem,
      ...toRefs(state),
      classifyItem,
      replacePage,
      goBack,
    };
  },
});
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.search-header {
  width: 100%;
  height: 1rem;
  background: #ffffff;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  border-bottom: 1px solid #efefef;
}

.search-header .back {
  width: 0.8rem;
  height: 0.8rem;
  background-image: url("../../../assets/images/home/goods/back.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.search-header .search {
  width: 80%;
  height: 0.69rem;
  border: solid 1px #b2b2b2;
  border-radius: 0.1rem;
  font-size: 0.28rem;
  color: #626262;
  line-height: 0.69rem;
  padding-left: 0.2rem;
}

.goods-main {
  width: 100%;
  height: 92.5vh;
  display: flex;
  display: -webkit-flex;
}

.goods-main .classify-wrap {
  width: 1.72rem;
  height: 100%;
  overflow: hidden;
  margin-right: 3%;
  position: relative;
  z-index: 1;
}

.goods-main .classify-wrap .classify-item {
  width: 100%;
  height: 0.8rem;
  border-bottom: 1px solid #efefef;
  background-color: #ffffff;
  font-size: 0.28rem;
  text-align: center;
  line-height: 0.8rem;
  overflow: hidden;
}

.goods-main .classify-wrap .classify-item.active {
  color: #ff0000;
}

.goods-main .goods-content {
  width: 71%;
  height: 100%;
}
</style>
