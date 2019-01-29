import { Component, OnInit, Inject } from '@angular/core';

import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from 'app/all-service/register-service/Account.service';
import Swal from 'sweetalert2'
import { UserService } from 'app/all-service/register-service/UserService.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-transfer-back',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {
  public result: any;
  public resultHttpClient: any;
  public resultPost: any;

  constructor(
    private http: TransferHttpService,
    private httpClient: HttpClient,
    @Inject(AppStorage) private appStorage: Storage,
    @Inject('ORIGIN_URL') public baseUrl: string,
    private formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer,
    private accountservice: AccountService,
    private userservice: UserService
  ) {
    console.log(`ORIGIN_URL=${baseUrl}`);
  }

  registerForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    name: ['', Validators.required],
    address: ['', Validators.required],
    tel: ['', Validators.required],
    line_id: ['', Validators.required],
    type: ['M', Validators.required],
    email: ['', Validators.required],
    upLoadImage: [''],
  });

  allUserAccount: any;
  userAccount: any;
  validUsername: any = true;
  validPassword: any = true;
  uploadImg: any;



  ngOnInit(): void {
    this.uploadImg = "../../assets/img/imageUser.png";
    this.getAllUserAccount();
  }

  async getAllUserAccount() {
    let response :any = await this.accountservice.getUserAccount();
    console.log("asdasd",response);

    if(response){
      console.log("asdasd",response);
      this.allUserAccount = response.content.filter(f => f.type == 'M');
    }
    console.log("allUserAccount",this.allUserAccount);
    
  }

  async summitFormRegister() {
    console.log("regisform 1111: ", this.registerForm.value);

    this.registerForm.value['upLoadImage'] = this.uploadImg;
    console.log("regisform 222: ", this.registerForm.value);

    let createAccount: any = await this.accountservice.createAccount(this.registerForm.value);
    console.log("qweqweqvfwe: ", createAccount)

    if (createAccount['result'] === "succcess") {
      Swal(
        'Create new Account success!',
        'เพิ่มข้อมูลผู้ใช้งานสำเร็จ!',
        'success'
      );
    } else if (createAccount['result'] === "duplicate") {
      this.registerForm.value['username'] = '';
      Swal(
        'Username already exist',
        'ชื่อผู้ใช้นี้มีอยู่แล้ว!',
        'warning'
      );
    } else {
      Swal(
        'The system cannot process your transaction',
        'ระบบไม่สามารถทำรายการได้ในขณะนี้!',
        'error'
      );
    }
  };

  async validateUsername() {
    // console.log("user",this.registerForm.value['username']);
    let res: any = await this.userservice.checkValidUsername({ username: this.registerForm.value['username'] });
    this.validUsername = res.result;

  }

  validatePassword() {
    // console.log(this.registerForm.value['password'], ': + :', this.registerForm.value['confirmPassword']);
    if (this.registerForm.value['password'] !== this.registerForm.value['confirmPassword']) {
      this.validPassword = false;
    } else {
      this.validPassword = true;
    }
  }

  uploadFile(event) {
    let files = event.target.files;
    if (files.length > 0) {
      console.log(files); // You will see the file
      this.getBase64(files[0]);
    }
  }

  getImgPath(base64str: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + base64str);
  }

  getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.uploadImg = reader.result;
      this.registerForm.value['upLoadImage'] = this.uploadImg;
      console.log(this.registerForm.value['upLoadImage']);
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }



}
