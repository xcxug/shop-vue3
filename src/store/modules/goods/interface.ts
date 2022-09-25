export interface Classifys {
  cid: string;
  title: string;
  active?: boolean;
}

export interface Goods {
  cid: string;
  goods: GoodsItem[];
  title: string;
}

export interface GoodsItem {
  gid: string;
  image: string;
  title: string;
}

export interface Details {
  bodys: string;
  freight: number;
  gid: string;
  images: string[];
  price: number;
  sales: string;
  title: string;
}

export interface Attrs {
  attrid: string;
  title: string;
  values: AttrsItem[];
}

export interface AttrsItem {
  value: string;
  vid: string;
  active?: boolean;
}

export interface Reviews {
  content: string;
  head: string;
  nickname: string;
  times: string;
}

export interface Pageinfo {
  page: string;
  pagenum: string;
  pagesize: string;
  total: number;
}
