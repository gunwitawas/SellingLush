import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import { request } from 'https';
import {ServiceConstance} from "../../shared/constance/ServiceConstance";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  cartList = new Subject();

  getCurrentProductStoreServicePath = ServiceConstance.rootPath + ServiceConstance.orderPath + "/getProductStore";
  searchCurrentProductStoreServicePath = ServiceConstance.rootPath + ServiceConstance.orderPath + "/searchProductStore";
  insertOrderDetailServicePath = ServiceConstance.rootPath + ServiceConstance.orderPath + "/insertOrderDetail";
  insertOrderListServicePath = ServiceConstance.rootPath + ServiceConstance.orderPath + "/insertOrderList";
  getOrderDetailByIDServicePath = ServiceConstance.rootPath + ServiceConstance.orderPath + "/getOrderDetailByID";
  getOrderDetailByUsernameServicePath = ServiceConstance.rootPath + ServiceConstance.orderPath + "/getOrderDetailByUsername";
  comfirmPaymentServicePath = ServiceConstance.rootPath + ServiceConstance.orderPath + "/comfirmPayment";
  clearOrderOverdueServicePath = ServiceConstance.rootPath + ServiceConstance.orderPath + "/clearOrderOverdue";
  getOrderDetailByStatusServicePath = ServiceConstance.rootPath + ServiceConstance.orderPath + "/getOrderDetailByStatus";
  updateOrderStatusServicePath = ServiceConstance.rootPath + ServiceConstance.orderPath + "/updateOrderStatus";
  checkOrderStatusUnpaidServicePath = ServiceConstance.rootPath + ServiceConstance.orderPath + "/checkOrderStatusUnpaid";
  deleteOrderlistServicePath = ServiceConstance.rootPath + ServiceConstance.orderPath + "/deleteOrderlist";
  parameter:any = {
    params : {},
    responseType: "json"
  }
  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
  ) { }

  setCartDetail(obj){
    this.cartList.next(obj);
  }

  getCartDetail(){
    return this.cartList;
  }

  async getProductStore(params){
    this.parameter.params = params;
    let result = await this.http.get(this.getCurrentProductStoreServicePath, this.parameter).toPromise();
    return result;
  }
  async getOrderDetailByID(params){
    this.parameter.params = params;
    let result = await this.http.get(this.getOrderDetailByIDServicePath, this.parameter).toPromise();
    return result;
  }

  async searchProductStore(params){
    this.parameter.params = params;
    let result = await this.http.get(this.searchCurrentProductStoreServicePath, this.parameter).toPromise();
    return result;
  }

  async getOrderDetailByUsernameService(params){
    this.parameter.params = params;
    let result = await this.http.get(this.getOrderDetailByUsernameServicePath, this.parameter).toPromise();
    return result;
  }
  async getOrderDetailByStatus(params){
    this.parameter.params = params;
    let result = await this.http.get(this.getOrderDetailByStatusServicePath, this.parameter).toPromise();
    return result;
  }
  async checkOrderStatusUnpaid(params){
    this.parameter.params = params;
    let result = await this.http.get(this.checkOrderStatusUnpaidServicePath, this.parameter).toPromise();
    return result;
  }

  async insertOrderDetail(body){
    let result = await this.http.post(this.insertOrderDetailServicePath, body).toPromise();
    return result;
  }

  async insertOrderList(body){
    let result = await this.http.post(this.insertOrderListServicePath, body).toPromise();
    return result;
  }
  async comfirmPayment(body){
    let result = await this.http.post(this.comfirmPaymentServicePath, body).toPromise();
    return result;
  }
  async clearOrderOverdue(body){
    let result = await this.http.post(this.clearOrderOverdueServicePath, body).toPromise();
    return result;
  }
  async updateOrderStatus(body){
    let result = await this.http.post(this.updateOrderStatusServicePath, body).toPromise();
    return result;
  }
  async deleteOrderlist(body){
    let result = await this.http.post(this.deleteOrderlistServicePath, body).toPromise();
    return result;
  }

}
