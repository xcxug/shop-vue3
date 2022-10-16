<template>
  <div class="page">
    <SubHeader title="会员注册"></SubHeader>
    <div class="main">
      <div class="inputs">
        <input type="text" placeholder="验证码" v-model="vcode" />
        <div class="vcode-img">
          <img :src="showCode" @click="changVCode($event)" />
        </div>
      </div>
      <div class="cellphone-wrap">
        <div class="cellphone">
          <input
            type="tel"
            @input="checkCellphone()"
            placeholder="请输入手机号"
            v-model="cellphone"
          />
        </div>
        <div
          :class="{ 'code-btn': true, success: isSendMsgCode }"
          @click="getMsgCode()"
        >
          {{ msgCodeText }}
        </div>
      </div>
      <div class="code-wrap">
        <input type="text" placeholder="请输入短信验证码" v-model="msgCode" />
      </div>
      <div class="password-wrap">
        <div class="password">
          <input
            :type="isOpen ? 'text' : 'password'"
            placeholder="请输入密码"
            v-model="password"
          />
        </div>
        <div class="switch-wrap">
          <van-switch v-model="isOpen" active-color="#EB1625" />
        </div>
      </div>
      <div class="sure-btn" @click="submit()">注册</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onUnmounted,
  getCurrentInstance,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import SubHeader from "@/components/sub_header";

export default defineComponent({
  name: "component-reg",
  components: {
    SubHeader,
  },
  setup() {
    const { proxy }: any = getCurrentInstance();
    const router = useRouter();
    const store = useStore();

    let state = reactive<{
      vcode: string;
      showCode: string;
      cellphone: string;
      isSendMsgCode: boolean;
      msgCodeText: string;
      msgCode: string;
      timer: number;
      password: string;
      isOpen: boolean;
    }>({
      vcode: "",
      showCode:
        proxy.$config.baseApi + "/vcode/chkcode?token=" + proxy.$config.token,
      cellphone: "",
      isSendMsgCode: false,
      msgCodeText: "获取短信验证码",
      msgCode: "",
      timer: 0,
      password: "",
      isOpen: false,
    });

    onUnmounted(() => {
      clearInterval(state.timer);
    });

    // 重新获取验证码
    let changVCode = (e: any) => {
      e.target.src =
        proxy.$config.baseApi +
        "/vcode/chkcode?token=" +
        proxy.$config.token +
        "&random=" +
        new Date().getTime();
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

    // 获取短信验证码
    let getMsgCode = async () => {
      if (state.isSendMsgCode) {
        if (state.vcode.match(/^\s*$/)) {
          Toast("请输入图文验证码");
          return;
        }
        let vcodeData = await store.dispatch("user/checkVCode", {
          vcode: state.vcode,
        });
        if (vcodeData.code !== 200) {
          Toast("您输入的图文验证码不正确");
          return;
        }

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

    // 提交注册
    let submit = async () => {
      if (state.vcode.match(/^\s*$/)) {
        Toast("请输入图文验证码");
        return;
      }
      let vcodeData = await store.dispatch("user/checkVCode", {
        vcode: state.vcode,
      });
      if (vcodeData.code !== 200) {
        Toast("您输入的图文验证码不正确");
        return;
      }

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

      if (state.password.match(/^\s*$/)) {
        Toast("请输入密码");
        return;
      }

      store.dispatch("user/regUser", {
        cellphone: state.cellphone,
        password: state.password,
        vcode: state.vcode,
        success: (res: { code: number; data: string; status: number }) => {
          if (res.code === 200) {
            router.push("/login?from=reg");
          } else {
            Toast(res.data);
          }
        },
      });
    };

    return {
      ...toRefs(state),
      changVCode,
      checkCellphone,
      getMsgCode,
      submit,
    };
  },
});
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
}

.main {
  width: 100%;
  padding-top: 1.4rem;
}

.cellphone-wrap {
  width: 90%;
  height: 0.84rem;
  margin: 0 auto;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  margin-top: 0.4rem;
}

.cellphone-wrap .cellphone {
  width: 62%;
  height: 100%;
  border: #efefef solid 1px;
  border-radius: 2px;
}

.cellphone-wrap .cellphone input,
.code-wrap input,
.password-wrap .password input {
  width: 92%;
  height: 95%;
  font-size: 0.28rem;
  padding-left: 0.2rem;
}

.cellphone-wrap .code-btn {
  width: 35%;
  height: 0.82rem;
  background: #eaeaea;
  color: #717376;
  border: #eaeaea solid 1px;
  border-radius: 2px;
  font-size: 0.28rem;
  text-align: center;
  line-height: 0.82rem;
}

.cellphone-wrap .code-btn.success {
  background: #ffffff;
  border: 1px solid #eb1625;
  color: #eb1625;
}

.code-wrap {
  width: 90%;
  height: 0.84rem;
  margin: 0 auto;
  border-radius: 2px;
  border: #efefef solid 1px;
  margin-top: 0.4rem;
}

.password-wrap {
  width: 90%;
  height: 0.84rem;
  margin: 0 auto;
  border-radius: 2px;
  border: #efefef solid 1px;
  margin-top: 0.4rem;
  display: flex;
  display: -webkit-flex;
}

.password-wrap .password {
  width: 80%;
  height: 100%;
}

.password-wrap .switch-wrap {
  width: 20%;
  margin-top: 0.1rem;
}

.sure-btn {
  width: 85%;
  height: 0.8rem;
  margin: 0 auto;
  background: #eb1625;
  font-size: 0.36rem;
  color: #ffffff;
  line-height: 0.8rem;
  text-align: center;
  margin-top: 0.4rem;
  border-radius: 4px;
}

.fastreg-wrap {
  width: 85%;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  font-size: 0.24rem;
  margin: 0 auto;
  margin-top: 0.3rem;
}

.fastreg-wrap img {
  width: 0.32rem;
  height: 0.32rem;
  vertical-align: middle;
}

.inputs {
  width: 90%;
  height: 0.84rem;
  border: #efefef solid 1px;
  border-radius: 2px;
  background: #ffffff;
  margin: 0 auto;
  line-height: 0.84rem;
  padding-left: 0.2rem;
  font-size: 0.28rem;
  position: relative;
  box-sizing: border-box;
}

.inputs .vcode-img {
  width: 20%;
  height: 60%;
  position: absolute;
  right: 0px;
  top: 20%;
  border-left: 1px solid #efefef;
  text-align: center;
}

.inputs .vcode-img img {
  width: 80%;
  height: 100%;
}

.inputs input {
  width: 80%;
  height: 88%;
}
</style>
