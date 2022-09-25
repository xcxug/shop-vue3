<template>
  <div class="page">
    <div class="search-header">
      <div class="back" @click="goBack()"></div>
      <div class="search">请输入宝贝名称</div>
    </div>
    <div class="goods-main">
      <div ref="scrollClassify" class="classify-wrap">
        <div>
          <div ref="item" class="classify-item active">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item active">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item active">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item active">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item active">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item active">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item active">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
          <div ref="item" class="classify-item">潮流女装</div>
        </div>
      </div>
      <div class="goods-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import IScroll from "@/assets/js/libs/iscroll";

export default defineComponent({
  name: "component-classify",
  setup() {
    const router = useRouter();

    let scrollClassify = ref<HTMLElement | null>(null);

    onMounted(() => {
      document.title = router.currentRoute.value.meta.title as string;
      scrollClassify.value?.addEventListener("touchmove", scrollPreventDefault);
      new IScroll(scrollClassify.value, {
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

    let goBack = () => {
      router.go(-1);
    };

    return {
      scrollClassify,
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
