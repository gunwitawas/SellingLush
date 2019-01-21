import {Component, OnInit, Inject} from '@angular/core';

import {AppStorage} from '@shared/for-storage/universal.inject';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {MetaService} from '@ngx-meta/core';
import {UniversalStorage} from "@shared/for-storage/server.storage";
import {UserService} from "../all-service/register-service/UserService.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private storage: UniversalStorage,
    private http: TransferHttpService,
    private readonly meta: MetaService,
    private service: UserService,
    @Inject(AppStorage) private appStorage: Storage,
  ) {
  }

  loginForm = {
    username: "",
    password: ""
  }

  regisForm = {
    username: "",
    password: "",
    repassword: "",
    name: "",
    tel: "",
    email: "",
    lineId: "",
    type: "M",
    address: "",
    image: "",
    validPassword: true,
    validUsername: true
  }

  ngOnInit(): void {

  }

  async login() {
    let r:any = await this.service.login(this.loginForm);
    if (r.result) {
      console.log(r.result);
      console.log(r);
      this.appStorage.setItem("username", r.username);
      this.appStorage.setItem("status", r.type);
      $("#loginModal").modal('toggle');
      $('#reloadButton')[0].click();
    }
  }

  regis(f) {
    console.log(f);
  }

  validatePassword(type) {
    if (type == 'M') {
      let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      this.regisForm.validPassword = re.test(this.regisForm.password);
      return;
    } else {
      return this.regisForm.password == this.regisForm.repassword;
    }
  }

  async validateUsername() {
    let r:any = await this.service.checkValidUsername({username: this.regisForm.username});
      this.regisForm.validUsername = r.result;

  }

}
