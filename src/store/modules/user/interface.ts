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

export interface UploadHeadData {
  msbox: string;
  msg: string;
}

export interface FavData {
  cid: string;
  fid: string;
  gid: string;
  image: string;
  price: number;
  title: string;
}

export interface Pageinfo {
  itemTotal: number;
  page: string;
  pagenum: string;
  pagesize: string;
}
