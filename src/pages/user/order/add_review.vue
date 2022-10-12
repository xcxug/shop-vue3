<template>
  <div class="page">
    <SubHeader title="评价"></SubHeader>
    <div class="main">
      <ul class="service" v-for="(item, index) in reviewServices" :key="index">
        <li>{{ item.title }}</li>
        <li>
          <div
            :class="{ stars: true, active: item2.active }"
            v-for="(item2, index2) in item.scores"
            :key="index2"
            @click="SET_REVIEW_SCORE(index, index2, item2.value)"
          ></div>
        </li>
      </ul>
      <div class="content-wrap">
        <textarea
          placeholder="来分享你的消费感受吧!"
          v-model="content"
        ></textarea>
      </div>
      <button class="submit" type="button" @click="submit()">提交</button>
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
  onMounted,
  getCurrentInstance,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import SubHeader from "@/components/sub_header";

export default defineComponent({
  name: "add-review",
  components: {
    SubHeader,
  },
  setup() {
    const { proxy }: any = getCurrentInstance();
    const router = useRouter();
    const store = useStore();

    let state = reactive<{
      reviewServices: any;
      uid: any;
      gid: string;
      ordernum: string;
      content: string;
      isSubmit: boolean;
    }>({
      reviewServices: computed(() => store.state.order.reviewServices),
      uid: computed(() => store.state.user.uid),
      gid: "",
      ordernum: "",
      content: "",
      isSubmit: true,
    });

    onBeforeMount(() => {
      proxy.$utils.safeUser();

      state.gid = (router.currentRoute.value.query.gid as string)
        ? (router.currentRoute.value.query.gid as string)
        : "";
      state.ordernum = (router.currentRoute.value.query.ordernum as string)
        ? (router.currentRoute.value.query.ordernum as string)
        : "";

      getReviewService();
    });

    onMounted(() => {
      document.title = router.currentRoute.value.meta.title as string;
    });

    let getReviewService = () => {
      store.dispatch("order/getReviewService");
    };

    let SET_REVIEW_SCORE = (index: number, index2: number, score: number) => {
      store.commit("order/SET_REVIEW_SCORE", {
        index: index,
        index2: index2,
        score: score,
      });
    };

    let submit = () => {
      if (state.content.match(/^\s*$/)) {
        Toast("请输入评价内容");
        return;
      }

      if (state.isSubmit) {
        state.isSubmit = false;
        let rsdata = [];
        if (state.reviewServices.length > 0) {
          for (let i = 0; i < state.reviewServices.length; i++) {
            rsdata.push({
              gid: state.gid,
              myid: state.uid,
              rsid: state.reviewServices[i].rsid,
              score: state.reviewServices[i].score,
            });
          }
        }

        store.dispatch("order/addReview", {
          gid: state.gid,
          content: state.content,
          ordernum: state.ordernum,
          rsdata: JSON.stringify(rsdata),
          success: (res: { code: number; data: string; status: number }) => {
            if (res.code === 200) {
              router.go(-1);
            } else {
              Toast(res.data);
            }
          },
        });
      }
    };

    return {
      ...toRefs(state),
      SET_REVIEW_SCORE,
      submit,
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
  padding-top: 1.02rem;
}

.service {
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid #efefef;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}

.service li:nth-child(1) {
  font-size: 0.32rem;
  margin-left: 3%;
  margin-right: 15%;
}

.service li:nth-child(2) {
  display: flex;
  display: -webkit-flex;
}

.service .stars {
  width: 0.4rem;
  height: 0.4rem;
  background-image: url("../../../assets/images/user/orders/stars1.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 0.3rem;
}

.service .stars.active {
  background-image: url("../../../assets/images/user/orders/stars2.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.content-wrap {
  width: 100%;
  height: 4rem;
  text-align: center;
  overflow: hidden;
}

.content-wrap textarea {
  width: 95%;
  height: 90%;
  font-size: 0.32rem;
  margin-top: 0.3rem;
  outline: none;
  border: 0 none;
  resize: none;
}

.submit {
  width: 90%;
  height: 0.8rem;
  background-color: #e51b19;
  font-size: 0.28rem;
  color: #ffffff;
  text-align: center;
  line-height: 0.8rem;
  border: 0 none;
  border-radius: 4px;
  outline: none;
  margin: 0 auto;
  display: block;
  margin-top: 0.3rem;
}
</style>
