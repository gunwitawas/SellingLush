import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import { request } from 'https';
import {ServiceConstance} from "../../shared/constance/ServiceConstance";
import { resolve } from 'path';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class PreOrderService {
  getAllPreOrderDetail = ServiceConstance.rootPath + ServiceConstance.preorderPath + "/getAllPreOrder";
  insertPreorderDetail = ServiceConstance.rootPath + ServiceConstance.preorderPath + "/insertPreorderDetail";
  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
  ) { }

  async getPreOrderDetail() {
    let result =  await this.http.get(this.getAllPreOrderDetail).toPromise();
    return result;
    }

  async insertPreOrderDetail(request){
  let result =  await this.http.post(this.insertPreorderDetail, request).toPromise();
  return result;
  }


}
