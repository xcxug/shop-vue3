export interface LoginData {
  auth_token: string;
  nickname: string;
  uid: string;
  utype: string;
}

export interface IsRegData {
  isreg: string;
  uid: string;
}

export interface UserInfoData {
  nickname: string;
  head: string;
  points: number;
}
