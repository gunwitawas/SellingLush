import { Injectable } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { ServiceConstance } from "../../shared/constance/ServiceConstance";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  getAccountServicePath = ServiceConstance.rootPath + ServiceConstance.accountPath + "/getAccount";
  createAccountServicePath = ServiceConstance.rootPath + ServiceConstance.accountPath + "/Register";
  parameter: any = {
    params: {},
    responseType: "json"
  }
  constructor(
    private http: TransferHttpService,
  ) { }

  async getUserAccount(username?: string) {
    if (username) {
      this.parameter.params = username;
    }
    let result: any = await this.http.get(this.getAccountServicePath, this.parameter).toPromise()
    if (result.content && username) {
      result = await result.content.filter((account: any) => account.username == username);
      return result[0];
    }
    return result;
  }

  async createAccount(request) {
    let result = await this.http.post(this.createAccountServicePath, request).toPromise();
    return result;
  }


}
