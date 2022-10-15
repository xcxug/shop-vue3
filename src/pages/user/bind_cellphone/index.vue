<template>
  <div class="page">
    <SubHeader title="绑定手机"></SubHeader>
    <div class="main">
      <div class="tip">
        <div class="icon"></div>
        <div class="text">新手机号验证后，即可绑定成功！</div>
      </div>
      <div class="input-wrap" style="margin-top: 0.5rem">
        <input
          type="tel"
          class="cellphone"
          @input="checkCellphone()"
          placeholder="绑定手机号"
          v-model="cellphone"
        />
      </div>
      <div class="input-wrap" style="margin-top: 0.2rem">
        <input
          type="text"
          class="code"
          placeholder="请输入短信验证码"
          v-model="msgCode"
        />
        <div
          :class="{ 'code-btn': true, success: isSendMsgCode }"
          @click="getMsgCode()"
        >
          {{ msgCodeText }}
        </div>
      </div>
      <div class="save-btn" @click="submit()">下一步</div>
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
  onUnmounted,
  getCurrentInstance,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import SubHeader from "@/components/sub_header";

export default defineComponent({
  name: "bind-cellphone",
  components: {
    SubHeader,
  },
  setup() {
    const { proxy }: any = getCurrentInstance();
    const router = useRouter();
    const store = useStore();

    let state = reactive<{
      cellphone: string;
      isSendMsgCode: boolean;
      msgCodeText: string;
      msgCode: string;
      timer: number;
      isSubmit: boolean;
    }>({
      cellphone: "",
      isSendMsgCode: false,
      msgCodeText: "获取短信验证码",
      msgCode: "",
      timer: 0,
      isSubmit: true,
    });

    onBeforeMount(() => {
      proxy.$utils.safeUser();
    });

    onMounted(() => {
      document.title = router.currentRoute.value.meta.title as string;
    });

    onUnmounted(() => {
      clearInterval(state.timer);
    });

    // 获取短信验证码
    let getMsgCode = async () => {
      if (state.isSendMsgCode) {
        if (state.cellphone.match(/^\s*$/)) {
          Toast("请输入手机号");
          return;
        }
        if (!state.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
          Toast("您输入的手机号格式不正确");
          return;
        }
        let regData = await store.dispatch("user/isReg", {
          username: state.cellphone,
        });
        if (regData.data.isreg === "1") {
          Toast("此手机号已注册过，请更换手机号");
          return;
        }

        state.isSendMsgCode = false;
        let time = 10;
        state.msgCodeText = "重新获取(" + time + ")";
        state.timer = setInterval(() => {
          if (time > 0) {
            time--;
            state.msgCodeText = "重新获取(" + time + ")";
          } else {
            clearInterval(state.timer);
            state.msgCodeText = "获取短信验证码";
            state.isSendMsgCode = true;
          }
        }, 1000);
      }
    };

    let checkCellphone = () => {
      let isChecked = true;
      if (state.cellphone.match(/^\s*$/)) {
        isChecked = false;
      }
      if (!state.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
        isChecked = false;
      }
      if (isChecked) {
        state.isSendMsgCode = true;
      } else {
        state.isSendMsgCode = false;
      }
    };

    // 修改手机号
    let submit = async () => {
      if (state.cellphone.match(/^\s*$/)) {
        Toast("请输入手机号");
        return;
      }
      if (!state.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
        Toast("您输入的手机号格式不正确");
        return;
      }
      let regData = await store.dispatch("user/isReg", {
        username: state.cellphone,
      });
      if (regData.data.isreg === "1") {
        Toast("此手机号已注册过，请更换手机号");
        return;
      }

      if (state.msgCode.match(/^\s*$/)) {
        Toast("请输入短信验证码");
        return;
      }

      if (state.isSubmit) {
        state.isSubmit = false;
        store.dispatch("user/updateCellphone", {
          cellphone: state.cellphone, // 13717628483,13917628483
          vcode: state.msgCode,
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
      getMsgCode,
      checkCellphone,
      submit,
    };
  },
});
</script>

<style scoped>
.sub-header {
  width: 100%;
  height: 1rem;
  background-color: #ffffff;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  border-bottom: 1px solid #efefef;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
}

.sub-header .back {
  width: 0.8rem;
  height: 0.8rem;
  background-image: url("../../../assets/images/home/goods/back.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.sub-header .title {
  width: 79%;
  height: auto;
  font-size: 0.32rem;
  text-align: center;
}

.sub-header .right-btn {
  width: auto;
  height: auto;
  font-size: 0.32rem;
}

.page {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
}

.main {
  width: 100%;
  padding-top: 1.02rem;
}

.main .tip {
  width: 100%;
  height: 1rem;
  background-color: #f3f5c4;
  color: #ac7700;
  font-size: 0.28rem;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}

.main .tip .icon {
  width: 0.4rem;
  height: 0.4rem;
  background-image: url("../../../assets/images/user/mobile/tip.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: 0.4rem;
  margin-right: 0.2rem;
}

.main .tip .text {
  width: auto;
  height: auto;
}

.main .input-wrap {
  width: 93%;
  height: 0.8rem;
  border: #c5cbcf solid 1px;
  border-radius: 4px;
  margin: 0 auto;
  overflow: hidden;
}

.main .input-wrap .cellphone {
  width: 93%;
  height: 90%;
  font-size: 0.28rem;
  margin-left: 0.2rem;
  margin-top: 0.05rem;
}

.main .input-wrap .code {
  width: 69%;
  height: 90%;
  font-size: 0.28rem;
  margin-left: 0.2rem;
  margin-top: 0.05rem;
  float: left;
}

.main .input-wrap .code-btn {
  width: 25%;
  height: 100%;
  border-left: #efefef 1px solid;
  float: left;
  font-size: 0.28rem;
  color: #717376;
  text-align: center;
  line-height: 0.8rem;
}

.main .input-wrap .code-btn.success {
  color: #eb1625;
}

.main .save-btn {
  width: 93%;
  height: 0.8rem;
  background-color: #e42321;
  font-size: 0.28rem;
  color: #ffffff;
  text-align: center;
  line-height: 0.8rem;
  margin: 0 auto;
  border-radius: 4px;
  margin-top: 0.2rem;
}
</style>
