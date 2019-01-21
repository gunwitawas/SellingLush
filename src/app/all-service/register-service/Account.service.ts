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
export class AccountService {
  getAccountServicePath = ServiceConstance.rootPath + ServiceConstance.accountPath + "/getAccount";
  createAccountServicePath = ServiceConstance.rootPath + ServiceConstance.accountPath + "/Register";
  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
  ) { }

  getUserAccount() {
    this.http.get(this.getAccountServicePath).subscribe((result: any) => {
      console.log(result);
      return result;
    });
  }

  async createAccount(request){
  let result =  await this.http.post(this.createAccountServicePath, request).toPromise();
  return result;
  }


}
