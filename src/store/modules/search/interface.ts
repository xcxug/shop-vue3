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
  title: string;
  isHide: boolean;
  param: AttrsParam[];
}

export interface AttrsParam {
  title: string;
  active: boolean;
}
