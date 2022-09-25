export interface CartData {
  amount: number;
  attrs: CartDataAttrs[];
  checked: boolean;
  freight: number;
  gid: string;
  img: string;
  price: number;
  title: string;
}

export interface CartDataAttrs {
  attrid: string;
  title: string;
  param: CartDataAttrsParam[];
}

export interface CartDataAttrsParam {
  paramid: string;
  title: string;
}
