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

export interface Attrs {
  title: string;
  values: AttrsItem[];
}

export interface AttrsItem {
  value: string;
  active: boolean;
}
