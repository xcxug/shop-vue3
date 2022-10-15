export interface LoginData {
  cellphone: string;
  password: string;
}

export interface SafeUserData {
  uid: string;
  auth_token: string;
}

export interface SafeOutLoginData {
  uid: string;
}

export interface RegUserData {
  cellphone: string;
  password: string;
  vcode: string;
}

export interface UploadHeadData {
  headfile: any;
}

export interface UpdateUserInfoData {
  uid: string;
  head: string;
  nickname: string;
  gender: string;
}

export interface UpdateCellphoneData {
  uid: string;
  cellphone: string;
  vcode: string;
}
