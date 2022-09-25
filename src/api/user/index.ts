import config from "@/assets/js/conf/config";
import { request } from "@/assets/js/utils/request";
import {
  LoginData,
  SafeUserData,
  SafeOutLoginData,
  RegUserData,
} from "./interface";

// 会员登录
function loginData(data: LoginData) {
  return request(
    config.baseApi + "/home/user/pwdlogin?token=" + config.token,
    "post",
    data
  );
}

// 会员安全认证
function safeUserData(data: SafeUserData) {
  return request(
    config.baseApi + "/home/user/safe?token=" + config.token,
    "post",
    data
  );
}

// 安全退出
function safeOutLoginData(data: SafeOutLoginData) {
  return request(
    config.baseApi + "/home/user/safeout?token=" + config.token,
    "post",
    data
  );
}

// 检测图文验证码是否正确
function checkVCodeData(vcode: string) {
  return request(
    config.baseApi + "/home/user/checkvcode?token=" + config.token,
    "post",
    { vcode: vcode }
  );
}

// 是否注册过会员
function isRegData(username: string) {
  return request(
    config.baseApi + "/home/user/isreg?token=" + config.token,
    "post",
    { username: username }
  );
}

// 会员注册
function regUserData(data: RegUserData) {
  return request(
    config.baseApi + "/home/user/reg?token=" + config.token,
    "post",
    data
  );
}

// 获取会员信息
function getUserInfoData(uid: string) {
  return request(
    config.baseApi +
      "/user/myinfo/userinfo/uid/" +
      uid +
      "?token=" +
      config.token
  );
}

export {
  loginData,
  safeUserData,
  safeOutLoginData,
  checkVCodeData,
  isRegData,
  regUserData,
  getUserInfoData,
};
