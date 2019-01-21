import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import { request } from 'https';
import {ServiceConstance} from "../../ServiceConstance";
import { resolve } from 'path';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginServicePath = ServiceConstance.rootPath + ServiceConstance.userPath + "/login";
  checkValidUsernameServicePath = ServiceConstance.rootPath + ServiceConstance.userPath + "/checkValidUsername";
  parameter:any = {
    params : {},
    responseType: "json"
  }
  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
  ) { }


  async login(params){
    this.parameter.params = params;
    let result = await this.http.get(this.loginServicePath, this.parameter).toPromise();
    return result;
  }


  async checkValidUsername(params){
    this.parameter.params = params;
    let result = await this.http.get(this.checkValidUsernameServicePath, this.parameter).toPromise();
    return result;
  }
}
