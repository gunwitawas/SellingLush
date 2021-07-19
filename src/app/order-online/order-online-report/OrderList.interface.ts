import {OrderDetailInterface} from "./OrderDetail.interface";
import {ListOrderInterface} from "./ListOrder.interface";

export interface OrderListInterface {
  orderDetail: OrderDetailInterface;
  orderList: [ListOrderInterface]
}
