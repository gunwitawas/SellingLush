import {Component, OnInit, Inject} from '@angular/core';

import {AppStorage} from '@shared/for-storage/universal.inject';
import {TransferHttpService} from '@gorniv/ngx-transfer-http';
import {MetaService} from '@ngx-meta/core';
import {UniversalStorage} from "@shared/for-storage/server.storage";
import {UserService} from "../all-service/register-service/UserService.service";
import Swal from 'sweetalert2'

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
  testDate = new Date();
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
  test(){
    console.log(this.testDate);
  }
  async login() {
    let r: any = await this.service.login(this.loginForm);
    if (r.result) {
      console.log(r.result);
      console.log(r);
      this.appStorage.setItem("username", r.username);
      this.appStorage.setItem("status", r.type);
      $("#loginModal").modal('toggle');
      $('#reloadButton')[0].click();
    }else{
    Swal(
         'เข้าสู่ระบบไม่สำเร็จ!',
         'กรุณาตรวจสอบชื่อผู้ใช้ และ รหัสผ่านอีกครั้ง',
         'error'
        );
    }
  }

  async regis(f) {
    console.log(f.value);
    let result: any = await this.service.regisNewUser(f.value);
    if(result){
      if (result.affectedRows == 1) {
        Swal(
          'สำเร็จ!',
          'สมัครเสร็จสิ้น',
          'success'
        );
      }
    }
  }

  validatePassword(type) {
    let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (type == 'M') {
      this.regisForm.validPassword = re.test(this.regisForm.password);
      return;
    } else {
      return this.regisForm.password == this.regisForm.repassword;
    }
  }

  async validateUsername() {
    let r: any = await this.service.checkValidUsername({username: this.regisForm.username});
    this.regisForm.validUsername = r.result;

  }

}
