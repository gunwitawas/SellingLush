import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import { request } from 'https';
import {ServiceConstance} from "../../shared/constance/ServiceConstance";

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  getProductStoreServicePath = ServiceConstance.rootPath + ServiceConstance.productStorePath + "/getProductStore";
  insertProductStoreServicePath = ServiceConstance.rootPath + ServiceConstance.productStorePath + "/insertProductStore";
  updateProductStoreServicePath = ServiceConstance.rootPath + ServiceConstance.productStorePath + "/updateProductStore";
  deleteProductStoreServicePath = ServiceConstance.rootPath + ServiceConstance.productStorePath + "/deleteProductStore";
  parameter:any = {
    params : {},
    responseType: "json"
  }
  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
  ) { }

  async getProductStore(params){
    this.parameter.params = params;
    let result = await this.http.get(this.getProductStoreServicePath, this.parameter).toPromise();
    return result;
  }

  async insertProductStore(params){
    let result = await this.http.post(this.insertProductStoreServicePath, params).toPromise();
    return result;
  }
  async updateProductStore(params){
    let result = await this.http.post(this.updateProductStoreServicePath, params).toPromise();
    return result;
  }

  async deleteProductStore(params){
    let result = await this.http.post(this.deleteProductStoreServicePath, params).toPromise();
    return result;
  }

}

/* async login(params){
   this.parameter.params = params;
   let result = await this.http.get(this.loginServicePath, this.parameter).toPromise();
   return result;
 }

 async regisNewUser(regisForm){
   console.log(this.regisServicePath);
   let result = await this.http.post(this.regisServicePath, regisForm).toPromise();
   return result;
 }

 async checkValidUsername(params){
   this.parameter.params = params;
   let result = await this.http.get(this.checkValidUsernameServicePath, this.parameter).toPromise();
   return result;
 }*/
