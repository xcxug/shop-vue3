import config from "@/assets/js/conf/config";
import { request } from "@/assets/js/utils/request";
import { LoginData, SafeUserData, SafeOutLoginData } from "./interface";

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

export { loginData, safeUserData, safeOutLoginData };
