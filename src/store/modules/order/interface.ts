export interface OrderNumData {
  ordernum: string;
}

export interface MyOrderData {
  goods: Goods[];
  ordernum: string;
  status: string;
  total: number;
}

export interface Goods {
  amount: string;
  gid: string;
  image: string;
  param: Param[];
  price: string;
  subtotal: string;
  title: string;
}

export interface Param {
  attrid: string;
  param: ParamItem[];
  title: string;
}

export interface ParamItem {
  paramid: string;
  title: string;
}

export interface Pageinfo {
  page: string;
  pagenum: string;
  pagesize: string;
}

export interface OrderInfoData {
  address: string;
  area: string;
  cellphone: string;
  city: string;
  freight: number;
  goods: OrderInfoGoods[];
  name: string;
  ordernum: string;
  ordertime: string;
  province: string;
  status: string;
  total: number;
  truetotal: number;
}

export interface OrderInfoGoods {
  amount: string;
  gid: string;
  image: string;
  param: OrderInfoParam[];
  price: number;
  title: string;
}

export interface OrderInfoParam {
  attrid: string;
  param: OrderInfoParamItem[];
  title: string;
}

export interface OrderInfoParamItem {
  paramid: string;
  title: string;
}

export interface ReviewOrderData {
  goods: Goods[];
  ordernum: string;
  status: string;
  total: number;
}

export interface ReviewOrderGoods {
  amount: string;
  freight: string;
  gid: string;
  image: string;
  isreview: string;
  price: string;
  title: string;
}
