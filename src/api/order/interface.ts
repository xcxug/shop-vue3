export interface AddOrderData {
  uid: string;
  freight: number;
  goodsData: string;
  addsid: string;
}

export interface MyOrderData {
  uid: string;
  status: string;
  page: number;
}

export interface CancelOrderData {
  uid: string;
  orderNum: string;
}

export interface SureOrderData {
  uid: string;
  orderNum: string;
}

export interface OrderInfoData {
  uid: string;
  orderNum: string;
}

export interface ReviewOrderData {
  uid: string;
  page: number;
}

export interface AddReviewData {
  uid: string;
  gid: string;
  content: string;
  ordernum: string;
  rsdata: string;
}
