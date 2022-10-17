<template>
  <div class="page">
    <SubHeader title="我的收藏"></SubHeader>
    <div class="main">
      <div class="goods-list" v-for="(item, index) in favs" :key="index">
        <div class="image">
          <img
            :data-echo="item.image"
            src="../../../assets/images/common/lazyImg.jpg"
            alt=""
          />
        </div>
        <div class="title">{{ item.title }}</div>
        <div class="price">¥{{ item.price }}</div>
        <div class="btn-wrap">
          <div
            class="btn"
            @click="$router.push('/goods/details?gid=' + item.gid)"
          >
            购买
          </div>
          <div class="btn" @click="delFav(index, item.fid)">删除</div>
        </div>
      </div>
    </div>
    <div class="no-data" v-show="false">您还没有收藏商品！</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  nextTick,
  getCurrentInstance,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Dialog } from "vant";
import UpRefresh from "@/assets/js/libs/uprefresh";
import SubHeader from "@/components/sub_header";

export default defineComponent({
  name: "component-fav",
  components: {
    SubHeader,
  },
  setup() {
    const { proxy }: any = getCurrentInstance();
    const router = useRouter();
    const store = useStore();

    let state = reactive<{
      favs: any;
      pullUp: any;
    }>({
      favs: computed(() => store.state.user.favs),
      pullUp: {},
    });

    onBeforeMount(() => {
      proxy.$utils.safeUser();

      state.pullUp = new UpRefresh();

      getFav();
    });

    onMounted(() => {
      document.title = router.currentRoute.value.meta.title as string;
    });

    onUnmounted(() => {
      state.pullUp.uneventSrcoll();
    });

    let getFav = () => {
      store.dispatch("user/getFav", {
        page: 1,
        success: (pageNum: number) => {
          nextTick(() => {
            proxy.$utils.lazyImg();
          });

          state.pullUp.init(
            { curPage: 1, maxPage: pageNum, offsetBottom: 100 },
            (page: number) => {
              store.dispatch("user/getFavPage", {
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

    // 删除收藏
    let delFav = (index: number, fid: string) => {
      Dialog.confirm({
        title: "",
        message: "确认要删除吗？",
      })
        .then(() => {
          store.dispatch("user/delFav", {
            index: index,
            fid: fid,
          });
        })
        .catch(() => {
          // 什么也不做
        });
    };

    return {
      ...toRefs(state),
      delFav,
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
  padding-top: 1.2rem;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  box-sizing: border-box;
  padding-left: 2%;
  padding-right: 2%;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
}

.main .goods-list {
  width: 48%;
  height: 5.8rem;
  margin-bottom: 0.3rem;
  overflow: hidden;
}

.main .goods-list .image {
  width: 3.36rem;
  height: 3.35rem;
  margin: 0 auto;
}

.main .goods-list .image img {
  width: 100%;
  height: 100%;
  border: 0 none;
}

.main .goods-list .title {
  width: 100%;
  height: 0.8rem;
  overflow: hidden;
  font-size: 0.28rem;
  margin-top: 0.2rem;
}

.main .goods-list .price {
  font-size: 0.28rem;
  color: #f93036;
  margin-top: 0.2rem;
}

.main .goods-list .btn-wrap {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  margin-top: 0.2rem;
}

.main .goods-list .btn-wrap .btn {
  width: 1.04rem;
  height: 0.52rem;
  border: 1px solid #f93036;
  font-size: 0.28rem;
  color: #f93036;
  border-radius: 4px;
  text-align: center;
  line-height: 0.52rem;
}
</style>
