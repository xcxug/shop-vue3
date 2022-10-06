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
