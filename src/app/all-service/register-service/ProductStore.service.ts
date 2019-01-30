import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import { request } from 'https';
import {ServiceConstance} from "../../ServiceConstance";

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  getProductStoreServicePath = ServiceConstance.rootPath + ServiceConstance.productStorePath + "/getProductStore";
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
