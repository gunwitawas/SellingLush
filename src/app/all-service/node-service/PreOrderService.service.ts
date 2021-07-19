import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import { ServiceConstance } from '../../shared/constance/ServiceConstance';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PreOrderService {
  getAllPreOrderDetail = ServiceConstance.rootPath + ServiceConstance.preorderPath + '/getAllPreOrder';
  insertPreorderDetail = ServiceConstance.rootPath + ServiceConstance.preorderPath + '/insertPreorderDetail';
  insertPreorderList = ServiceConstance.rootPath + ServiceConstance.preorderPath + '/insertPreorderlist';
  getAllPreOrderList = ServiceConstance.rootPath + ServiceConstance.preorderPath + '/getAllPreOrderList';
  uploadimagePayment = ServiceConstance.rootPath + ServiceConstance.preorderPath + '/uploadImagePayment';
  updatepatmentStatus = ServiceConstance.rootPath + ServiceConstance.preorderPath + '/updatePatmentStatus';
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

  async uploadImagePayment(request) {
    let result = await this.http.post(this.uploadimagePayment, request).toPromise();
    return result;
  }

  async updatePaymentStatus(request) {
    let result = await this.http.post(this.updatepatmentStatus, request).toPromise();
    return result;
  }

  async checkPreOrderDate(request: any) {

    let username = request.username;
    let startDate: any = moment(request.startDate, "DD/MM/YYYY");
    let endDate: any = moment(request.endDate, "DD/MM/YYYY");
    let status: string = request.status;
    let preOrderDetail: any = await this.getPreOrderDetail();

    if (preOrderDetail.content) {
      if (username) {
        let preOrderDetailByID: any = await preOrderDetail.content.filter((result: any) => result.username == username);
        if (startDate._isValid && endDate._isValid) {
          let preOrderDetailByDate: any = await preOrderDetailByID.filter((result: any) => moment(result.pre_date, "DD/MM/YYYY") >= startDate && moment(result.pre_date, "DD/MM/YYYY") <= endDate);
          return preOrderDetailByDate;
        } else if (startDate._isValid && !endDate._isValid) {
          let preOrderDetailByDate: any = await preOrderDetailByID.filter((result: any) => moment(result.pre_date, "DD/MM/YYYY") >= startDate);
          return preOrderDetailByDate;
        } else if (!startDate._isValid && endDate._isValid) {
          let preOrderDetailByDate: any = await preOrderDetailByID.filter((result: any) => moment(result.pre_date, "DD/MM/YYYY") <= endDate);
          return preOrderDetailByDate;
        } else {
          return preOrderDetailByID;
        }
      } else {
        if (startDate._isValid && endDate._isValid) {
          let preOrderDetailByDate: any = await preOrderDetail.content.filter((result: any) => moment(result.pre_date, "DD/MM/YYYY") >= startDate && moment(result.pre_date, "DD/MM/YYYY") <= endDate);
          return preOrderDetailByDate;
        } else if (startDate._isValid && !endDate._isValid) {
          let preOrderDetailByDate: any = await preOrderDetail.content.filter((result: any) => moment(result.pre_date, "DD/MM/YYYY") >= startDate);
          return preOrderDetailByDate;
        } else if (!startDate._isValid && endDate._isValid) {
          let preOrderDetailByDate: any = await preOrderDetail.content.filter((result: any) => moment(result.pre_date, "DD/MM/YYYY") <= endDate);
          return preOrderDetailByDate;
        } else {
          return preOrderDetail;
        }
      }
    }




  }


}
