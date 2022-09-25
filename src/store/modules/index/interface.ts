export interface Swipers {
  image: string;
  title: string;
  webs: string;
}

export interface Navs {
  cid: string;
  image: string;
  title: string;
}

export interface Goods {
  items: GoodsItem[];
  title: string;
}

export interface GoodsItem {
  cid: string;
  gid: string;
  image: string;
  price: number;
  title: string;
}

export interface RecomGoods {
  cid: string;
  gid: string;
  image: string;
  price: string;
  title: string;
}
