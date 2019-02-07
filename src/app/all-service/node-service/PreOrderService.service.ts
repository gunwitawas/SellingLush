import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import { ServiceConstance } from "../../shared/constance/ServiceConstance";

@Injectable({
  providedIn: 'root'
})
export class PreOrderService {
  getAllPreOrderDetail = ServiceConstance.rootPath + ServiceConstance.preorderPath + "/getAllPreOrder";
  insertPreorderDetail = ServiceConstance.rootPath + ServiceConstance.preorderPath + "/insertPreorderDetail";
  insertPreorderList = ServiceConstance.rootPath + ServiceConstance.preorderPath + "/insertPreorderlist";
  getAllPreOrderList = ServiceConstance.rootPath + ServiceConstance.preorderPath + "/getAllPreOrderList";
  constructor(
    private http: TransferHttpService,
  ) { }

  async getPreOrderDetail() {
    let result = await this.http.get(this.getAllPreOrderDetail).toPromise();
    return result;
  }

  async insertPreOrderDetail(request) {
    let result = await this.http.post(this.insertPreorderDetail, request).toPromise();
    return result;
  }

  async insertPreOrderList(request) {
    let result = await this.http.post(this.insertPreorderList, request).toPromise();
    return result;
  }

  async getPreOrderList() {
    let result = await this.http.get(this.getAllPreOrderList).toPromise();
    return result;
  }

}
