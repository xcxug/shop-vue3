import config from "@/assets/js/conf/config";
import { request } from "@/assets/js/utils/request";
import {
  LoginData,
  SafeUserData,
  SafeOutLoginData,
  RegUserData,
  UploadHeadData,
  UpdateUserInfoData,
  UpdateCellphoneData,
  updatePasswordData,
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

// 上传头像
function uploadHeadData(data: UploadHeadData) {
  return request(
    config.baseApi + "/user/myinfo/formdatahead?token=" + config.token,
    "file",
    data
  );
}

// 修改会员信息
function updateUserInfoData(data: UpdateUserInfoData) {
  return request(
    config.baseApi + "/user/myinfo/updateuser?token=" + config.token,
    "post",
    data
  );
}

// 修改手机号
function updateCellphoneData(data: UpdateCellphoneData) {
  return request(
    config.baseApi + "/user/myinfo/updatecellphone?token=" + config.token,
    "post",
    data
  );
}

// 修改密码
function updatePasswordData(data: updatePasswordData) {
  return request(
    config.baseApi + "/user/myinfo/modpwd?token=" + config.token,
    "post",
    data
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
  uploadHeadData,
  updateUserInfoData,
  updateCellphoneData,
  updatePasswordData,
};
