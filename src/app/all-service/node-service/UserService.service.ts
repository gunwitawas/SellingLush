import {Injectable} from '@angular/core';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {HttpClient} from '@angular/common/http';
import {ServiceConstance} from "../../shared/constance/ServiceConstance";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginServicePath = ServiceConstance.rootPath + ServiceConstance.userPath + "/login";
  checkValidUsernameServicePath = ServiceConstance.rootPath + ServiceConstance.userPath + "/checkValidUsername";
  regisServicePath = ServiceConstance.rootPath + ServiceConstance.userPath + "/regis";
  getUserProfileServicePath = ServiceConstance.rootPath + ServiceConstance.userPath + "/getUserProfileByUsername";
  parameter: any = {
    params: {},
    responseType: "json"
  }

  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
  ) {
  }


  async login(params) {
    this.parameter.params = params;
    let result = await this.http.get(this.loginServicePath, this.parameter).toPromise();
    return result;
  }

  async regisNewUser(regisForm) {
    console.log(this.regisServicePath);
    let result = await this.http.post(this.regisServicePath, regisForm).toPromise();
    return result;
  }

  async checkValidUsername(params) {
    this.parameter.params = params;
    let result = await this.http.get(this.checkValidUsernameServicePath, this.parameter).toPromise();
    return result;
  }
  async getUserProfile(params) {
    this.parameter.params = params;
    let result = await this.http.get(this.getUserProfileServicePath, this.parameter).toPromise();
    return result;
  }


}
