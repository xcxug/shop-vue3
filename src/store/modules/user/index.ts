import {
  loginData,
  safeUserData,
  safeOutLoginData,
  checkVCodeData,
  isRegData,
  regUserData,
  getUserInfoData,
  uploadHeadData,
  updateUserInfoData,
  updateCellphoneData,
  updatePasswordData,
  getFavData,
  delFavData,
} from "@/api/user";
import {
  LoginData,
  IsRegData,
  UserInfoData,
  UploadHeadData,
  FavData,
  Pageinfo,
} from "./interface";
import * as Types from "./types";

export default {
  namespaced: true,
  state: {
    uid: localStorage["uid"] ? localStorage["uid"] : "",
    nickname: localStorage["nickname"] ? localStorage["nickname"] : "",
    isLogin: localStorage["isLogin"] ? Boolean(localStorage["isLogin"]) : false,
    authToken: localStorage["authToken"] ? localStorage["authToken"] : "",
    head: "",
    points: 0,
    favs: [],
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
      head: string;
      points: number;
    }) {
      state.uid = "";
      state.nickname = "";
      state.isLogin = false;
      state.authToken = "";
      state.head = "";
      state.points = 0;
      localStorage.removeItem("uid");
      localStorage.removeItem("nickname");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("authToken");
      localStorage.removeItem("cartData");
      sessionStorage.removeItem("addsid");
    },
    [Types.SET_USER_INFO](
      state: {
        nickname: string;
        head: string;
        points: number;
      },
      payload: {
        nickname: string;
        head: string;
        points: number;
      }
    ) {
      state.nickname = payload.nickname;
      state.head = payload.head;
      state.points = payload.points;
    },
    // 设置我的收藏
    [Types.SET_FAVS](state: { favs: FavData[] }, payload: { favs: FavData[] }) {
      state.favs = payload.favs;
    },
    [Types.SET_FAVS_PAGE](
      state: { favs: FavData[] },
      payload: { favs: FavData[] }
    ) {
      state.favs.push(...payload.favs);
    },
    // 删除收藏
    [Types.DEL_FAVS](
      state: { favs: FavData[] },
      payload: {
        index: number;
      }
    ) {
      state.favs.splice(payload.index, 1);
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
      safeOutLoginData({ uid: conText.state.uid }).then(() => {
        // console.log(res);
      });
      conText.rootState.cart.cartData = [];
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
        if (res.code !== 200) {
          conText.commit(Types.OUT_LOGIN);
        }
        if (payload.success) {
          payload.success(res);
        }
      });
    },
    // 检测图片验证码
    checkVCode(conText: any, payload: { vcode: string }) {
      return checkVCodeData(payload.vcode).then(
        (res: { code: number; data: string; status: number }) => {
          return res;
        }
      );
    },
    // 是否注册会员
    isReg(conText: any, payload: { username: string }) {
      return isRegData(payload.username).then(
        (res: { code: number; data: IsRegData; status: number }) => {
          return res;
        }
      );
    },
    // 注册会员
    regUser(
      conText: any,
      payload: {
        cellphone: string;
        password: string;
        vcode: string;
        success: (res: { code: number; data: string; status: number }) => void;
      }
    ) {
      regUserData(payload).then(
        (res: { code: number; data: string; status: number }) => {
          if (payload.success) {
            payload.success(res);
          }
        }
      );
    },
    // 获取会员信息
    getUserInfo(
      conText: any,
      payload: {
        success: (data: UserInfoData | string) => void;
      }
    ) {
      getUserInfoData(conText.state.uid).then(
        (res: {
          code: number;
          data: UserInfoData | string;
          status: number;
        }) => {
          if (res.code === 200) {
            conText.commit(Types.SET_USER_INFO, {
              nickname: (res.data as UserInfoData).nickname,
              head: (res.data as UserInfoData).head,
              points: (res.data as UserInfoData).points,
            });

            if (payload && payload.success) {
              payload.success(res.data);
            }
          }
        }
      );
    },
    // 上传头像
    uploadHead(
      conText: any,
      payload: {
        headfile: any;
        success: (res: {
          code: number;
          data: UploadHeadData;
          status: number;
        }) => void;
      }
    ) {
      uploadHeadData(payload).then(
        (res: { code: number; data: UploadHeadData; status: number }) => {
          if (payload.success) {
            payload.success(res);
          }
        }
      );
    },
    // 修改会员信息
    updateUserInfo(
      conText: any,
      payload: {
        head: string;
        nickname: string;
        gender: string;
        success: (res: { code: number; data: string; status: number }) => void;
      }
    ) {
      updateUserInfoData({ uid: conText.state.uid, ...payload }).then(
        (res: { code: number; data: string; status: number }) => {
          if (payload.success) {
            payload.success(res);
          }
        }
      );
    },
    // 修改手机号
    updateCellphone(
      conText: any,
      payload: {
        cellphone: string;
        vcode: string;
        success: (res: { code: number; data: string; status: number }) => void;
      }
    ) {
      updateCellphoneData({ uid: conText.state.uid, ...payload }).then(
        (res: { code: number; data: string; status: number }) => {
          if (payload.success) {
            payload.success(res);
          }
        }
      );
    },
    // 修改密码
    updatePassword(
      conText: any,
      payload: {
        password: string;
        success: (res: { code: number; data: string; status: number }) => void;
      }
    ) {
      updatePasswordData({ uid: conText.state.uid, ...payload }).then(
        (res: { code: number; data: string; status: number }) => {
          if (payload.success) {
            payload.success(res);
          }
        }
      );
    },
    // 我的收藏
    getFav(
      conText: any,
      payload: {
        page: number;
        success: (pageNum: number) => void;
      }
    ) {
      getFavData({ uid: conText.state.uid, ...payload }).then(
        (res: {
          code: number;
          data: FavData[];
          pageinfo: Pageinfo;
          status: number;
        }) => {
          let pageNum = 0;
          if (res.code === 200) {
            conText.commit(Types.SET_FAVS, { favs: res.data });
            pageNum = parseInt(res.pageinfo.pagenum);
          } else {
            conText.commit(Types.SET_FAVS, { favs: [] });
            pageNum = 0;
          }
          if (payload.success) {
            payload.success(pageNum);
          }
        }
      );
    },
    getFavPage(
      conText: any,
      payload: {
        page: number;
        success: () => void;
      }
    ) {
      getFavData({ uid: conText.state.uid, ...payload }).then(
        (res: {
          code: number;
          data: FavData[];
          pageinfo: Pageinfo;
          status: number;
        }) => {
          if (res.code === 200) {
            conText.commit(Types.SET_FAVS_PAGE, { favs: res.data });
            if (payload.success) {
              payload.success();
            }
          }
        }
      );
    },
    // 删除收藏
    delFav(
      conText: any,
      payload: {
        index: number;
        fid: string;
        success: () => void;
      }
    ) {
      delFavData({ uid: conText.state.uid, ...payload }).then(
        (res: { code: number; data: string; status: number }) => {
          if (res.code === 200) {
            conText.commit(Types.DEL_FAVS, { index: payload.index });
            if (payload.success) {
              payload.success();
            }
          }
        }
      );
    },
  },
};
