import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import { request } from 'https';
import {ServiceConstance} from "../../shared/constance/ServiceConstance";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  cartList = new Subject();

  getExpenseReportServicePath = ServiceConstance.rootPath + ServiceConstance.reportPath + "/getOrderReport";
  getStockServicePath = ServiceConstance.rootPath + ServiceConstance.reportPath + "/getStockReport";
  getMixerListServicePath = ServiceConstance.rootPath + ServiceConstance.reportPath + "/getMixerList";
  getCustomerListServicePath = ServiceConstance.rootPath + ServiceConstance.reportPath + "/getCustomer";
  parameter:any = {
    params : {},
    responseType: "json"
  }
  constructor(
    private http: TransferHttpService
  ) { }

  async getStockReport(param){
    this.parameter.params = param;
    let result = await this.http.get(this.getStockServicePath, this.parameter).toPromise();
    return result;
  }
  async getMixerList(){
    let result = await this.http.get(this.getMixerListServicePath, this.parameter).toPromise();
    return result;
  }
  async getCustomer(){
    let result = await this.http.get(this.getCustomerListServicePath, this.parameter).toPromise();
    return result;
  }

  async getExpenseReport(param){
    this.parameter.params = param;
    let result = await this.http.get(this.getExpenseReportServicePath, this.parameter).toPromise();
    return result;
  }
}
