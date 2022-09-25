import { loginData, safeUserData, safeOutLoginData } from "@/api/user";
import { LoginData } from "./interface";
import * as Types from "./types";

export default {
  namespaced: true,
  state: {
    uid: localStorage["uid"] ? localStorage["uid"] : "",
    nickname: localStorage["nickname"] ? localStorage["nickname"] : "",
    isLogin: localStorage["isLogin"] ? Boolean(localStorage["isLogin"]) : false,
    authToken: localStorage["authToken"] ? localStorage["authToken"] : "",
  },
  mutations: {
    [Types.SET_LOGIN](
      state: {
        uid: string;
        nickname: string;
        isLogin: boolean;
        authToken: string;
      },
      payload: {
        uid: string;
        nickname: string;
        isLogin: boolean;
        authToken: string;
      }
    ) {
      state.uid = payload.uid;
      state.nickname = payload.nickname;
      state.isLogin = payload.isLogin;
      state.authToken = payload.authToken;
      localStorage["uid"] = payload.uid;
      localStorage["nickname"] = payload.nickname;
      localStorage["isLogin"] = payload.isLogin;
      localStorage["authToken"] = payload.authToken;
    },
    [Types.OUT_LOGIN](state: {
      uid: string;
      nickname: string;
      isLogin: boolean;
      authToken: string;
    }) {
      state.uid = "";
      state.nickname = "";
      state.isLogin = false;
      state.authToken = "";
      localStorage.removeItem("uid");
      localStorage.removeItem("nickname");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("authToken");
    },
  },
  actions: {
    // 会员登录
    login(
      conText: any,
      payload: {
        cellphone: string;
        password: string;
        success: (res: {
          code: number;
          data: LoginData | string;
          status: number;
        }) => void;
      }
    ) {
      loginData(payload).then(
        (res: { code: number; data: LoginData | string; status: number }) => {
          // console.log(res);
          if (res.code === 200) {
            conText.commit(Types.SET_LOGIN, {
              uid: (res.data as LoginData).uid,
              nickname: (res.data as LoginData).nickname,
              isLogin: true,
              authToken: (res.data as LoginData).auth_token,
            });
          }
          if (payload.success) {
            payload.success(res);
          }
        }
      );
    },
    // 安全退出
    outLogin(conText: any) {
      safeOutLoginData({ uid: conText.state.uid }).then(
        (res: { code: number; data: string; status: number }) => {
          console.log(res);
        }
      );
      conText.commit(Types.OUT_LOGIN);
    },
    // 会员安全认证
    safeUser(
      conText: any,
      payload: {
        success: (res: { code: number; data: string; status: number }) => void;
      }
    ) {
      // console.log(conText.state.uid);
      safeUserData({
        uid: conText.state.uid,
        auth_token: conText.state.authToken,
      }).then((res: { code: number; data: string; status: number }) => {
        // console.log(res);
        conText.commit(Types.OUT_LOGIN);
        if (payload.success) {
          payload.success(res);
        }
      });
    },
  },
};
