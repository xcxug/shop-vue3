export interface HotKeyword {
  title: string;
}

export interface Price {
  isHide: boolean;
  items: PriceItem[];
}

export interface PriceItem {
  price1: number;
  price2: number;
  active: boolean;
}

export interface Attrs {
  attrid: string;
  param: AttrsParam[];
  title: string;
  isHide?: boolean;
}

export interface AttrsParam {
  pid: string;
  title: string;
  active?: boolean;
}

export interface SearchData {
  cid: string;
  gid: string;
  image: string;
  price: string;
  sales: string;
  title: string;
}

export interface PageInfo {
  page: string;
  pagenum: string;
  pagesize: string;
  total: number;
}
