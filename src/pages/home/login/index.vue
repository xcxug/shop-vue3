<template>
  <div class="page">
    <SubHeader title="会员登录"></SubHeader>
    <div class="main login-main">
      <div class="code-wrap" style="margin-top: 0px">
        <input type="text" placeholder="手机号" v-model="cellphone" />
      </div>
      <div class="password-wrap">
        <div class="password">
          <input
            :type="isOpen ? 'text' : 'password'"
            placeholder="密码"
            v-model="password"
          />
        </div>
        <div class="switch-wrap">
          <van-switch v-model="isOpen" active-color="#EB1625" />
        </div>
      </div>
      <div class="sure-btn" @click="doLogin()">登录</div>
      <div class="fastreg-wrap">
        <div>
          <img
            src="../../../assets/images/home/index/forget.png"
            alt="忘记密码"
          />
          忘记密码
        </div>
        <div @click="$router.push('/reg')">
          <img src="../../../assets/images/home/index/reg.png" alt="忘记密码" />
          快速注册
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import SubHeader from "@/components/sub_header";

interface LoginData {
  auth_token: string;
  nickname: string;
  uid: string;
  utype: string;
}

export default defineComponent({
  name: "component-login",
  components: {
    SubHeader,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    let state = reactive<{
      cellphone: string;
      password: string;
      isOpen: boolean;
    }>({
      cellphone: "",
      password: "",
      isOpen: false,
    });

    let doLogin = () => {
      if (state.cellphone.match(/^\s*$/)) {
        Toast("请输入手机号");
        return;
      }
      if (!state.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
        Toast("您输入的手机号格式不正确");
        return;
      }

      if (state.password.match(/^\s*$/)) {
        Toast("请输入密码");
        return;
      }

      store.dispatch("user/login", {
        cellphone: state.cellphone, // 13717628483
        password: state.password, // 123456
        success: (res: {
          code: number;
          data: LoginData | string;
          status: number;
        }) => {
          if (res.code === 200) {
            router.go(-1);
          } else {
            Toast(res.data as string);
          }
        },
      });
    };

    return {
      ...toRefs(state),
      doLogin,
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
</style>
